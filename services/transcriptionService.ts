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

export async function uploadAndTranscribe(
  file: File,
  onProgress?: (progress: number, isUploadComplete: boolean) => void
): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("uploaded_file", file, file.name);

    const response = await axios.post(
      `${API_BASE_URL}/transcreve_audio_via_upload`,
      formData,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${API_AUTH_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1))
            // Indica que é apenas progresso do upload (não da requisição completa)
            onProgress(progress, false);
          }
        },
      }
    );

    return {
      audioUrl: URL.createObjectURL(file),
      originalText: response.data.texto,
      formattedText: response.data.texto_formatado,
      summary: response.data.resumo || "",
    };
  } catch (error) {
    console.error("Error in uploadAndTranscribe:", error);
    throw error;
  }
}