"use client"

import { useTranscriptionData } from "@/hooks/transcription-context";
import { useState, useRef } from "react";
interface TranscriptionViewProps {
  fileName?: string
}

type TranscriptionTab = "resumo" | "original" | "formatada"

export function TranscriptionView({ fileName = "natureza-mae.mp4" }: TranscriptionViewProps) {
  const { data } = useTranscriptionData();
  const [activeTab, setActiveTab] = useState<TranscriptionTab>("original") // Mudei padrão para "original"
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleDownloadAudio = () => {
    if (!data?.audioUrl) return;
    
    const link = document.createElement('a');
    link.href = data.audioUrl;
    link.download = fileName || 'audio.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadText = () => {
    let content = '';
    let extension = '.txt';
    
    switch (activeTab) {
      case 'resumo':
        content = data?.summary || '';
        break;
      case 'original':
        content = data?.originalText || '';
        break;
      case 'formatada':
        content = data?.formattedText || '';
        break;
    }

    if (!content) return;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName || 'transcricao'}-${activeTab}${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
    const transcriptionContent = {
    resumo: (
      <div className="prose dark:prose-invert max-w-none">
        {data?.summary ? (
          <p className="whitespace-pre-wrap dark:text-gray-300">{data.summary}</p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Nenhum resumo disponível.</p>
        )}
      </div>
    ),
    original: (
      <div className="prose dark:prose-invert max-w-none">
        {data?.originalText ? (
          <p className="whitespace-pre-wrap dark:text-gray-300">{data.originalText}</p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Nenhuma transcrição original disponível.</p>
        )}
      </div>
    ),
    formatada: (
      <div className="prose dark:prose-invert max-w-none">
        {data?.formattedText ? (
          <p className="whitespace-pre-wrap dark:text-gray-300">{data.formattedText}</p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Nenhuma transcrição formatada disponível.</p>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Transcrição: <span className="font-normal">{fileName}</span>
        </h2>
  
        {/* Audio player and download buttons */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-[60%]">
            <audio 
              controls
              ref={audioRef}
              src={data?.audioUrl || undefined}
              className="w-full"
            />
           
          </div>
          
          <div className="flex gap-2 flex-grow-[1] min-w-0">
            <button 
              onClick={handleDownloadAudio}
              disabled={!data?.audioUrl}
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 flex-1 justify-center min-w-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="truncate">Download áudio</span>
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
            </button>
            <button 
              onClick={handleDownloadText}
              disabled={!data?.[activeTab === 'resumo' ? 'summary' : activeTab === 'original' ? 'originalText' : 'formattedText']}
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 flex-1 justify-center min-w-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="truncate">Download texto</span>
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
            </button>
          </div>
        </div>

         {!data?.audioUrl && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Nenhum áudio disponível
            </p>
          )}
          
        <div className="bg-gray-100 dark:bg-gray-700 border rounded-lg mb-4 flex">
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
  
        {transcriptionContent[activeTab]}
      </div>
    </div>
  )
}