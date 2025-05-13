// "use client"

// import { useState } from "react"
// import { Volume2, Info, Download } from "lucide-react"

// interface TranscriptionViewProps {
//   fileName?: string
// }

// export function TranscriptionView({ fileName = "natureza-mae.mp4" }: TranscriptionViewProps) {
//   const [activeTab, setActiveTab] = useState("resumo")

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">
//           Transcrição: <span className="font-normal">{fileName}</span>
//         </h2>
//         <button
//           className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm"
//           onClick={() => console.log("Remover transcription")}
//         >
//           Remover
//         </button>
//       </div>

//       <div className="flex items-center gap-4 mb-6">
//         {/* Audio player */}
//         <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex-grow">
//           <button className="bg-gray-300 dark:bg-gray-600 rounded-full w-9 h-9 flex items-center justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polygon points="5 3 19 12 5 21 5 3"></polygon>
//             </svg>
//           </button>
//           <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">00:00 / 01:08</span>
//           <div className="mx-4 flex-grow">
//             <div className="bg-gray-300 dark:bg-gray-600 h-2 rounded-full w-full">
//               <div className="bg-gray-500 dark:bg-gray-400 h-2 rounded-full w-0"></div>
//             </div>
//           </div>
//           <button className="text-gray-600 dark:text-gray-300">
//             <Volume2 size={20} />
//           </button>
//           <button className="text-gray-600 dark:text-gray-300 ml-2">
//             <Info size={20} />
//           </button>
//         </div>

//         {/* Download buttons */}
//         <div className="flex gap-2">
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
//             <Download size={16} />
//             Download áudio
//           </button>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
//             <Download size={16} />
//             Download texto
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-4">
//         <button
//           className={`px-4 py-2 rounded-md ${
//             activeTab === "resumo"
//               ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100"
//               : "text-gray-700 dark:text-gray-300"
//           }`}
//           onClick={() => setActiveTab("resumo")}
//         >
//           Resumo
//         </button>
//         <button
//           className={`px-4 py-2 rounded-md ${
//             activeTab === "original"
//               ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100"
//               : "text-gray-700 dark:text-gray-300"
//           }`}
//           onClick={() => setActiveTab("original")}
//         >
//           Transcrição original
//         </button>
//         <button
//           className={`px-4 py-2 rounded-md ${
//             activeTab === "formatada"
//               ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100"
//               : "text-gray-700 dark:text-gray-300"
//           }`}
//           onClick={() => setActiveTab("formatada")}
//         >
//           Transcrição formatada por IA
//         </button>
//       </div>

//       {/* Transcription content */}
//       <div className="text-base leading-relaxed text-gray-800 dark:text-gray-200">
//         <p>
//           Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
//           industry&apos;s standard dummy text ever since the 1500s, when an{" "}
//           <span className="bg-blue-100 dark:bg-blue-900 px-1">unknown printer took</span> a galley of type and scrambled
//           it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
//           typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
//           sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
//           PageMaker including versions of Lorem Ipsum.
//         </p>
//       </div>
//     </div>
//   )
// }

// v2
// "use client"

// import { JSX, useState } from "react"
// import { Volume2, Info, Download } from "lucide-react"

// interface TranscriptionViewProps {
//   fileName?: string
// }

// type TabKey = "resumo" | "original" | "formatada"

// export function TranscriptionView({ fileName = "natureza-mae.mp4" }: TranscriptionViewProps) {
//   const [activeTab, setActiveTab] = useState("resumo")

//   // Conteúdos diferentes para cada tab
//   const tabContents: Record<TabKey, JSX.Element> = {
//     resumo: (
//       <div className="text-base leading-relaxed text-gray-800 dark:text-gray-200">
//         <h3 className="font-bold mb-2">Resumo do conteúdo:</h3>
//         <p>
//           Este é o resumo da transcrição. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//           <span className="bg-blue-100 dark:bg-blue-900 px-1">Resumo contendo apenas</span> as partes mais importantes
//           do conteúdo original.
//         </p>
//       </div>
//     ),
//     original: (
//       <div className="text-base leading-relaxed text-gray-800 dark:text-gray-200">
//         <h3 className="font-bold mb-2">Transcrição original:</h3>
//         <p>
//           Esta é a transcrição original, sem formatação. Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
//           took a galley of type and scrambled it to make a type specimen book.
//         </p>
//       </div>
//     ),
//     formatada: (
//       <div className="text-base leading-relaxed text-gray-800 dark:text-gray-200">
//         <h3 className="font-bold mb-2">Transcrição formatada por IA:</h3>
//         <p>
//           Esta é a versão formatada pela IA. <span className="bg-yellow-100 dark:bg-yellow-900 px-1">Estrutura</span> e
//           <span className="bg-yellow-100 dark:bg-yellow-900 px-1">organização</span> melhoradas para facilitar a leitura.
//           Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//         </p>
//         <ul className="mt-2 list-disc pl-5">
//           <li>Pontos principais destacados</li>
//           <li>Estrutura hierárquica</li>
//           <li>Palavras-chave marcadas</li>
//         </ul>
//       </div>
//     )
//   }

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">
//           Transcrição: <span className="font-normal">{fileName}</span>
//         </h2>
//         <button
//           className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm"
//           onClick={() => console.log("Remover transcription")}
//         >
//           Remover
//         </button>
//       </div>

