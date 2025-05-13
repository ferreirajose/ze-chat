"use client"

import { create } from "zustand"

interface FilesModalStore {
  isOpen: boolean
  openFilesModal: () => void
  closeFilesModal: () => void
}

export const useFilesModal = create<FilesModalStore>((set) => ({
  isOpen: false,
  openFilesModal: () => set({ isOpen: true }),
  closeFilesModal: () => set({ isOpen: false }),
}))
