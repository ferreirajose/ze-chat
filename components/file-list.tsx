"use client"

import { ChevronRight } from "lucide-react"
import { useFilesModal } from "@/hooks/use-files-modal"
import { useFiles } from "@/hooks/use-files"
import { FileIcon, LinkIcon, FileTextIcon, AlertTriangleIcon, X } from "lucide-react"

export function FileList() {
  const { files, removeFile } = useFiles()
  const { openFilesModal } = useFilesModal()

  // Define a altura máxima baseada no número de arquivos
  const containerClass = files.length > 6 
    ? "overflow-y-auto max-h-[500px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
    : "overflow-hidden"

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Meus arquivos</h3>
        <button
          onClick={openFilesModal}
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-2 transition-colors"
          aria-label="Ver todos os arquivos"
        >
          <ChevronRight size={16} className="text-gray-500 dark:text-gray-300" />
        </button>
      </div>
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800">
        {files.length === 0 ? (
          <div className="text-center py-6 text-gray-500">Nenhum arquivo encontrado</div>
        ) : (
          <div className={containerClass}>
            <div className="space-y-3 p-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between py-3 px-2 bg-gray-100 dark:bg-gray-700 rounded-[7px] border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center">
                    <div>
                      <div className="font-medium truncate max-w-[180px]">{file.name}</div>
                      <div className="flex gap-2 text-xs flex-wrap">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                          {file.size}
                        </span>
                        {file.type === "link" ? (
                          <span className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded-full flex items-center">
                            <LinkIcon size={12} className="mr-1" />
                            Link
                          </span>
                        ) : (
                          <span className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded-full flex items-center">
                            <FileTextIcon size={12} className="mr-1" />
                            Documento
                          </span>
                        )}
                        {file.status === "complete" ? (
                          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
                            Completo
                          </span>
                        ) : file.status === "error" ? (
                          <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-0.5 rounded-full flex items-center">
                            <AlertTriangleIcon size={12} className="mr-1" />
                            Erro
                          </span>
                        ) : (
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                            {file.progress}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1 transition-colors"
                    aria-label="Remover arquivo"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}