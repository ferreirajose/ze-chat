require('dotenv').config();

const { pipeline, env } = require('@xenova/transformers');
const path = require('path');
const fs = require('fs').promises; // Using promises version for async/await
const { WaveFile } = require('wavefile'); // Import WaveFile directly

env.allowLocalModels = false;

async function loadAndPrepareAudio(audioPath) {
    try {
        console.log(`[LOAD_AUDIO] Loading audio from: ${audioPath}`);
        
        // Read file asynchronously
        const buffer = await fs.readFile(audioPath);
        
        // Load WAV file
        const wav = new WaveFile(buffer);
        
        // Validate audio format
        if (wav.fmt.audioFormat !== 1) {
            throw new Error('Only PCM audio format is supported');
        }
        
        // Convert to required format
        wav.toBitDepth('32f'); // Convert to 32-bit float
        wav.toSampleRate(16000); // Resample to 16kHz
        
        // Get samples and handle multi-channel audio
        let audioData = wav.getSamples();
        
        if (Array.isArray(audioData)) {
            // If stereo, mix down to mono
            if (audioData.length > 1) {
                const SCALING_FACTOR = Math.sqrt(2);
                const mixed = new Float32Array(audioData[0].length);
                
                for (let i = 0; i < audioData[0].length; ++i) {
                    mixed[i] = SCALING_FACTOR * (audioData[0][i] + audioData[1][i]) / 2;
                }
                audioData = mixed;
            } else {
                // If already mono, just use the first channel
                audioData = audioData[0];
            }
        }
        
        return audioData;
    } catch (error) {
        console.error('[AUDIO_PROCESSING_ERROR]', error);
        throw error;
    }
}

async function transcribeAudio() {
    const options = {
        chunk_length_s: 30,
        stride_length_s: 5,
        language: 'portuguese',
        task: 'transcribe',
        return_timestamps: true,
    };

    try {
        console.log('[START_LOCAL_TRANSCRIBE]');
        
        // Load the transcriber model
        const transcriber = await pipeline(
            "automatic-speech-recognition", 
            'Xenova/whisper-small'
        );
        
        // Get audio file path
        const audioPath = path.join(process.env.MIDIA_FOLDER || './midia', 'audio_whisper.wav');
        console.log(`[AUDIO_PATH] Using audio file at: ${audioPath}`);
        
        // Check if file exists and is accessible
        try {
            await fs.access(audioPath);
        } catch {
            throw new Error(`Audio file not found at: ${audioPath}`);
        }
        
        // Get file stats for logging
        const stats = await fs.stat(audioPath);
        console.log(`[FILE_STATS] Size: ${stats.size} bytes`);
        
        if (stats.size === 0) {
            throw new Error('O arquivo de áudio está vazio');
        }
        
        // Load and prepare audio data
        const audioData = await loadAndPrepareAudio(audioPath);
        
        console.log('[STARTING_TRANSCRIPTION]');
        const startTime = performance.now();
        
        // Perform transcription
        const result = await transcriber(audioData, options);
        
        const endTime = performance.now();
        console.log(`[TRANSCRIPTION_DURATION] ${(endTime - startTime) / 1000} seconds`);
        
        console.log('[TRANSCRIPTION_RESULT]', result.text ? 'Success' : 'Empty result');
        console.log('[RESULT]', result);
        
        return {
            success: !!result.text,
            text: result.text || "Não foi possível transcrever o áudio",
            timestamps: result.timestamps || null,
            processingTime: (endTime - startTime) / 1000,
            url: ''
        };
    } catch (error) {
        console.error('[LOCAL_TRANSCRIBE_ERROR]', error);
        return {
            success: false,
            error: error.message
        };
    }
}

module.exports = {
    transcribeAudio
};