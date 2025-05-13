"use client"

import type React from "react"

import { useState } from "react"
import { FileText } from "lucide-react"
import { useFiles } from "@/hooks/use-files"

export function VideoLinkInput() {
  const [videoLink, setVideoLink] = useState("")
  const { addFile } = useFiles()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (videoLink.trim()) {
      // Extract filename from URL or use generic name
      const urlParts = videoLink.split("/")
      const fileName = urlParts[urlParts.length - 1] || "video-link.mp4"

      const newFile = {
        id: Date.now().toString(),
        name: fileName,
        size: "Unknown",
        type: "link" as const,
        status: "downloading" as const,
        progress: 0,
      }

      addFile(newFile)

      // Simulate download progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        if (progress <= 100) {
          useFiles.getState().updateFileStatus(newFile.id, "downloading", progress)
        } else {
          clearInterval(interval)
          useFiles.getState().updateFileStatus(newFile.id, "complete", 100)
        }
      }, 500)

      setVideoLink("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        placeholder="Inserir link do vídeo"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        className="w-full px-4 py-3 pr-32 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
      />
      <button
        type="submit"
        className="absolute right-1 top-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-100 font-medium px-4 py-2 rounded-full flex items-center gap-2"
      >
        Transcrever
        <FileText size={16} />
      </button>
    </form>
  )
}
