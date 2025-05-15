module.exports = (err, req, res, next) => {
  console.error(err.stack);
  
  // Se já tiver sido enviada uma resposta, não faça nada
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};