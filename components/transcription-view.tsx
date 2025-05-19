"use client"

import { useTranscriptionData } from "@/hooks/transcription-context";
import { useState, useRef } from "react";
interface TranscriptionViewProps {
  fileName?: string
}

type TranscriptionTab = "resumo" | "original" | "formatada"

export function TranscriptionView({ fileName = "natureza-mae.mp4" }: TranscriptionViewProps) {

  const { data } = useTranscriptionData();

  const [activeTab, setActiveTab] = useState<TranscriptionTab>("resumo")
  const audioRef = useRef<HTMLAudioElement>(null)

  console.log(data, 'TranscriptionView')
  const transcriptionContent = {
    resumo: (
      <p className="dark:text-gray-300">
       { data?.summary || "Nenhum resumo disponível."}
      </p>
    ),
    original: (
      <p className="dark:text-gray-300">
        { data?.originalText || "Nenhuma transcrição disponível." }
      </p>
    ),
    formatada: (
      <p className="dark:text-gray-300">
        { data?.formattedText || "Nenhuma transcrição formatada disponível." }
      </p>
    )
  }

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
           {["resumo", "original", "formatada"].map(tab => (
            <button
              key={tab}
              className={`py-4 px-4 font-medium rounded-md transition-colors ${
                activeTab === tab
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveTab(tab as TranscriptionTab)}
            >
              {tab === "resumo" ? "Resumo" : tab === "original" ? "Transcrição original" : "Transcrição formatada por IA"}
            </button>
          ))}
        </div>
  
        <div className="prose max-w-none dark:prose-invert">
          {transcriptionContent[activeTab]}
        </div>
      </div>
    </div>
  )
}