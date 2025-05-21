import { useState } from "react"
import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE } from "@/constants/file"

type UseDragAndDropOptions = {
  onDrop: (files: FileList) => void
  onError: (message: string) => void
}

export function useDragAndDrop({ onDrop, onError }: UseDragAndDropOptions) {
  const [isDragging, setIsDragging] = useState(false)

  const validateFile = (file: File): boolean => {
    const extension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      onError(`Tipo de arquivo não permitido. Extensões permitidas: ${ALLOWED_EXTENSIONS.join(', ')}`);
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      onError(`Arquivo muito grande. Tamanho máximo permitido: ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      return false;
    }

    return true;
  }

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (e.dataTransfer.files.length > 1) {
        onError('Apenas um arquivo pode ser enviado por vez');
        return;
      }

      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onDrop(e.dataTransfer.files);
      }
      e.dataTransfer.clearData()
    }
  }

  return {
    isDragging,
    dragProps: {
      onDragEnter: handleDragIn,
      onDragLeave: handleDragOut,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    }
  }
}