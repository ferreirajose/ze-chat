# Audio Transcriber Server

API para upload e transcrição de áudio usando tecnologias modernas.

## 🚀 Tecnologias

- Node.js
- Express
- OpenAI API
- FFmpeg
- Multer (para upload de arquivos)
- YTDL Core (para download de áudio do YouTube)
- Transformers (para processamento de áudio)

## 📋 Estrutura do Projeto

```
server/
├── src/              # Código fonte principal
├── midia/            # Arquivos de mídia
├── uploads/          # Arquivos enviados pelos usuários
├── envs/             # Arquivos de configuração
├── scripts/          # Scripts de configuração
└── node_modules/     # Dependências do projeto
```

## 🛠️ Instalação

1. Clone o repositório
2. Navegue até a pasta do servidor:
   ```bash
   cd server
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente (verifique o arquivo `.env.example`)

## 🚀 Iniciando o Servidor

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

### Staging
```bash
npm run staging
```

## 📝 Variáveis de Ambiente

- `PORT`: Porta do servidor (padrão: 3000)
- `NODE_ENV`: Ambiente (development, production, staging)
- `OPENAI_API_KEY`: Chave da API do OpenAI
- Outras variáveis específicas do projeto

## 📚 Funcionalidades

- Upload de arquivos de áudio
- Transcrição de áudio usando OpenAI
- Download de áudio do YouTube
- Processamento de áudio usando FFmpeg
- Suporte a múltiplos formatos de áudio

## 🔒 Segurança

- CORS configurado para segurança
- Validação de arquivos
- Limite de tamanho de upload
- Autenticação via OpenAI API

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.
