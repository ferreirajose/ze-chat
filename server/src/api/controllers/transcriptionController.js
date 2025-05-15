const { downloader } = require('../services/downloadVideoService');
const { createMP3 } = require('../services/createMP3Service');
const { transcribeAudio: localTranscribe } = require('../services/transcriberService');
const { transcribeAudio: openaiTranscribe } = require('../services/transcriptionService');
const { extractVideoId } = require('../../helpers/extractVideoId');

const transcribeAudioCtrl = async (req, res) => {
  try {
    const { url } = req.query;
    const useOpenAI = req.query.openai === 'true';

    if (!url) {
      return res.status(400).json({
        status: 'error',
        message: 'URL do YouTube não fornecida'
      });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return res.status(400).json({
        status: 'error',
        message: 'URL do YouTube inválida'
      });
    }

    // Configura headers para SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Removido o res.flushHeaders() pois não é necessário no Express padrão

    const sendEvent = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
      // Removido o res.flush() pois não está disponível no Express padrão
    };

    try {
      // 1. Download do vídeo (0-30%)
      sendEvent({
        stage: 'download',
        progress: 10,
        message: 'Iniciando download do vídeo...'
      });
      
      await downloader(videoId);

      sendEvent({
        stage: 'download',
        progress: 30,
        message: 'Download completo!'
      });

      // 2. Conversão para áudio (30-50%)
      sendEvent({
        stage: 'conversion',
        progress: 30,
        message: 'Convertendo vídeo para áudio...'
      });
      
      const mp3Path = await createMP3();

      sendEvent({
        stage: 'conversion',
        progress: 50,
        message: 'Conversão para áudio completa!'
      });

      // 3. Transcrição (50-100%)
      sendEvent({
        stage: 'transcription',
        progress: 50,
        message: 'Iniciando transcrição do áudio...'
      });
      
      let transcription;
      if (useOpenAI) {
        transcription = await openaiTranscribe(mp3Path);
      } else {
        transcription = await localTranscribe();
      }

      // ERRO
      if (!transcription.success) {
        sendEvent({
          status: 'error',
          error: transcription.error || 'Erro na transcrição'
        });
        return res.end();
      }

      //SUCCESS
      if (transcription.success) {
        sendEvent({
          status: 'complete',
          progress: 100,
          data: {
            text: transcription.text,
            source: useOpenAI ? 'openai' : 'local'
          }
        });

        return res.end();

      }

    } catch (error) {
      console.error('[PROCESS_ERROR]', error);
      sendEvent({
        status: 'error',
        error: error.message || 'Erro durante o processamento'
      });
    }
    
    res.end();
  } catch (error) {
    console.error('[CONTROLLER_ERROR]', error);
    if (!res.headersSent) {
      res.status(500).json({
        status: 'error',
        message: 'Erro ao processar a transcrição',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

module.exports = {
  transcribeAudioCtrl
};