//       <div className="flex items-center gap-4 mb-6">
//         {/* Audio player */}
//         <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex-grow">
//           <button className="bg-gray-300 dark:bg-gray-600 rounded-full w-9 h-9 flex items-center justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polygon points="5 3 19 12 5 21 5 3"></polygon>
//             </svg>
//           </button>
//           <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">00:00 / 01:08</span>
//           <div className="mx-4 flex-grow">
//             <div className="bg-gray-300 dark:bg-gray-600 h-2 rounded-full w-full">
//               <div className="bg-gray-500 dark:bg-gray-400 h-2 rounded-full w-0"></div>
//             </div>
//           </div>
//           <button className="text-gray-600 dark:text-gray-300">
//             <Volume2 size={20} />
//           </button>
//           <button className="text-gray-600 dark:text-gray-300 ml-2">
//             <Info size={20} />
//           </button>
//         </div>

//         {/* Download buttons */}
//         <div className="flex gap-2">
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
//             <Download size={16} />
//             Download áudio
//           </button>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
//             <Download size={16} />
//             Download texto
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-4">
//         <button
//           className={`px-4 py-2 rounded-md ${
//             activeTab === "resumo"
//               ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100"
//               : "text-gray-700 dark:text-gray-300"
//           }`}
//           onClick={() => setActiveTab("resumo")}
//         >
//           Resumo
//         </button>
//         <button
//           className={`px-4 py-2 rounded-md ${
//             activeTab === "original"
//               ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100"
//               : "text-gray-700 dark:text-gray-300"
//           }`}
//           onClick={() => setActiveTab("original")}
//         >
//           Transcrição original
//         </button>
//         <button
//           className={`px-4 py-2 rounded-md ${
//             activeTab === "formatada"
//               ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100"
//               : "text-gray-700 dark:text-gray-300"
//           }`}
//           onClick={() => setActiveTab("formatada")}
//         >
//           Transcrição formatada por IA
//         </button>
//       </div>

//       {/* Transcription content - agora mostra o conteúdo baseado na tab ativa */}
//       {tabContents[activeTab]}
//     </div>
//   )
// }

"use client"

import { useState, useRef, useEffect } from "react"
import { PlayIcon, PauseIcon, VolumeIcon, InfoIcon } from "lucide-react"

interface TranscriptionViewProps {
  fileName?: string
}

type TranscriptionTab = "resumo" | "original" | "formatada"

