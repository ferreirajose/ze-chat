const upload = require('../../config/upload');

const uploadFile = (req, res) => {
  let uploadProgress = 0;
  let lastLoggedProgress = 0;
  const startTime = Date.now();

  req.on('data', (chunk) => {
    uploadProgress += chunk.length;
    const progressPercentage = Math.round((uploadProgress / req.headers['content-length']) * 100);
    
    if (progressPercentage >= lastLoggedProgress + 5 || progressPercentage === 100) {
      console.log(`Progresso: ${progressPercentage}%`);
      lastLoggedProgress = progressPercentage;
    }
  });

  upload(req, res, (err) => {
    try {
      if (err) {
        console.error('Erro no upload:', err);

        let errorMessage = 'Erro no upload';
        let statusCode = 400;

        if (err.code === 'LIMIT_FILE_SIZE') {
          errorMessage = 'Arquivo muito grande (máximo 100MB)';
        } else if (err.message.includes('Unexpected field')) {
          errorMessage = 'Nome do campo de upload inválido. Use "file"';
          statusCode = 422;
        } else if (err.message.includes('Tipo de arquivo inválido')) {
          errorMessage = 'Tipo de arquivo não suportado';
        }

        return res.status(statusCode).json({
          status: 'error',
          message: errorMessage,
          details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
      }

      if (!req.file) {
        return res.status(400).json({
          status: 'error',
          message: 'Nenhum arquivo foi enviado'
        });
      }

      const fileSizeMB = (req.file.size / (1024 * 1024)).toFixed(2);
      const uploadTime = ((Date.now() - startTime) / 1000).toFixed(2);

      res.json({
        status: 'success',
        message: 'Upload concluído',
        file: {
          originalName: req.file.originalname,
          size: `${fileSizeMB} MB`,
          uploadTime: `${uploadTime} segundos`,
          path: req.file.path
        }
      });

    } catch (error) {
      console.error('Erro inesperado:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor'
      });
    }
  });
};

module.exports = {
    uploadFile
}