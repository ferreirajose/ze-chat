import { useState } from "react"

type UseDragAndDropOptions = {
  onDrop: (files: FileList) => void
}

export function useDragAndDrop({ onDrop }: UseDragAndDropOptions) {
  const [isDragging, setIsDragging] = useState(false)

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
      onDrop(e.dataTransfer.files)
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