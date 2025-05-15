const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: process.env.UPLOAD_FOLDER || './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = process.env.ALLOWED_FILE_TYPES 
    ? process.env.ALLOWED_FILE_TYPES.split(',') 
    : ['.mp3', '.mp4', '.wav', '.webm', '.mpeg', '.mpga', '.m4a'];
  
  const ext = path.extname(file.originalname).toLowerCase();
  allowedExtensions.includes(ext) ? cb(null, true) : cb(new Error('Tipo de arquivo inválido'));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { 
    fileSize: (process.env.MAX_FILE_SIZE_MB || 100) * 1024 * 1024 
  }
}).single('file');

module.exports = upload;