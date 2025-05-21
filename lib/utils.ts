import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função auxiliar para cortar nomes de arquivos longos
export const trimFileName = (fileName: string, maxLength = 21) => {
  if (fileName.length <= maxLength) return fileName
  return `${fileName.substring(0, maxLength)} .....`
}