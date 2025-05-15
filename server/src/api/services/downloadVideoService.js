require('dotenv').config();

const ytdl = require("@distube/ytdl-core");
const fs = require('fs');
const path = require('path');

const downloader = async (videoId) => {
    const videoURL = 'https://youtube.com/watch?v=' + videoId;
    console.log('[START_DOWNLOAD]', videoURL);
    
    try {
        // Tentativa 1: Obter informações com formato padrão
        let info;
        try {
            info = await ytdl.getInfo(videoURL);
        } catch (err) {
            console.error('[ERRO_GET_INFO_PRIMEIRA_TENTATIVA]', err);
            // Tentativa 2: Tentar sem cache
            info = await ytdl.getInfo(videoURL, { dumpJS: true });
        }

        // Verifica se existem formatos disponíveis
        if (!info.formats || info.formats.length === 0) {
            throw new Error('Nenhum formato de vídeo disponível');
        }

        // Filtra formatos de áudio
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        if (audioFormats.length === 0) {
            throw new Error('Nenhum formato de áudio disponível');
        }

        // Cria o diretório se não existir
        const outputDir = process.env.MIDIA_FOLDER || './midia';

        //path.join(process.env.MIDIA_FOLDER || './midia', 'audio.mp3');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputFilePath = path.join(outputDir, 'audio.mp4');

        return new Promise((resolve, reject) => {
            const stream = ytdl(videoURL, {
                quality: 'lowestaudio', // Alterado para melhor qualidade de áudio // highestaudio
                filter: 'audioonly',
                highWaterMark: 1 << 25, // Buffer maior para evitar erros
                dlChunkSize: 0, // Desabilita chunking para alguns vídeos problemáticos
            })
            .on('progress', (chunkLength, downloaded, total) => {
                const percent = (downloaded / total * 100).toFixed(2);
                console.log(`[DOWNLOAD_PROGRESS] ${percent}%`);
            })
            .on('end', () => {
                console.log('[FINISHED_DOWNLOAD]', outputFilePath);
                resolve(outputFilePath);
            })
            .on('error', (error) => {
                console.error('[ERRO_DOWNLOAD_VIDEO]', error);
                reject(new Error(`Falha no download: ${error.message}`));
            })
            .pipe(fs.createWriteStream(outputFilePath));
        });
    } catch (error) {
        console.error('[ERRO_DOWNLOAD]', error);
        throw new Error(`Erro ao baixar o vídeo: ${error.message}`);
    }
};

module.exports = {
    downloader
};
