"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useFilesModal } from "@/hooks/use-files-modal"
import { useFiles } from "@/hooks/use-files"
import { TranscriptionView } from "@/components/transcription-view"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FilesModal() {
  const { isOpen, closeFilesModal } = useFilesModal()
  const { files } = useFiles()
  const [selectedYear, setSelectedYear] = useState("2023")
  const [selectedMonth, setSelectedMonth] = useState("Janeiro")

  if (!isOpen) return null

  const years = ["2023", "2024", "2025"]
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-start">
      <div className="bg-white w-[50%] h-full overflow-y-auto animate-in slide-in-from-left dark:bg-gray-800">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Meus arquivos</h2>
            <button
              onClick={closeFilesModal}
              className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition-colors"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-1">
                Ano:
              </label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger id="year-select" className="w-full">
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-1">
                Mês:
              </label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger id="month-select" className="w-full">
                  <SelectValue placeholder="Selecione o mês" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {files.map((file) => (
              <AccordionItem key={file.id} value={file.id} className="mb-2 rounded-lg overflow-hidden border-none">
                <AccordionTrigger className="py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-t-lg flex flex-row-reverse justify-end gap-3">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{file.name}</span>
                    <div className="flex gap-2 text-xs">
                      {file.status === "complete" ? (
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Completo - 100%</span>
                      ) : file.status === "error" ? (
                        <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full">Erro</span>
                      ) : (
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          Baixando - {file.progress}%
                        </span>
                      )}
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{file.size}</span>
                      {file.type === "link" ? (
                        <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">Link</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">Documento</span>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 bg-white dark:bg-gray-800 rounded-b-lg border border-gray-200 dark:border-gray-700 border-t-0">
                  <TranscriptionView fileName={file.name} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
