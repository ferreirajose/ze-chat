// require('dotenv').config();

// const path = require('path');
// const fs = require('fs');

// // Adicione no início do transcribeAudioCtrl, após verificar o videoId
// const audioDir = path.join(process.env.MIDIA_FOLDER || './midia');
// if (!fs.existsSync(audioDir)) {
//     fs.mkdirSync(audioDir, { recursive: true });
// }

// // Adicione esta verificação após a conversão para WAV
// const checkAudioFile = (filePath) => {
//     try {
//         const stats = fs.statSync(filePath);
//         if (stats.size < 1024) { // Menos de 1KB = provavelmente inválido
//             throw new Error('Arquivo de áudio muito pequeno ou inválido');
//         }
//         return true;
//     } catch (error) {
//         throw new Error(`Falha ao verificar arquivo de áudio: ${error.message}`);
//     }
// };

// middleware/audioCheck.js (novo arquivo)
require('dotenv').config();

const path = require('path');
const fs = require('fs');

const checkAudioFile = async (req, res, next) => {
    const audioDir = path.join(process.env.MIDIA_FOLDER || './midia');
    const audioPath = path.join(audioDir, 'audio_whisper.wav');

    try {
        // Verifica se o diretório existe
        if (!fs.existsSync(audioDir)) {
            fs.mkdirSync(audioDir, { recursive: true });
            return next();
        }

        // Verifica o arquivo após a conversão (usando flag na requisição)
        if (req.query.checkFile === 'true') {
            const stats = fs.statSync(audioPath);
            if (stats.size < 1024) { // Menos de 1KB = provavelmente inválido
                throw new Error('Arquivo de áudio muito pequeno ou inválido');
            }
            console.log(`[AUDIO_CHECK] Arquivo válido: ${stats.size} bytes`);
        }

        next();
    } catch (error) {
        console.error('[AUDIO_CHECK_ERROR]', error);
        res.status(400).json({
            status: 'error',
            error: error.message
        });
    }
};

module.exports = checkAudioFile;