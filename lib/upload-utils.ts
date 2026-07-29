import { supabase } from "./supabaseClient"

export interface UploadOptions {
  bucketName: string
  file: File
  allowedTypes?: string[] // e.g. ['image/png', 'image/jpeg', 'image/webp']
  maxSizeMB?: number // e.g. 5 for images, 25 for audio, 50 for video
}

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

/**
 * Uploads a file safely to Supabase Storage with size and type checks.
 */
export async function uploadFileToSupabase({
  bucketName,
  file,
  allowedTypes,
  maxSizeMB = 10,
}: UploadOptions): Promise<UploadResult> {
  if (!file) {
    return { success: false, error: "Tidak ada file yang dipilih." }
  }

  // 1. Validate file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return {
      success: false,
      error: `Ukuran file (${(file.size / (1024 * 1024)).toFixed(1)}MB) melebihi batas maksimum ${maxSizeMB}MB.`,
    }
  }

  // 2. Validate MIME type if allowedTypes provided
  if (allowedTypes && allowedTypes.length > 0) {
    const isAllowed = allowedTypes.some((type) => {
      if (type.endsWith("/*")) {
        const category = type.split("/")[0]
        return file.type.startsWith(`${category}/`)
      }
      return file.type === type
    })

    if (!isAllowed) {
      return {
        success: false,
        error: `Format file ${file.type || "tidak dikenali"} tidak didukung.`,
      }
    }
  }

  // 3. Sanitize file name
  const timestamp = Date.now()
  const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
  const fileName = `${timestamp}_${sanitizedOriginalName}`

  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        upsert: true,
        cacheControl: "3600",
      })

    if (error) {
      console.warn(`Supabase Storage upload to bucket '${bucketName}' failed:`, error)
      return {
        success: false,
        error: `Gagal mengupload ke storage (${error.message}). Pastikan bucket '${bucketName}' sudah dibuat di Supabase Storage.`,
      }
    }

    if (data?.path) {
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path)

      if (publicUrlData?.publicUrl) {
        return {
          success: true,
          url: publicUrlData.publicUrl,
        }
      }
    }

    return {
      success: false,
      error: "Gagal mendapatkan URL publik dari file yang diupload.",
    }
  } catch (err: any) {
    console.error("Exception during file upload:", err)
    return {
      success: false,
      error: err?.message || "Terjadi kesalahan tidak terduga saat mengupload file.",
    }
  }
}
