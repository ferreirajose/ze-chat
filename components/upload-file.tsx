
"use client"

import React, { useState } from "react"
import { Paperclip, Upload, XCircle } from "lucide-react"
import axios from "axios"

import { useDragAndDrop } from "@/hooks/use-drag-and-drop"
import { useTranscriptionData } from "@/hooks/transcription-context"
import { uploadAndTranscribe } from "@/services/transcriptionService"
import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE } from "@/constants/file"


export function UploadFile() {
  const { setData } = useTranscriptionData()
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fileName, setFileName] = useState<string | null>(null)
  const [deleteAfterProcessing, setDeleteAfterProcessing] = useState(false);

  const validateFile = (file: File): boolean => {
    const extension = `.${file.name.split('.').pop()?.toLowerCase()}`
    
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setError(`Tipo de arquivo não permitido. Extensões permitidas: ${ALLOWED_EXTENSIONS.join(', ')}`)
      return false
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(`Arquivo muito grande. Tamanho máximo permitido: ${MAX_FILE_SIZE / (1024 * 1024)}MB`)
      return false
    }

    setError(null)
    return true
  }

  const handleFiles = async (files: FileList) => {
    if (files.length > 1) {
      setError('Apenas um arquivo pode ser enviado por vez');
      return;
    }

    const file = files[0];
    if (!validateFile(file)) return;

    setIsUploading(true);
    setProgress(0);
    setFileName(file.name);

    try {
      const result = await uploadAndTranscribe(file, (progress, isUploadComplete) => {
        // Atualiza o progresso, mas só mostra 100% quando tudo estiver completo
        setProgress(isUploadComplete ? 100 : Math.min(progress, 99));
      }, deleteAfterProcessing);
      
      setData(result);
      setProgress(100); // Só agora marca como 100% completo
      setError(null);
    } catch (error) {
      console.error('Upload error:', error);
      setError(getErrorMessage(error));
      setProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 413) {
        return 'O arquivo é muito grande para ser processado'
      }
      if (error.response?.status === 415) {
        return 'Tipo de arquivo não suportado'
      }
      return error.response?.data?.message || 'Erro ao processar o arquivo'
    }
    return 'Ocorreu um erro inesperado durante o upload'
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const { isDragging, dragProps } = useDragAndDrop({
    onDrop: handleFiles,
    onError: setError
  })

  const handleCancelUpload = () => {
    // lógica para cancelar o upload se necessário
    setIsUploading(false)
    setError('Upload cancelado pelo usuário')
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="bg-teal-600 p-custom rounded-lg mr-4 text-white">
          <img src={`/logo-aurora.svg`} alt={'Logo Aurora Transcrições'} width="40" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-teal-600 dark:text-teal-400">AURORA</h1>
          <h2 className="text-xl font-bold text-teal-600 dark:text-teal-400">TRANSCRIÇÕES</h2>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-2">Upload arquivos</h3>
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging 
            ? "border-blue-500 bg-blue-100 dark:bg-blue-900/30" 
            : "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950"
        }`}
        {...dragProps}
      >
        <div className="mx-auto bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white mb-3">
          <Upload size={24}/>
        </div>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Selecione o arquivo ou
          <br />
          arraste e solte aqui.
        </p>
        
        {isUploading ? (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {progress < 100 ? 'Enviando arquivo...' : 'Processando transcrição...'}
              <span className="font-medium block truncate">{fileName}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  progress < 100 ? 'bg-blue-600' : 'bg-purple-600 animate-pulse'
                }`}
                style={{ width: `${progress < 100 ? progress : 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>
                {progress < 100 
                  ? `Upload: ${progress}%` 
                  : 'Finalizando processamento...'}
              </span>
            </div>
          </div>
        ) : (
          <>
            <label className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
              Selecionar arquivo
              <Paperclip size={20} />
              <input
                type="file"
                className="hidden"
                onChange={handleFileInputChange}
                accept={ALLOWED_EXTENSIONS.join(',')}
              />
            </label>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Tamanho máximo de 800MB por arquivo.
            </p>
          </>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg flex items-center gap-2 justify-center">
            <XCircle size={18} />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold">Tipos permitidos:</p>
        <ul className="list-disc pl-5 mt-1">
          <li><b>Vídeos</b> (.webm, .mp4, .mpeg)</li>
          <li><b>Áudios</b> (.mpga, .m4a, .wav, .mp3)</li>
        </ul>
      </div>
    </div>
  )
}