"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useFiles } from "@/hooks/use-files"

interface DeleteConfirmationModalProps {
  fileId: string
  fileName: string
  onClose: () => void
}

export function DeleteConfirmationModal({ fileId, fileName, onClose }: DeleteConfirmationModalProps) {
  const { removeFile } = useFiles()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleDelete = () => {
    removeFile(fileId)
    onClose()
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(onClose, 200) // Allow animation to complete
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleClose}>
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md transform transition-all duration-200 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Excluir arquivo de transcrição</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300">Você deseja excluir o arquivo que está transcrito?</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-blue-600 dark:text-blue-400 font-medium"
          >
            Não
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Sim, excluir
          </button>
        </div>
      </div>
    </div>
  )
}
