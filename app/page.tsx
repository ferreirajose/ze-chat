import { Header } from "@/components/header"
import { FileList } from "@/components/file-list"
import { UploadFile } from "@/components/upload-file"
import { TranscriptionView } from "@/components/transcription-view"
import { VideoLinkInput } from "@/components/video-link-input"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-800 dark:to-gray-900">
      <div className="xl:container w-full mx-auto px-4 py-8">
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-1 space-y-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <UploadFile />
            <FileList />
          </div>

          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">Olá, eu sou a Aurora.</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              A sua assistente inteligente de transcrições, projetada para transformar suas gravações em textos precisos
              e de alta qualidade, de forma rápida e eficiente.
            </p>

            <VideoLinkInput />

            <div className="mt-6">
              <TranscriptionView fileName="back-in-black.mp3" />
            </div>

            <div className="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm">
              Tribunal de Contas de Pernambuco (TCE-PE) - Aurora Transcrições v1.0
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
