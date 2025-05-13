const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// 1. Configuração do Multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.mp3', '.mp4', '.wav', '.webm', '.mpeg', '.mpga', '.m4a'];
  const ext = path.extname(file.originalname).toLowerCase();
  allowedExtensions.includes(ext) ? cb(null, true) : cb(new Error('Tipo de arquivo inválido'));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }
}).single('file'); // <-- Este nome deve bater com o campo do form-data

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!', status: 'success' });
});

app.post('/upload', (req, res) => {
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

  // 3. Tratamento de erros robusto
  upload(req, res, (err) => {
    try {
      if (err) {
        console.error('Erro no upload:', err);

        // Mapeia diferentes tipos de erro
        let errorMessage = 'Erro no upload';
        let statusCode = 400;

        if (err.code === 'LIMIT_FILE_SIZE') {
          errorMessage = 'Arquivo muito grande (máximo 100MB)';
        } else if (err.message.includes('Unexpected field')) {
          errorMessage = 'Nome do campo de upload inválido. Use "uploaded_file"';
          statusCode = 422;
        } else if (err.message.includes('Tipo de arquivo inválido')) {
          errorMessage = 'Tipo de arquivo não suportado';
        }

        // Garante que a conexão será fechada com resposta
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

      // Sucesso
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
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});