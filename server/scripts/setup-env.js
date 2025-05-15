const fs = require('fs');
const path = require('path');

// Caminhos relativos considerando a nova estrutura
const envDir = path.join(__dirname, '../envs');
const template = `# Template de variáveis de ambiente
NODE_ENV=development
PORT=3000
# Adicione outras variáveis conforme necessário
`;

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir);
  console.log('✅ Diretório envs criado');
}

// Cria arquivos básicos
const envFiles = {
  '.env.example': template,
  '.env.development': 'NODE_ENV=development\nPORT=3001\n',
  '.env.staging': 'NODE_ENV=staging\nPORT=3000\n',
  '.env.production': 'NODE_ENV=production\nPORT=3000\n'
};

Object.entries(envFiles).forEach(([filename, content]) => {
  const filePath = path.join(envDir, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Arquivo ${filename} criado em ${envDir}/`);
  }
});

console.log('🎉 Configuração de ambientes concluída!');
console.log('Edite os arquivos em /envs/ conforme necessário');