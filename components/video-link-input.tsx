// "use client"

// import { useState, useEffect } from "react"
// import { FileText, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
// import { useFiles } from "@/hooks/use-files"

// export function VideoLinkInput() {
//   const [videoLink, setVideoLink] = useState("")
//   const [error, setError] = useState<string | null>(null)
//   const [status, setStatus] = useState<{
//     stage?: string
//     progress?: number
//     message?: string
//   } | null>(null)
//   const { addFile } = useFiles()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError(null)
//     setStatus(null)

//     if (!videoLink.trim()) {
//       setError("Por favor, insira um link do YouTube")
//       return
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/transcribe?url=${encodeURIComponent(videoLink)}`,
//         {
//           headers: {
//             Accept: 'text/event-stream'
//           }
//         }
//       )

//       if (!response.ok) {
//         throw new Error("Falha ao iniciar a transcrição")
//       }

//       if (!response.body) {
//         throw new Error("Não foi possível ler a resposta do servidor")
//       }

//       const reader = response.body.getReader()
//       const decoder = new TextDecoder()
//       let resultText = ""

//       const processStream = async () => {
//         while (true) {
//           const { done, value } = await reader.read()
//           if (done) break

//           const chunk = decoder.decode(value)
//           const lines = chunk.split('\n').filter(line => line.trim() !== '')

//           for (const line of lines) {
//             if (line.startsWith('data: ')) {
//               try {
//                 const data = JSON.parse(line.substring(6)) // Remove 'data: ' prefix
                
//                 if (data.status === 'complete') {
//                   resultText = data.data?.text || ""
//                   setStatus({
//                     stage: 'complete',
//                     progress: 100,
//                     message: 'Transcrição concluída!'
//                   })
//                 } else {
//                   setStatus({
//                     stage: data.stage,
//                     progress: data.progress,
//                     message: data.message
//                   })
//                 }
//               } catch (e) {
//                 console.error('Erro ao parsear JSON:', e)
//               }
//             }
//           }
//         }

//         // Adiciona o arquivo com a transcrição quando completo
//         if (resultText) {
//           const newFile: any = {
//             id: Date.now().toString(),
//             name: `Transcrição-${new Date().toLocaleString()}`,
//             size: "Unknown",
//             type: "transcription" as const,
//             status: "complete" as const,
//             progress: 100,
//             content: resultText
//           }
//           addFile(newFile)
//           setVideoLink("")
//         }
//       }

//       processStream().catch(error => {
//         console.error('Erro no stream:', error)
//         setError(error.message)
//       })

//     } catch (error) {
//       console.error('Error:', error)
//       setError(error instanceof Error ? error.message : "Ocorreu um erro desconhecido")
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <form onSubmit={handleSubmit} className="relative" disabled={status?.stage === 'complete'}>
//         <input
//           type="text"
//           placeholder="Inserir link do YouTube"
//           value={videoLink}
//           onChange={(e) => setVideoLink(e.target.value)}
//           className="w-full px-4 py-3 pr-32 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
//           disabled={!!status && status.stage !== 'complete'}
//         />
//         <button
//           type="submit"
//           className="absolute right-1 top-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-100 font-medium px-4 py-2 rounded-full flex items-center gap-2 disabled:opacity-50"
//           disabled={!!status && status.stage !== 'complete'}
//         >
//           {status?.stage === 'complete' ? (
//             <CheckCircle size={16} />
//           ) : status ? (
//             <Loader2 size={16} className="animate-spin" />
//           ) : (
//             <FileText size={16} />
//           )}
//           {status?.stage === 'complete' ? 'Concluído' : 'Transcrever'}
//         </button>
//       </form>

//       {/* Status da transcrição */}
//       {status && (
//         <div className="space-y-2">
//           <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
//             <div
//               className="bg-blue-600 h-2.5 rounded-full"
//               style={{ width: `${status.progress || 0}%` }}
//             ></div>
//           </div>
//           <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
//             {status.stage === 'download' && <Loader2 size={14} className="animate-spin" />}
//             {status.stage === 'conversion' && <Loader2 size={14} className="animate-spin" />}
//             {status.stage === 'transcription' && <Loader2 size={14} className="animate-spin" />}
//             {status.stage === 'complete' && <CheckCircle size={14} />}
//             {status.message}
//           </p>
//         </div>
//       )}

//       {/* Componente de erro */}
//       {error && (
//         <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//           <AlertCircle className="flex-shrink-0 inline w-5 h-5 mr-3" />
//           <span className="sr-only">Erro</span>
//           <div>
//             <span className="font-medium">Erro!</span> {error}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { FileText, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useFiles } from "@/hooks/use-files"

export function VideoLinkInput() {
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
      const response = await fetch(
        `http://localhost:3000/api/transcribe?url=${encodeURIComponent(videoLink)}`,
        {
          headers: {
            Accept: 'text/event-stream'
          }
        }
      )

      if (!response.ok) {
        throw new Error("Falha ao iniciar a transcrição")
      }

      if (!response.body) {
        throw new Error("Não foi possível ler a resposta do servidor")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n').filter(line => line.trim() !== '')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.substring(6))
                setStatus(prev => ({ ...prev, ...data }))

                if (data.status === 'complete') {
                  const newFile: any = {
                    id: Date.now().toString(),
                    name: `Transcrição-${new Date().toLocaleString()}`,
                    size: "Unknown",
                    type: "transcription" as const,
                    status: "complete" as const,
                    progress: 100,
                    content: data.data?.text || ""
                  }
                  addFile(newFile)
                  setTimeout(resetForm, 2000) // Reset após 2 segundos
                }

                if (data.status === 'error') {
                  setError(data.error || "Erro desconhecido")
                  //setTimeout(resetForm, 2000) // Reset após 2 segundos
                }
              } catch (e) {
                console.error('Erro ao parsear JSON:', e)
              }
            }
          }
        }
      }

      processStream().catch(error => {
        console.error('Erro no stream:', error)
        setError(error.message)
        setTimeout(resetForm, 2000)
      })

    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : "Ocorreu um erro desconhecido")
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
          <h3 className="font-medium mb-2">Transcrição concluída:</h3>
          <p className="text-sm whitespace-pre-wrap">
            {status.data?.text || "Nenhum conteúdo retornado"}
          </p>
          {status.data?.source && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Fonte: {status.data.source === 'local' ? 'Modelo Local' : 'OpenAI'}
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