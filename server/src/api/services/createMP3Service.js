require('dotenv').config();

const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegStatic);

const createWhisperAudio = () => new Promise((resolve, reject) => {
    const inputPath = path.join(process.env.MIDIA_FOLDER || './midia', 'audio.mp4');
    const outputPath = path.join(process.env.MIDIA_FOLDER || './midia', 'audio_whisper.wav');

    console.log(`[CONVERTING_TO_WAV] Input: ${inputPath}`);

    ffmpeg()
        .input(inputPath)
        .audioFrequency(16000)  // Taxa de amostragem que o Whisper espera
        .audioChannels(1)       // Áudio mono
        .format('wav')         // Formato WAV
        .outputOptions([
            '-acodec pcm_s16le', // PCM signed 16-bit little-endian
            '-ar 16000',         // Taxa de amostragem
            '-ac 1',             // Canais de áudio (mono)
            '-y'                 // Sobrescrever arquivo existente
        ])
        .on('start', (command) => {
            console.log('[FFMPEG_START]', command);
        })
        .on('progress', (progress) => {
            console.log(`[FFMPEG_PROGRESS] ${Math.floor(progress.percent)}%`);
        })
        .on('error', (error) => {
            console.error('[FFMPEG_ERROR]', error);
            reject(new Error(`Falha na conversão: ${error.message}`));
        })
        .on('end', () => {
            console.log(`[FFMPEG_SUCCESS] Output: ${outputPath}`);
            resolve(outputPath);
        })
        .save(outputPath);
});

module.exports = {
    createMP3: createWhisperAudio
};