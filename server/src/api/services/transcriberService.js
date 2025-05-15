require('dotenv').config();

const { pipeline, env } = require('@xenova/transformers');
const path = require('path');
const fs = require('fs');
const wav = require('wav');
const { Buffer } = require('buffer');
const { Writable } = require('stream');


env.allowLocalModels = false;
env.localModelPath = './models';

async function readWavFile(filePath) {
    return new Promise((resolve, reject) => {
        try {
            const reader = new wav.Reader();
            const chunks = [];
            
            reader.on('format', (format) => {
                reader.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                
                reader.on('end', () => {
                    resolve({
                        data: Buffer.concat(chunks),
                        sampleRate: format.sampleRate
                    });
                });
            });
            
            fs.createReadStream(filePath).pipe(reader);
        } catch (error) {
            reject(error);
        }
    });
}

// async function transcribeAudio(onProgress) {
//     const options = {
//         chunk_length_s: 30,
//         stride_length_s: 5,
//         language: 'portuguese',
//         task: 'transcribe',
//         return_timestamps: true,
//     };

//     try {
//         console.log('[START_LOCAL_TRANSCRIBE]');
//         const transcriber = await pipeline("automatic-speech-recognition", 'Xenova/whisper-small');
        
//         const audioPath = path.join(process.env.MIDIA_FOLDER || './midia', 'audio_whisper.wav');
//         console.log(`[AUDIO_PATH] Using whisper-formatted audio at: ${audioPath}`);

//         // Verifica se o arquivo existe
//         if (!fs.existsSync(audioPath)) {
//             throw new Error('Arquivo de áudio não encontrado');
//         }

//         const { data, sampleRate } = await readWavFile(audioPath);
//         console.log('[DATA]', data)
//         console.log('[sampleRate]', sampleRate)

//         const result = await transcriber({
//             arrayBuffer: () => data.buffer,
//             sampling_rate: sampleRate
//         }, options);
        
//         return {
//             success: true,
//             text: result.text
//         };
//     } catch (error) {
//         console.error('[LOCAL_TRANSCRIBE_ERROR]', error);
//         return {
//             success: false,
//             error: error.message
//         };
//     }
// }

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
        const transcriber = await pipeline("automatic-speech-recognition", 'Xenova/whisper-small');
        
        const audioPath = path.join(process.env.MIDIA_FOLDER || './midia', 'audio_whisper.wav');
        console.log(`[AUDIO_PATH] Using audio file at: ${audioPath}`);

        // Verificação adicional do arquivo
        const stats = fs.statSync(audioPath);
        console.log(`[FILE_STATS] Size: ${stats.size} bytes`);
        
        if (stats.size === 0) {
            throw new Error('O arquivo de áudio está vazio');
        }

        // Converter o arquivo WAV para o formato esperado
        const audioData = fs.readFileSync(audioPath);
        const audio = {
            arrayBuffer: () => audioData.buffer,
            sampling_rate: 16000
        };

        console.log('[STARTING_TRANSCRIPTION]');
        const result = await transcriber(audio, options);
        
        console.log('[TRANSCRIPTION_RESULT]', result.text ? 'Success' : 'Empty result');
        console.log('[RESULT]', result);
        
        return {
            success: result.text ? true : false,
            text: result.text || "Não foi possível transcrever o áudio"
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