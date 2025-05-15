// const openAi = require('openai');
// const fs = require('fs');


// //implementação real dependerá da API de transcrição que você usar
// const transcribeAudio = async (audioPath) => {

//   const options = {
//     file: fs.createReadStream(filenname),
//     model: 'whisper-1'
//   };

//   try {
//     const openAiClient = new openAi.openAI({apiKey});
//     const transcription = await openAiClient.audio.transcriptions.create(options)
    
//   return {
//     text: transcription
//   }

//   } catch (error) {
//     return {
//       text: transcription
//     }
//   }

// };


// module.exports = {
//     transcribeAudio
// };

// V2

// const OpenAI = require('openai');
// const fs = require('fs');
// const path = require('path');

// // Configuração do cliente OpenAI (você pode querer mover a apiKey para variáveis de ambiente)
// const apiKey = process.env.OPEN_AI_KEY; // Recomendo usar process.env.OPENAI_API_KEY
// const openai = new OpenAI({ apiKey });

// const transcribeAudio = async (audioPath) => {
//     try {
//         // Verifica se o arquivo existe
//         if (!fs.existsSync(audioPath)) {
//             throw new Error(`Arquivo de áudio não encontrado: ${audioPath}`);
//         }

//         // Obtém apenas o nome do arquivo para usar no parâmetro file
//         const filename = path.basename(audioPath);

//         const transcription = await openai.audio.transcriptions.create({
//             file: fs.createReadStream(audioPath),
//             model: 'whisper-1'
//         });

//         return {
//             success: true,
//             text: transcription.text // A transcrição real está na propriedade 'text'
//         };

//     } catch (error) {
//         console.error('Erro na transcrição:', error);
//         return {
//             success: false,
//             error: error.message || 'Ocorreu um erro ao transcrever o áudio'
//         };
//     }
// };

// module.exports = {
//     transcribeAudio
// };

const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

const transcribeAudio = async (audioPath) => {
  try {
    if (!fs.existsSync(audioPath)) {
      throw new Error(`Arquivo de áudio não encontrado: ${audioPath}`);
    }

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: 'whisper-1'
    });

    return {
      // success: true,
      // text: transcription.text

      success: transcription.text ? true : false,
      text: transcription.text || "Não foi possível transcrever o áudio"
    };
  } catch (error) {
    console.error('Erro na transcrição OpenAI:', error);
    return {
      success: false,
      error: error.message || 'Ocorreu um erro ao transcrever o áudio'
    };
  }
};

module.exports = {
  transcribeAudio
};