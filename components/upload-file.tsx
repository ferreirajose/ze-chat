"use client"

import React from "react"
import { FileUp, Mic, Paperclip, Upload } from "lucide-react"
import { useFiles } from "@/hooks/use-files"
import { useDragAndDrop } from "@/hooks/use-drag-and-drop"

export function UploadFile() {
  const { addFile, uploadFile } = useFiles()

  const handleFiles = async (files: FileList) => {
    const file = files[0]
    const newFile = {
      id: Date.now().toString(),
      name: file.name,
      size: `${Math.round(file.size / (1024 * 1024))} MB`,
      type: "document" as const,
      status: "downloading" as const,
      progress: 0,
    }

    addFile(newFile)
    await uploadFile(newFile, file)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const { isDragging, dragProps } = useDragAndDrop({
    onDrop: handleFiles
  })

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="bg-teal-600 p-3 rounded-lg mr-4 text-white">
          <Mic size={32} />
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
        <label className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
          Selecionar arquivo
          <Paperclip size={20} />
          <input
            type="file"
            className="hidden"
            onChange={handleFileInputChange}
            accept=".mp3,.mp4,.wav,.webm,.mpeg,.mpga,.m4a"
          />
        </label>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Tamanho máximo de 800MB por arquivo.</p>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold">Tipo permitidos:</p>
        <ul className="list-disc pl-5 mt-1">
          <li><b>Vídeos</b> (.webm, .mp4, .mpeg)</li>
          <li><b>Áudios</b> (.mpga, .m4a, .wav, .mp3)</li>
        </ul>
      </div>
    </div>
  )
}