export function TranscriptionView({ fileName = "natureza-mae.mp4" }: TranscriptionViewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(68) // 1:08 in seconds
  const [activeTab, setActiveTab] = useState<TranscriptionTab>("resumo")
  const audioRef = useRef<HTMLAudioElement>(null)

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('durationchange', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('durationchange', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const transcriptionContent = {
    resumo: (
      <p className="dark:text-gray-300">
        Resumo: Este é um resumo da transcrição. Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        <span className="bg-blue-100 dark:bg-blue-900/30 px-1">Destaque importante</span> no resumo.
      </p>
    ),
    original: (
      <p className="dark:text-gray-300">
        Transcrição original: Este é o texto original sem formatação. When an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five centuries.
      </p>
    ),
    formatada: (
      <p className="dark:text-gray-300">
        Transcrição formatada por IA: Este texto foi processado por IA. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.
      </p>
    )
  }

  // return (
  //   <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm overflow-hidden">
  //     <div className="p-6">
  //       <h2 className="text-xl font-bold mb-4 dark:text-white">
  //         Transcrição: <span className="font-normal">{fileName}</span>
  //       </h2>
  
  //       {/* Audio player and download buttons in the same line */}
  //       <div className="flex items-center gap-4 mb-6">
  //         {/* Audio player - 60% width */}
  //         <div className="w-[60%]">
  //           <audio 
  //             controls
  //             ref={audioRef}
  //             src="../sound/ac-dc-back-in-black.mp3"
  //             onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
  //             className="w-full"
  //           />
  //         </div>
          
  //         {/* Download buttons - 40% width (flex-grow to use remaining space) */}
  //         <div className="flex gap-2 flex-1 max-w-[40%]">
  //           <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 flex-1 justify-center">
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="20"
  //               height="20"
  //               viewBox="0 0 24 24"
  //               fill="none"
  //               stroke="currentColor"
  //               strokeWidth="2"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               className="lucide lucide-download"
  //             >
  //               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  //               <polyline points="7 10 12 15 17 10" />
  //               <line x1="12" x2="12" y1="15" y2="3" />
  //             </svg>
  //             Download áudio
  //           </button>
  //           <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 flex-1 justify-center">
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="20"
  //               height="20"
  //               viewBox="0 0 24 24"
  //               fill="none"
  //               stroke="currentColor"
  //               strokeWidth="2"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               className="lucide lucide-file-text"
  //             >
  //               <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
  //               <polyline points="14 2 14 8 20 8" />
  //               <line x1="16" x2="8" y1="13" y2="13" />
  //               <line x1="16" x2="8" y1="17" y2="17" />
  //               <line x1="10" x2="8" y1="9" y2="9" />
  //             </svg>
  //             Download texto
  //           </button>
  //         </div>
  //       </div>
  
  //       {/* Tabs */}
  //       <div className="bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 p-1 flex">
  //         <button
  //           className={`py-4 px-4 font-medium rounded-md transition-colors ${
  //             activeTab === "resumo"
  //               ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
  //               : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
  //           }`}
  //           onClick={() => setActiveTab("resumo")}
  //         >
  //           Resumo
  //         </button>
  //         <button
  //           className={`py-4 px-4 font-medium rounded-md transition-colors ${
  //             activeTab === "original"
  //               ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
  //               : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
  //           }`}
  //           onClick={() => setActiveTab("original")}
  //         >
  //           Transcrição original
  //         </button>
  //         <button
  //           className={`py-4 px-4 font-medium rounded-md transition-colors ${
  //             activeTab === "formatada"
  //               ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
  //               : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
  //           }`}
  //           onClick={() => setActiveTab("formatada")}
  //         >
  //           Transcrição formatada por IA
  //         </button>
  //       </div>
  
  //       {/* Transcription content */}
  //       <div className="prose max-w-none dark:prose-invert">
  //         {transcriptionContent[activeTab]}
  //       </div>
  //     </div>
  //   </div>
  // )

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Transcrição: <span className="font-normal">{fileName}</span>
        </h2>
  
        {/* Audio player and download buttons in the same line */}
        <div className="flex items-center gap-4 mb-6">
          {/* Audio player - will take approximately 60% of space */}
          <div className="w-[60%]"> {/* 3 partes de 5 = 60% */}
            <audio 
              controls
              ref={audioRef}
              src="../sound/ac-dc-back-in-black.mp3"
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              className="w-full"
            />
          </div>
          
          {/* Download buttons - will take approximately 40% of space (2 partes de 5) */}
          <div className="flex gap-2 flex-grow-[1] min-w-0"> {/* 2 partes de 5 = 40% */}
            <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 flex-1 justify-center min-w-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-download"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              <span className="truncate">Download áudio</span>
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 flex-1 justify-center min-w-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-text"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" x2="8" y1="13" y2="13" />
                <line x1="16" x2="8" y1="17" y2="17" />
                <line x1="10" x2="8" y1="9" y2="9" />
              </svg>
              <span className="truncate">Download texto</span>
            </button>
          </div>
        </div>
  
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 p-1 flex">
          <button
            className={`py-4 px-4 font-medium rounded-md transition-colors ${
              activeTab === "resumo"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("resumo")}
          >
            Resumo
          </button>
          <button
            className={`py-4 px-4 font-medium rounded-md transition-colors ${
              activeTab === "original"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("original")}
          >
            Transcrição original
          </button>
          <button
            className={`py-4 px-4 font-medium rounded-md transition-colors ${
              activeTab === "formatada"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("formatada")}
          >
            Transcrição formatada por IA
          </button>
        </div>
  
        <div className="prose max-w-none dark:prose-invert">
          {transcriptionContent[activeTab]}
        </div>
      </div>
    </div>
  )
}