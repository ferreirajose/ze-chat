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