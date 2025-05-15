const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'UPLOAD_FOLDER',
  'MAX_FILE_SIZE_MB',
  // Adicione outras variáveis obrigatórias
];

function validateEnv() {
  const missingVars = requiredEnvVars.filter(varName => {
    if (!process.env[varName]) {
      console.error(`❌ Variável ausente: ${varName}`);
      return true;
    }
    return false;
  });

  if (missingVars.length > 0) {
    console.error('🚨 Variáveis de ambiente obrigatórias faltando!');
    process.exit(1);
  }

  console.log('✅ Todas variáveis de ambiente necessárias estão presentes');
}

module.exports = validateEnv;