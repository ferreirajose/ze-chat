// import { useState } from "react"

// type TranscriptionContent = {
//   audioUrl?: string
//   originalText: string
//   formattedText?: string
//   summary?: string
// }

// export function useTranscriptionData() {
//   const [data, setData] = useState<TranscriptionContent | null>(null)

//   const setTranscriptionData = (newData: TranscriptionContent) => {
//     console.log(newData, 'useTranscriptionData')
//     setData(newData)
//   }

//   return {
//     data,
//     setTranscriptionData
//   }
// }

"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type TranscriptionContent = {
  audioUrl?: string
  originalText: string
  formattedText?: string
  summary?: string
}

type TranscriptionContextType = {
  data: TranscriptionContent | null
  setData: (data: TranscriptionContent) => void
}

const TranscriptionContext = createContext<TranscriptionContextType | undefined>(undefined)

export function TranscriptionProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<TranscriptionContent | null>(null)

  return (
    <TranscriptionContext.Provider value={{ data, setData }}>
      {children}
    </TranscriptionContext.Provider>
  )
}

export function useTranscriptionData() {
  const context = useContext(TranscriptionContext)
  if (!context) {
    throw new Error("useTranscriptionData deve ser usado dentro de TranscriptionProvider")
  }
  return context
}
