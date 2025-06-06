# Frontend - Zé Transcriber

Interface web moderna para upload e transcrição de áudio construída com Next.js e React.

## � Como Baixar o Projeto

1. Clone o repositório usando Git:
   ```bash
   git clone https://github.com/ferreirajose/ze-chat.git
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd frontend
   ```

## 🛠️ Baixar as Dependências

1. Certifique-se de ter Node.js instalado em sua máquina
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```
   ou se preferir usar pnpm:
   ```bash
   pnpm install
   ```

## 🚀 Como Executar o Projeto

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   ou
   ```bash
   pnpm dev
   ```

2. Acesse a aplicação em seu navegador:
   ```
   http://localhost:8080
   ```

## 📋 Estrutura do Projeto

```
frontend/
├── app/                # Rotas e páginas
├── components/         # Componentes reutilizáveis
│   ├── header/        # Componente de cabeçalho
│   ├── file-list/     # Lista de arquivos
│   ├── upload-file/   # Componente de upload
│   └── transcription/ # Componente de transcrição
├── hooks/            # Custom hooks
├── lib/              # Funções utilitárias
├── public/           # Arquivos estáticos
├── styles/           # Estilos globais
└── types/            # Tipos TypeScript
```

## � Tecnologias

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Radix UI Components
- Shadcn/ui
- React Hook Form
- React Query

## 📝 Componentes Principais

### 1. Header
- Navegação principal
- Tema claro/escuro
- Status da aplicação

### 2. UploadFile
- Interface para upload de arquivos de áudio
- Suporte a múltiplos formatos
- Progresso de upload
- Validação de arquivos

### 3. FileList
- Lista de arquivos carregados
- Status de processamento
- Ações de arquivo
- Paginação

### 4. TranscriptionView
- Visualização de transcrição
- Formatação de texto
- Exportação de transcrição
- Interatividade

### 5. VideoLinkInput
- Input para links do YouTube
- Validação de URL
- Extração de áudio
- Status de download

## 🎯 Hooks Personalizados

O projeto utiliza vários hooks personalizados para melhorar a reutilização de código e manter a lógica organizada:

### 1. useAudioUpload
- Gerencia o processo de upload de áudio
- Trata progresso e erros
- Validação de formatos
- Limite de tamanho de arquivo

### 2. useTranscription
- Gerencia o estado da transcrição
- Integração com API
- Formatação de texto
- Cache de resultados

### 3. useTheme
- Gerencia o tema claro/escuro
- Persistência de preferências
- Atualização automática
- Suporte a sistema operacional

### 4. useFileList
- Gerencia estado da lista de arquivos
- Ordenação e filtragem
- Paginação
- Operações em lote

### 5. useYouTube
- Extração de metadados
- Validação de URLs
- Download de áudio
- Status de processamento


## 🎨 Estilização

- Tailwind CSS para estilização
- Shadcn/ui para componentes
- Tema claro/escuro
- Responsividade
- Animações suaves

## 📱 Responsividade

- Layout adaptativo
- Componentes responsivos
- Navegação adaptada
- Experiência otimizada para mobile

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.
