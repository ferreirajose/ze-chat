"use client"

import { useState } from "react"
import { FileText, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useFiles } from "@/hooks/use-files"
import { useTranscriptionData } from "@/hooks/transcription-context"
import axios from "axios";
import { downloadAudio, transcribeAudio } from "@/services/transcriptionService"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_AUTH_TOKEN = process.env.API_AUTH_TOKEN;

export function VideoLinkInput() {

  const { setData } = useTranscriptionData()
  const [videoLink, setVideoLink] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<{
    stage?: string
    progress?: number
    message?: string,
    status?: string,
    data?: {
      text: string
      source: string
    }
  } | null>(null)
  const { addFile } = useFiles()

  const resetForm = () => {
    setVideoLink("")
    setStatus(null)
    setError(null)
  }

  // const transcribeAudio = async (audioBlob: Blob, filename: string) => {
  //   try {
  //     setStatus(prev => ({
  //       ...prev,
  //       stage: 'transcribing',
  //       progress: 60,
  //       message: 'Transcrevendo áudio...'
  //     }))

  //     const formData = new FormData()
  //     formData.append('uploaded_file', audioBlob, filename)
      
  //     const response = await axios.post(
  //       `${API_BASE_URL}/transcreve_audio_via_upload`, formData,
  //       {
  //         params: { save_in_db: false },
  //         headers: {
  //           'Accept': 'application/json',
  //           'Authorization': `Bearer ${API_AUTH_TOKEN}`,
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       }
  //     );

  //     const transcriptionData = response.data
      
  //     setStatus(prev => ({
  //       ...prev,
  //       progress: 100,
  //       status: 'complete',
  //       message: 'Transcrição concluída',
  //       data: {
  //         text: transcriptionData.texto || "Transcrição concluída",
  //         source: 'remote'
  //       }
  //     }))

  //     return {
  //       originalText: transcriptionData.texto,
  //       formattedText: transcriptionData.texto_formatado,
  //       summary: "" // Ajuste conforme a API retornar resumos no futuro
  //     }

  //   } catch (error) {
  //     console.error('Transcription error:', error)
  //     throw error
  //   }
  // }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setError(null)
  //   setStatus({
  //     stage: 'starting',
  //     progress: 0,
  //     message: 'Iniciando processo...'
  //   })

  //   if (!videoLink.trim()) {
  //     setError("Por favor, insira um link do YouTube")
  //     return
  //   }

  //   try {
  //     setStatus({
  //       stage: 'downloading',
  //       progress: 30,
  //       message: 'Baixando áudio...'
  //     })

  //     // 1. Download do áudio
  //     const downloadResponse = await axios.get(
  //       `${API_BASE_URL}/download_audio/`,
  //       {
  //         params: { url: videoLink },
  //         headers: {
  //           'Accept': 'application/json',
  //           'Authorization': `Bearer ${API_AUTH_TOKEN}`
  //         },
  //         responseType: 'blob'
  //       }
  //     );

  //     // Processa os dados do download
  //     const contentDisposition = downloadResponse.headers['content-disposition']
  //     const filename = contentDisposition 
  //       ? decodeURIComponent(contentDisposition.split("filename*=utf-8''")[1])
  //       : `audio-${Date.now()}.mp4`

  //     const videoMetadata = downloadResponse.headers['x-video-metadata']
  //     const metadata = videoMetadata ? JSON.parse(videoMetadata) : null

  //     const audioBlob = new Blob([downloadResponse.data], { 
  //       type: downloadResponse.headers['content-type'] 
  //     })
  //     const audioUrl = URL.createObjectURL(audioBlob)

  //     // 2. Transcrever o áudio
  //     const transcription = await transcribeAudio(audioBlob, filename)

  //     // 3. Atualizar estado e contexto
  //     const newFile: any = {
  //       id: Date.now().toString(),
  //       name: filename,
  //       size: downloadResponse.headers['content-length'] || "Unknown",
  //       type: "audio" as const,
  //       status: "complete" as const,
  //       progress: 100,
  //       content: audioUrl
  //     }
  //     addFile(newFile)

  //     setData({
  //       audioUrl: audioUrl,
  //       originalText: transcription.originalText,
  //       formattedText: transcription.formattedText,
  //       summary: transcription.summary
  //     })

  //   } catch (error) {
  //     console.error('Error:', error)
  //     let errorMessage = "Ocorreu um erro desconhecido"
      
  //     if (axios.isAxiosError(error)) {
  //       if (error.response?.data?.detail) {
  //         errorMessage = error.response.data.detail[0]?.msg || "Erro na requisição"
  //       } else {
  //         errorMessage = error.message
  //       }
  //     } else if (error instanceof Error) {
  //       errorMessage = error.message
  //     }

  //     setError(errorMessage)
  //     setStatus({
  //       status: 'error',
  //       message: 'Erro no processamento'
  //     })
  //     setTimeout(resetForm, 2000)
  //   }
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setStatus({
      stage: 'starting',
      progress: 0,
      message: 'Iniciando processo...'
    })

    if (!videoLink.trim()) {
      setError("Por favor, insira um link do YouTube")
      return
    }

    try {
      // 1. Baixar o áudio
      setStatus({
        stage: 'downloading',
        progress: 30,
        message: 'Baixando áudio...'
      })

      const { audioBlob, filename } = await downloadAudio(videoLink)
      const audioUrl = URL.createObjectURL(audioBlob)

      // 2. Transcrever o áudio
      setStatus({
        stage: 'transcribing',
        progress: 60,
        message: 'Transcrevendo áudio...'
      })

      const transcription = await transcribeAudio(audioBlob, filename)

      // 3. Atualizar estado e contexto
      const newFile: any = {
        id: Date.now().toString(),
        name: filename,
        size: audioBlob.size,
        type: "audio" as const,
        status: "complete" as const,
        progress: 100,
        content: audioUrl
      }
      addFile(newFile)

      setStatus({
        progress: 100,
        status: 'complete',
        message: 'Transcrição concluída',
        data: {
          text: transcription.originalText || "Transcrição concluída",
          source: 'remote'
        }
      })

      setData({
        audioUrl: audioUrl,
        originalText: transcription.originalText,
        formattedText: transcription.formattedText,
        summary: transcription.summary
      })

    } catch (error) {
      console.error('Error:', error)
      let errorMessage = "Ocorreu um erro desconhecido"

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.detail) {
          errorMessage = error.response.data.detail[0]?.msg || "Erro na requisição"
        } else {
          errorMessage = error.message
        }
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      setError(errorMessage)
      setStatus({
        status: 'error',
        message: 'Erro no processamento'
      })
      setTimeout(resetForm, 2000)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Inserir link do YouTube"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          className="w-full px-4 py-3 pr-32 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          disabled={!!status && status.progress !== 100 && status.status !== 'error'}
        />
        <button
          type="submit"
          className="absolute right-1 top-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-100 font-medium px-4 py-2 rounded-full flex items-center gap-2 disabled:opacity-50"
          disabled={!!status && status.progress !== 100 && status.status !== 'error'}
        >
          {status?.status === 'complete' ? (
            <CheckCircle size={16} />
          ) : status?.status === 'error' ? (
            <FileText size={16} />
          ) : status ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <FileText size={16} />
          )}
          {status?.status === 'complete' ? 'Concluído' : 
           status?.status === 'error' ? 'Tentar novamente' : 'Transcrever'}
        </button>
      </form>

      {/* Barra de progresso */}
      {status && status.status !== 'error' && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${status.progress || 0}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              {status.status === 'complete' ? (
                <CheckCircle size={14} />
              ) : (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  {status.message || 'Processando...'}
                </>
              )}
            </p>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {status.progress}%
            </span>
          </div>
        </div>
      )}

      {/* Exibe o resultado quando completo */}
      {status?.status === 'complete' && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
          <h3 className="font-medium mb-2">Processamento concluído:</h3>
          <p className="text-sm whitespace-pre-wrap">
            {status.data?.text || "Concluído com sucesso"}
          </p>
          {status.data?.source && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Fonte: {status.data.source === 'local' ? 'Modelo Local' : 'Servidor Remoto'}
            </p>
          )}
        </div>
      )}

      {/* Mensagens de erro */}
      {error && (
        <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <AlertCircle className="flex-shrink-0 inline w-5 h-5 mr-3" />
          <span className="sr-only">Erro</span>
          <div>
            <span className="font-medium">Erro!</span> {error}
          </div>
        </div>
      )}
    </div>
  )
}