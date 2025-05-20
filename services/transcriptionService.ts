import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const API_AUTH_TOKEN = process.env.API_AUTH_TOKEN

export async function downloadAudio(videoLink: string) {
  const response = await axios.get(`${API_BASE_URL}/download_audio/`, {
    params: { url: videoLink },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${API_AUTH_TOKEN}`
    },
    responseType: "blob"
  })

  const contentDisposition = response.headers["content-disposition"]
  const filename = contentDisposition
    ? decodeURIComponent(contentDisposition.split("filename*=utf-8''")[1])
    : `audio-${Date.now()}.mp4`

  const metadata = response.headers["x-video-metadata"]
    ? JSON.parse(response.headers["x-video-metadata"])
    : null

  const audioBlob = new Blob([response.data], {
    type: response.headers["content-type"]
  })

  return { audioBlob, filename, metadata }
}

export async function transcribeAudio(audioBlob: Blob, filename: string) {
  const formData = new FormData()
  formData.append("uploaded_file", audioBlob, filename)

  const response = await axios.post(
    `${API_BASE_URL}/transcreve_audio_via_upload`,
    formData,
    {
      params: { save_in_db: false },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_AUTH_TOKEN}`,
        "Content-Type": "multipart/form-data"
      }
    }
  )

  const { texto, texto_formatado } = response.data

  return {
    originalText: texto,
    formattedText: texto_formatado,
    summary: "" // Ajuste conforme necessário
  }
}
