// "use client"

// import { create } from "zustand"

// export interface File {
//   id: string
//   name: string
//   size: string
//   type: "link" | "document"
//   status: "complete" | "error" | "downloading"
//   progress?: number
// }

// interface FilesStore {
//   files: File[]
//   addFile: (file: File) => void
//   removeFile: (id: string) => void
//   updateFileStatus: (id: string, status: File["status"], progress?: number) => void
// }

// export const useFiles = create<FilesStore>((set) => ({
//   files: [
//     {
//       id: "1",
//       name: "natureza.mp4",
//       size: "08 MB",
//       type: "link",
//       status: "complete",
//       progress: 100,
//     },
//     {
//       id: "2",
//       name: "noticia-ultimas.mp4",
//       size: "04 MB",
//       type: "document",
//       status: "error",
//     },
//     {
//       id: "3",
//       name: "carros-de-corrida.mp4",
//       size: "04 MB",
//       type: "document",
//       status: "downloading",
//       progress: 60,
//     },
//   ],

//   addFile: (file) =>
//     set((state) => ({
//       files: [...state.files, file],
//     })),

//   removeFile: (id) =>
//     set((state) => ({
//       files: state.files.filter((file) => file.id !== id),
//     })),

//   updateFileStatus: (id, status, progress) =>
//     set((state) => ({
//       files: state.files.map((file) =>
//         file.id === id ? { ...file, status, ...(progress !== undefined && { progress }) } : file,
//       ),
//     })),
// }))

"use client"

import { create } from "zustand"
import axios from 'axios';

export interface File {
  id: string
  name: string
  size: string
  type: "link" | "document"
  status: "complete" | "error" | "downloading"
  progress?: number
}

interface FilesStore {
  files: File[]
  addFile: (file: File) => void
  removeFile: (id: string) => void
  updateFileStatus: (id: string, status: File["status"], progress?: number) => void
  uploadFile: (file: File, fileData: Blob) => Promise<void>
}

export const useFiles = create<FilesStore>((set, get) => ({
  files: [
    {
      id: "1",
      name: "natureza.mp4",
      size: "08 MB",
      type: "link",
      status: "complete",
      progress: 100,
    },
    {
      id: "2",
      name: "noticia-ultimas.mp4",
      size: "04 MB",
      type: "document",
      status: "error",
    },
    {
      id: "3",
      name: "carros-de-corrida.mp4",
      size: "04 MB",
      type: "document",
      status: "downloading",
      progress: 60,
    },
    {
      id: "4",
      name: "natureza.mp4",
      size: "08 MB",
      type: "link",
      status: "complete",
      progress: 100,
    },
    {
      id: "5",
      name: "noticia-ultimas.mp4",
      size: "04 MB",
      type: "document",
      status: "error",
    },
    {
      id: "6",
      name: "carros-de-corrida.mp4",
      size: "04 MB",
      type: "document",
      status: "downloading",
      progress: 60,
    },
    {
      id: "7",
      name: "natureza.mp4",
      size: "08 MB",
      type: "link",
      status: "complete",
      progress: 100,
    },
    {
      id: "8",
      name: "noticia-ultimas.mp4",
      size: "04 MB",
      type: "document",
      status: "error",
    },
    {
      id: "9",
      name: "carros-de-corrida.mp4",
      size: "04 MB",
      type: "document",
      status: "downloading",
      progress: 60,
    },
  ],

  addFile: (file) =>
    set((state) => ({
      files: [...state.files, file],
    })),

  removeFile: (id) =>
    set((state) => ({
      files: state.files.filter((file) => file.id !== id),
    })),

  updateFileStatus: (id, status, progress) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, status, ...(progress !== undefined && { progress }) } : file,
      ),
    })),

  uploadFile: async (file, fileData) => {
    try {
      const formData = new FormData()
      formData.append('file', fileData, file.name)

      await axios.post('http://localhost:3000/upload', formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            console.log(progress, 'progress')
            get().updateFileStatus(file.id, 'downloading', progress)
          }
        }
      })

      get().updateFileStatus(file.id, 'complete', 100)
    } catch (error) {
      console.error('Upload failed:', error)
      get().updateFileStatus(file.id, 'error')
    }
  }
}))
