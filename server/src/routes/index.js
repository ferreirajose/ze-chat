const express = require('express');
const router = express.Router();
const uploadController = require('../api/controllers/uploadController');
const transcriptionController = require('../api/controllers/transcriptionController');
const checkAudioFile = require('../middleware/audioCheck'); // Importe o middleware

// Home route
router.get('/', (req, res) => {
  res.json({ message: 'Hello World!', status: 'success' });
});

// File upload route
router.post('/upload', uploadController.uploadFile);

// Audio transcription route
router.get('/transcribe', checkAudioFile, transcriptionController.transcribeAudioCtrl);

// router.get("/someprivatecontent", session_check, function (req, res, next) { ... });


// 404 handler for /api routes
router.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'API endpoint not found'
  });
});

module.exports = router;