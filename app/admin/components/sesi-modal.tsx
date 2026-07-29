"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  X,
  Loader2,
  Music,
  Video,
  Sparkles,
  Headphones,
  Calendar,
  CheckCircle,
  CheckCircle2,
  Plus,
  Trash2,
  HelpCircle,
  User,
  ListOrdered,
  ImageIcon,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Heart,
} from "lucide-react"

import { GratitudeJournalCard } from "@/components/modules/gratitude-journal-card"

export interface ReflectionQuestionItem {
  title?: string
  question: string
}

export const DEFAULT_BLOCK_ORDER = [
  "text",
  "image",
  "audio",
  "video",
  "breathing",
  "habit_tracker",
  "gratitude_journal",
  "smart_goal",
  "self_checkin",
]

export const BLOCK_LABELS: Record<string, { name: string; icon: any }> = {
  text: { name: "Teks & Langkah-Langkah Instruksi", icon: ListOrdered },
  image: { name: "Gambar Contoh Gerakan / Panduan", icon: ImageIcon },
  audio: { name: "Audio Relaksasi / Suara Pemandu", icon: Headphones },
  video: { name: "Video Panduan Latihan", icon: Video },
  breathing: { name: "Widget Visualizer Napas", icon: Sparkles },
  habit_tracker: { name: "Widget Habit Tracker / Kalender", icon: Calendar },
  gratitude_journal: { name: "Widget Jurnal Syukur 31 Hari (Gratitude)", icon: Heart },
  smart_goal: { name: "Widget Form SMART Goal", icon: CheckCircle },
  self_checkin: { name: "Widget Self Check-In", icon: CheckCircle2 },
}

interface SesiModalProps {
  isOpen: boolean
  onClose: () => void
  editingSesi: any
  sesiForm: {
    pertemuan_id: string
    module_id: string
    title: string
    subtitle: string
    desc_text: string
    has_text_instruction: boolean
    instruction_steps: string[]
    image_url: string
    image_title: string
    content_order: string[]
    has_slogan_banner: boolean
    has_participant_name: boolean
    audio_url: string
    audio_title: string
    video_url: string
    slogan: string
    character_strength: string
    has_breathing_visualizer: boolean
    has_habit_tracker: boolean
    has_gratitude_journal: boolean
    has_smart_goal: boolean
    has_self_checkin: boolean
    reflection_title: string
    reflection_subtitle: string
    reflection_questions: (string | ReflectionQuestionItem)[]
    order_index: string
  }
  setSesiForm: React.Dispatch<React.SetStateAction<any>>
  pertemuan: any[]
  onSave: (e: React.FormEvent) => void
  handleMediaFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void,
    bucketName?: string
  ) => void
}

export function SesiModal({
  isOpen,
  onClose,
  editingSesi,
  sesiForm,
  setSesiForm,
  pertemuan,
  onSave,
  handleMediaFileUpload,
}: SesiModalProps) {
  const [uploadingKey, setUploadingKey] = useState<"image" | "audio" | "video" | null>(null)
  const [uploadError, setUploadError] = useState<{ [key: string]: string }>({})

  if (!isOpen) return null

  const handleMediaUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "image" | "audio" | "video",
    setter: (url: string) => void,
    bucketName: string
  ) => {
    setUploadError((prev) => ({ ...prev, [key]: "" }))
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingKey(key)
    try {
      await handleMediaFileUpload(e, setter, bucketName)
    } catch (err: any) {
      setUploadError((prev) => ({ ...prev, [key]: err?.message || "Gagal mengupload file media." }))
    } finally {
      setUploadingKey(null)
    }
  }

  // Ensure content_order contains all valid blocks including new widgets
  const rawOrder =
    sesiForm.content_order && sesiForm.content_order.length > 0
      ? sesiForm.content_order
      : DEFAULT_BLOCK_ORDER

  const currentOrder = Array.from(new Set([...rawOrder, ...DEFAULT_BLOCK_ORDER]))

  // Helper for moving block position in list
  const handleMoveBlock = (index: number, direction: "up" | "down") => {
    const updated = [...currentOrder]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= updated.length) return

    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp

    setSesiForm({
      ...sesiForm,
      content_order: updated,
    })
  }

  // Normalize questions to objects: { title, question }
  const normalizedQuestions: ReflectionQuestionItem[] = (sesiForm.reflection_questions || []).map((item) => {
    if (typeof item === "string") {
      return { title: "", question: item }
    }
    return { title: item.title || "", question: item.question || "" }
  })

  // Instruction Steps Handlers
  const handleAddStep = () => {
    const currentSteps = sesiForm.instruction_steps || []
    setSesiForm({
      ...sesiForm,
      instruction_steps: [...currentSteps, ""],
    })
  }

  const handleStepChange = (index: number, value: string) => {
    const updated = [...(sesiForm.instruction_steps || [])]
    updated[index] = value
    setSesiForm({
      ...sesiForm,
      instruction_steps: updated,
    })
  }

  const handleRemoveStep = (index: number) => {
    const updated = [...(sesiForm.instruction_steps || [])]
    updated.splice(index, 1)
    setSesiForm({
      ...sesiForm,
      instruction_steps: updated,
    })
  }

  // Reflection Questions Handlers
  const handleAddQuestion = () => {
    setSesiForm({
      ...sesiForm,
      reflection_questions: [...normalizedQuestions, { title: "", question: "" }],
    })
  }

  const handleQuestionFieldChange = (index: number, field: "title" | "question", value: string) => {
    const updated = [...normalizedQuestions]
    updated[index] = {
      ...updated[index],
      [field]: value,
    }
    setSesiForm({
      ...sesiForm,
      reflection_questions: updated,
    })
  }

  const handleRemoveQuestion = (index: number) => {
    const updated = [...normalizedQuestions]
    updated.splice(index, 1)
    setSesiForm({
      ...sesiForm,
      reflection_questions: updated,
    })
  }

  const defaultQuestionsPreview: ReflectionQuestionItem[] = [
    {
      title: "Perasaan & Emosi",
      question: "Bagaimana perasaanmu sebelum dan sesudah melakukan latihan ini?",
    },
    {
      title: "Kesadaran Tubuh",
      question: "Apa yang kamu sadari tentang tubuhmu hari ini yang sebelumnya jarang kamu perhatikan?",
    },
    {
      title: "Rencana Lanjutan",
      question: "Apa yang ingin kamu coba di latihan berikutnya?",
    },
  ]

  const activeQuestionsPreview: ReflectionQuestionItem[] =
    normalizedQuestions.length > 0 ? normalizedQuestions : defaultQuestionsPreview

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl bg-white rounded-3xl p-6 relative my-8 max-h-[90vh] overflow-y-auto custom-purple-scrollbar border border-purple-100 shadow-2xl space-y-4"
      >
        <div className="sticky top-0 bg-white pt-1 pb-3 border-b border-purple-100 flex items-center justify-between z-10">
          <div>
            <h3 className="text-base font-serif font-bold text-[#2a1845]">
              {editingSesi ? "Edit Sesi Konten" : "Tambah Sesi Konten Baru"}
            </h3>
            <p className="text-[11px] text-muted-foreground">Formulir editor & pratinjau langsung tampilan pengguna publik.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-muted-foreground hover:text-[#2a1845] hover:bg-purple-50 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Input Sesi */}
          <form onSubmit={onSave} className="lg:col-span-6 space-y-4 text-xs">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#2a1845]">Pilih Pertemuan Pemilik</label>
              <select
                value={sesiForm.pertemuan_id}
                onChange={(e) => setSesiForm({ ...sesiForm, pertemuan_id: e.target.value })}
                className="rounded-xl border border-purple-200 p-2.5 font-bold"
              >
                {pertemuan.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.pertemuan_number} — {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#2a1845]">Judul / Nama Sesi</label>
              <input
                type="text"
                required
                value={sesiForm.title}
                onChange={(e) => setSesiForm({ ...sesiForm, title: e.target.value })}
                placeholder="Contoh: Sub-Sesi 1.1 — Latihan Kesadaran Napas dan Tubuh"
                className="rounded-xl border border-purple-200 p-2.5 outline-none focus:border-[#7c4fd4]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-[#2a1845]">Sub-Judul / Keterangan Sesi</label>
              <input
                type="text"
                value={sesiForm.subtitle}
                onChange={(e) => setSesiForm({ ...sesiForm, subtitle: e.target.value })}
                placeholder="Contoh: Pernapasan Sadar (5-7 Menit) & Body Scan (10 Menit)"
                className="rounded-xl border border-purple-200 p-2.5 outline-none focus:border-[#7c4fd4]"
              />
            </div>

            {/* Fitur Urutan Blok Konten / Rearrange Layout */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-purple-100 space-y-2.5">
              <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                <label className="font-bold text-[#2a1845] flex items-center gap-1.5">
                  <GripVertical className="h-4 w-4 text-[#7c4fd4]" />
                  <span>Pengaturan Urutan Tampilan Blok Sesi (Reorder)</span>
                </label>
                <span className="text-[10px] text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md font-semibold">
                  Fleksibel
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Klik tombol panah **Ke Atas (▲)** atau **Ke Bawah (▼)** untuk mengubah posisi elemen (misal: memindahkan Jurnal Syukur 31 Hari ke bagian atas).
              </p>
              <div className="space-y-1.5 max-h-48 overflow-y-auto custom-purple-scrollbar pr-1">
                {currentOrder.map((blockKey, idx) => {
                  const info = BLOCK_LABELS[blockKey] || { name: blockKey, icon: Sparkles }
                  const Icon = info.icon
                  return (
                    <div
                      key={blockKey}
                      className="flex items-center justify-between bg-white p-2 rounded-xl border border-purple-100 shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-100 text-[#7c4fd4] text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <Icon className="h-3.5 w-3.5 text-[#7c4fd4]" />
                        <span className="text-xs font-semibold text-[#2a1845]">{info.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveBlock(idx, "up")}
                          className="p-1 text-[#7c4fd4] hover:bg-purple-50 rounded-md disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Pindahkan Ke Atas"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === currentOrder.length - 1}
                          onClick={() => handleMoveBlock(idx, "down")}
                          className="p-1 text-[#7c4fd4] hover:bg-purple-50 rounded-md disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Pindahkan Ke Bawah"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Fitur Upload Gambar Panduan / Gerakan Latihan */}
            <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-[#FAF8F5] border border-purple-100 space-y-2">
              <label className="font-bold text-[#2a1845] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="h-4 w-4 text-[#7c4fd4]" /> Gambar Contoh Gerakan / Ilustrasi Latihan (Opsional)
                </span>
                <span className="text-[10px] text-muted-foreground font-normal">PNG, JPG, WEBM, SVG</span>
              </label>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-[#2a1845]">Judul / Keterangan Gambar (Opsional)</label>
                <input
                  type="text"
                  value={sesiForm.image_title || ""}
                  onChange={(e) => setSesiForm({ ...sesiForm, image_title: e.target.value })}
                  placeholder="Contoh: Contoh Postur Duduk Tegak dan Rileks (Mindful Posture)"
                  className="rounded-xl border border-purple-200 bg-white p-2 text-xs outline-none focus:border-[#7c4fd4]"
                />
              </div>

              <input
                type="file"
                accept="image/*"
                disabled={uploadingKey !== null}
                onChange={(e) => handleMediaUpload(e, "image", (url) => setSesiForm((prev: any) => ({ ...prev, image_url: url })), "session-images")}
                className="block w-full text-xs text-muted-foreground file:mr-3 file:py-1 file:px-2.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-[#7c4fd4] hover:file:bg-purple-200 cursor-pointer disabled:opacity-50"
              />

              {uploadingKey === "image" && (
                <div className="flex items-center gap-2 text-xs font-semibold text-[#7c4fd4] bg-purple-50 p-2 rounded-xl border border-purple-100">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Mengupload gambar ke Supabase Storage...</span>
                </div>
              )}

              {uploadError.image && (
                <div className="text-[11px] font-semibold text-red-600 bg-red-50 p-2 rounded-xl border border-red-100">
                  {uploadError.image}
                </div>
              )}

              {sesiForm.image_url && (
                <div className="mt-1.5 relative rounded-2xl overflow-hidden border border-purple-200 bg-white p-2 flex items-center gap-3">
                  <img src={sesiForm.image_url} alt="Pratinjau Gambar Sesi" className="w-16 h-16 object-cover rounded-xl border border-purple-100" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#2a1845] truncate">{sesiForm.image_title || "Gambar Contoh Gerakan"}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{sesiForm.image_url}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSesiForm({ ...sesiForm, image_url: "", image_title: "" })}
                    className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg cursor-pointer shrink-0"
                    title="Hapus Gambar"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="mt-1">
                <span className="text-[10px] font-semibold text-muted-foreground">Atau masukkan URL / Path Gambar Manual:</span>
                <input
                  type="text"
                  value={sesiForm.image_url}
                  onChange={(e) => setSesiForm({ ...sesiForm, image_url: e.target.value })}
                  placeholder="https://... atau /images/movement-01.png"
                  className="mt-1 w-full rounded-xl border border-purple-200 bg-white p-2 text-xs outline-none focus:border-[#7c4fd4]"
                />
              </div>
            </div>

            {/* Kontrol Slogan & Penguatan Karakter */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-purple-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#2a1845] flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sesiForm.has_slogan_banner}
                    onChange={(e) => setSesiForm({ ...sesiForm, has_slogan_banner: e.target.checked })}
                    className="rounded text-[#7c4fd4] focus:ring-[#7c4fd4] h-4 w-4"
                  />
                  <span>Tampilkan Banner Slogan & Penguatan Karakter</span>
                </label>
                <span className="text-[10px] text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md font-semibold">
                  {sesiForm.has_slogan_banner ? "Aktif" : "Sembunyikan"}
                </span>
              </div>

              {sesiForm.has_slogan_banner && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-[#2a1845]">Slogan Karakter</label>
                    <input
                      type="text"
                      value={sesiForm.slogan}
                      onChange={(e) => setSesiForm({ ...sesiForm, slogan: e.target.value })}
                      placeholder="Contoh: TETAP SEMANGAT!"
                      className="rounded-xl border border-purple-200 bg-white p-2.5 outline-none focus:border-[#7c4fd4]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-[#2a1845]">Penguatan Karakter</label>
                    <input
                      type="text"
                      value={sesiForm.character_strength}
                      onChange={(e) => setSesiForm({ ...sesiForm, character_strength: e.target.value })}
                      placeholder="Contoh: Ketekunan (Perseverance)"
                      className="rounded-xl border border-purple-200 bg-white p-2.5 outline-none focus:border-[#7c4fd4]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Toggle Opsional: Isi Teks / Instruksi Materi + Fitur List Langkah-Langkah */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-purple-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#2a1845] flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sesiForm.has_text_instruction}
                    onChange={(e) => setSesiForm({ ...sesiForm, has_text_instruction: e.target.checked })}
                    className="rounded text-[#7c4fd4] focus:ring-[#7c4fd4] h-4 w-4"
                  />
                  <span>Tampilkan Isi Teks / Instruksi Materi</span>
                </label>
                <span className="text-[10px] text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md font-semibold">
                  {sesiForm.has_text_instruction ? "Aktif" : "Nonaktif (Disembunyikan)"}
                </span>
              </div>

              {sesiForm.has_text_instruction && (
                <div className="space-y-3 pt-1">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-[#2a1845]">Paragraf Deskripsi / Instruksi Teks</label>
                    <textarea
                      rows={5}
                      value={sesiForm.desc_text}
                      onChange={(e) => setSesiForm({ ...sesiForm, desc_text: e.target.value })}
                      placeholder="Instruksi latihan atau rangkuman materi sesi (opsional)... Tekan Enter untuk berpindah baris/paragraf baru."
                      className="rounded-xl border border-purple-200 bg-white p-2.5 outline-none focus:border-[#7c4fd4] whitespace-pre-wrap"
                    />
                  </div>

                  {/* Sub-Section Editor Langkah-Langkah / List (Opsional) */}
                  <div className="bg-white p-3 rounded-2xl border border-purple-100 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-[#2a1845] flex items-center gap-1 text-[11px]">
                        <ListOrdered className="h-3.5 w-3.5 text-[#7c4fd4]" />
                        <span>Daftar Langkah-Langkah / Poin Instruksi (Opsional)</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleAddStep}
                        className="px-2 py-0.5 rounded-lg bg-purple-100 text-[#7c4fd4] text-[10px] font-bold flex items-center gap-1 hover:bg-purple-200 transition-colors cursor-pointer"
                      >
                        <Plus className="h-3 w-3" /> Tambah Langkah
                      </button>
                    </div>

                    {(!sesiForm.instruction_steps || sesiForm.instruction_steps.length === 0) ? (
                      <p className="text-[10px] text-muted-foreground italic">
                        Belum ada daftar langkah. Klik &quot;+ Tambah Langkah&quot; jika sesi ini membutuhkan poin petunjuk berurutan.
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-40 overflow-y-auto custom-purple-scrollbar pr-1">
                        {sesiForm.instruction_steps.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-purple-100 text-[#7c4fd4] font-bold text-[10px] flex items-center justify-center shrink-0">
                              {sIdx + 1}
                            </span>
                            <input
                              type="text"
                              value={step}
                              onChange={(e) => handleStepChange(sIdx, e.target.value)}
                              placeholder={`Deskripsi Langkah #${sIdx + 1}`}
                              className="flex-1 rounded-lg border border-purple-200 p-2 text-xs outline-none focus:border-[#7c4fd4]"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveStep(sIdx)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                              title="Hapus Langkah"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Editor Pertanyaan Refleksi Dinamis dengan Title & Subtitle + Toggle Input Nama */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-purple-100 space-y-3">
              <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                <label className="font-bold text-[#2a1845] flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-[#7c4fd4]" />
                  <span>Pengaturan Refleksi Mandiri & Pertanyaan</span>
                </label>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="px-2.5 py-1 rounded-xl bg-[#7c4fd4] text-white text-[11px] font-bold flex items-center gap-1 hover:bg-[#683cb8] transition-colors cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> Tambah Pertanyaan
                </button>
              </div>

              {/* Toggle Input Nama Peserta */}
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-purple-100">
                <label className="font-bold text-[#2a1845] flex items-center gap-1.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={sesiForm.has_participant_name}
                    onChange={(e) => setSesiForm({ ...sesiForm, has_participant_name: e.target.checked })}
                    className="rounded text-[#7c4fd4] focus:ring-[#7c4fd4] h-4 w-4"
                  />
                  <span>Minta Field Input Nama / Identitas Peserta</span>
                </label>
                <span className="text-[10px] text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md font-semibold">
                  {sesiForm.has_participant_name ? "Wajib Diisi" : "Otomatis (Sembunyikan)"}
                </span>
              </div>

              {/* Title & Subtitle Refleksi Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3 rounded-2xl border border-purple-100">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-[#2a1845]">Judul Utama Refleksi</label>
                  <input
                    type="text"
                    value={sesiForm.reflection_title}
                    onChange={(e) => setSesiForm({ ...sesiForm, reflection_title: e.target.value })}
                    placeholder="Contoh: Refleksi Aktivitas 1"
                    className="rounded-xl border border-purple-200 p-2 text-xs outline-none focus:border-[#7c4fd4]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-[#2a1845]">Sub-Judul / Petunjuk Refleksi</label>
                  <input
                    type="text"
                    value={sesiForm.reflection_subtitle}
                    onChange={(e) => setSesiForm({ ...sesiForm, reflection_subtitle: e.target.value })}
                    placeholder="Contoh: Petunjuk pengisian refleksi mandiri..."
                    className="rounded-xl border border-purple-200 p-2 text-xs outline-none focus:border-[#7c4fd4]"
                  />
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground">
                Setiap pertanyaan dapat memiliki Judul/Label Singkat dan Teks Pertanyaan. Peserta akan mendapatkan ruang input teks (textarea) tersendiri di bawah tiap pertanyaan.
              </p>

              {normalizedQuestions.length === 0 ? (
                <div className="p-3 rounded-xl bg-white border border-dashed border-purple-200 text-center text-muted-foreground italic text-[11px]">
                  Belum ada pertanyaan refleksi khusus. Klik &quot;+ Tambah Pertanyaan&quot; di atas untuk menambahkan pertanyaan refleksi dinamis.
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto custom-purple-scrollbar pr-1">
                  {normalizedQuestions.map((qItem, qIdx) => (
                    <div key={qIdx} className="bg-white p-3 rounded-2xl border border-purple-100 space-y-2 relative shadow-xs">
                      <div className="flex items-center justify-between border-b border-purple-50 pb-1.5">
                        <span className="text-[10px] font-bold text-[#7c4fd4] uppercase tracking-wider">
                          Pertanyaan Refleksi #{qIdx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(qIdx)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Hapus Pertanyaan"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-[#2a1845]">Judul / Label Pertanyaan (Opsional)</label>
                        <input
                          type="text"
                          value={qItem.title || ""}
                          onChange={(e) => handleQuestionFieldChange(qIdx, "title", e.target.value)}
                          placeholder="Contoh: Refleksi Perasaan / Pertanyaan 1"
                          className="rounded-xl border border-purple-100 p-2 text-xs outline-none focus:border-[#7c4fd4]"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold text-[#2a1845]">Teks Utama Pertanyaan</label>
                        <input
                          type="text"
                          value={qItem.question || ""}
                          onChange={(e) => handleQuestionFieldChange(qIdx, "question", e.target.value)}
                          placeholder="Contoh: Bagaimana perasaanmu sebelum dan sesudah melakukan latihan ini?"
                          className="rounded-xl border border-purple-100 p-2 text-xs outline-none focus:border-[#7c4fd4]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Toggles Blok Widget Interaktif */}
            <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-purple-100 space-y-2">
              <label className="font-bold text-[#2a1845] block">Blok Interaktif & Widget Spesial</label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={sesiForm.has_breathing_visualizer}
                    onChange={(e) => setSesiForm({ ...sesiForm, has_breathing_visualizer: e.target.checked })}
                    className="rounded text-[#7c4fd4] focus:ring-[#7c4fd4]"
                  />
                  <span>Visualizer Napas</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={sesiForm.has_habit_tracker}
                    onChange={(e) => setSesiForm({ ...sesiForm, has_habit_tracker: e.target.checked })}
                    className="rounded text-[#7c4fd4] focus:ring-[#7c4fd4]"
                  />
                  <span>Habit Tracker</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={sesiForm.has_gratitude_journal}
                    onChange={(e) => setSesiForm({ ...sesiForm, has_gratitude_journal: e.target.checked })}
                    className="rounded text-[#7c4fd4] focus:ring-[#7c4fd4]"
                  />
                  <span>Jurnal Syukur 31 Hari</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={sesiForm.has_smart_goal}
                    onChange={(e) => setSesiForm({ ...sesiForm, has_smart_goal: e.target.checked })}
                    className="rounded text-[#7c4fd4] focus:ring-[#7c4fd4]"
                  />
                  <span>Form SMART Goal</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={sesiForm.has_self_checkin}
                    onChange={(e) => setSesiForm({ ...sesiForm, has_self_checkin: e.target.checked })}
                    className="rounded text-[#7c4fd4] focus:ring-[#7c4fd4]"
                  />
                  <span>Self Check-In (1-5)</span>
                </label>
              </div>
            </div>

            {/* Audio Upload Local */}
            <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-[#FAF8F5] border border-purple-100">
              <label className="font-bold text-[#2a1845] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Music className="h-3.5 w-3.5 text-[#7c4fd4]" /> Audio Relaksasi / Panduan Suara
                </span>
                <span className="text-[10px] text-muted-foreground font-normal">Maks: 25MB (MP3, WAV, OGG)</span>
              </label>

              <input
                type="file"
                accept="audio/*"
                disabled={uploadingKey !== null}
                onChange={(e) => handleMediaUpload(e, "audio", (url) => setSesiForm((prev: any) => ({ ...prev, audio_url: url })), "session-audio")}
                className="block w-full text-xs text-muted-foreground file:mr-3 file:py-1 file:px-2.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-[#7c4fd4] hover:file:bg-purple-200 cursor-pointer disabled:opacity-50"
              />

              {uploadingKey === "audio" && (
                <div className="flex items-center gap-2 text-xs font-semibold text-[#7c4fd4] bg-purple-50 p-2 rounded-xl border border-purple-100">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Mengupload audio ke Supabase Storage...</span>
                </div>
              )}

              {uploadError.audio && (
                <div className="text-[11px] font-semibold text-red-600 bg-red-50 p-2 rounded-xl border border-red-100">
                  {uploadError.audio}
                </div>
              )}

              {sesiForm.audio_url && !uploadingKey && (
                <div className="mt-1.5 p-2 rounded-xl bg-purple-900 text-white flex items-center gap-2">
                  <audio controls controlsList="nodownload" src={sesiForm.audio_url} className="w-full h-7 rounded-md">
                    Browser Anda tidak mendukung pemutar audio.
                  </audio>
                  <button
                    type="button"
                    onClick={() => setSesiForm({ ...sesiForm, audio_url: "" })}
                    className="text-white/80 hover:text-white p-1 cursor-pointer"
                    title="Hapus Audio"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              <div className="mt-1">
                <span className="text-[10px] font-semibold text-muted-foreground">Atau masukkan URL / Path Audio Manual:</span>
                <input
                  type="text"
                  value={sesiForm.audio_url}
                  onChange={(e) => setSesiForm({ ...sesiForm, audio_url: e.target.value })}
                  placeholder="https://... atau /audio/relax.mp3"
                  className="mt-1 w-full rounded-xl border border-purple-200 bg-white p-2 text-xs outline-none focus:border-[#7c4fd4]"
                />
              </div>
            </div>

            {/* Video Upload Local */}
            <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-[#FAF8F5] border border-purple-100">
              <label className="font-bold text-[#2a1845] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Video className="h-3.5 w-3.5 text-sky-600" /> Video Guide / Panduan
                </span>
                <span className="text-[10px] text-muted-foreground font-normal">Maks: 50MB (MP4, WEBM)</span>
              </label>

              <input
                type="file"
                accept="video/*"
                disabled={uploadingKey !== null}
                onChange={(e) => handleMediaUpload(e, "video", (url) => setSesiForm((prev: any) => ({ ...prev, video_url: url })), "session-video")}
                className="block w-full text-xs text-muted-foreground file:mr-3 file:py-1 file:px-2.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-sky-100 file:text-sky-800 hover:file:bg-sky-200 cursor-pointer disabled:opacity-50"
              />

              {uploadingKey === "video" && (
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 bg-sky-50 p-2 rounded-xl border border-sky-100">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Mengupload video ke Supabase Storage...</span>
                </div>
              )}

              {uploadError.video && (
                <div className="text-[11px] font-semibold text-red-600 bg-red-50 p-2 rounded-xl border border-red-100">
                  {uploadError.video}
                </div>
              )}

              {sesiForm.video_url && (
                <div className="mt-1.5 relative rounded-xl overflow-hidden border border-purple-200 bg-black">
                  <video controls src={sesiForm.video_url} className="w-full h-32 object-cover">
                    Browser Anda tidak mendukung pemutar video.
                  </video>
                  <button
                    type="button"
                    onClick={() => setSesiForm({ ...sesiForm, video_url: "" })}
                    className="absolute top-1.5 right-1.5 bg-black/70 text-white p-1 rounded-full text-[10px] cursor-pointer"
                    title="Hapus Video"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              <div className="mt-1">
                <span className="text-[10px] font-semibold text-muted-foreground">Atau masukkan URL / Path Video Manual:</span>
                <input
                  type="text"
                  value={sesiForm.video_url}
                  onChange={(e) => setSesiForm({ ...sesiForm, video_url: e.target.value })}
                  placeholder="https://... atau /video/guide.mp4"
                  className="mt-1 w-full rounded-xl border border-purple-200 bg-white p-2 text-xs outline-none focus:border-[#7c4fd4]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={uploadingKey !== null}
              className="w-full rounded-xl bg-[#7c4fd4] hover:bg-[#683cb8] py-3 font-bold text-white shadow-md transition-all cursor-pointer mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {uploadingKey !== null ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Mengupload File Media...</span>
                </>
              ) : (
                "Simpan Sesi Konten"
              )}
            </button>
          </form>

          {/* Panel Pratinjau Langsung / Live Preview Dinamis Sesuai Urutan (content_order) */}
          <div className="lg:col-span-6 bg-[#FAF8F5] p-5 rounded-3xl border border-purple-200 shadow-inner space-y-4 sticky top-12 max-h-[80vh] overflow-y-auto custom-purple-scrollbar">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <span className="text-[10px] font-bold text-[#7c4fd4] bg-purple-100 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Live Preview Tampilan Web
              </span>
              <span className="text-[10px] text-muted-foreground italic font-semibold">Tampilan Peserta</span>
            </div>

            {/* Header Card Preview */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#2a1845] via-[#1d1033] to-indigo-900 text-white shadow-md">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#f5c6d0]">
                {sesiForm.subtitle || "Sub-Judul / Keterangan Sesi"}
              </span>
              <h4 className="text-sm font-serif font-bold text-white mt-1 leading-snug">
                {sesiForm.title || "Judul Sesi Pembelajaran"}
              </h4>
            </div>

            {/* RENDERING BLOK SESUAI URUTAN REORDER (content_order) */}
            <div className="space-y-4">
              {currentOrder.map((blockKey) => {
                switch (blockKey) {
                  case "text":
                    return sesiForm.has_text_instruction ? (
                      <div key={blockKey} className="p-4 rounded-2xl bg-white border border-purple-100 text-xs text-[#2a1845]/90 leading-relaxed shadow-xs space-y-3">
                        {sesiForm.desc_text && (
                          <div className="whitespace-pre-line leading-relaxed text-[#2a1845]/90">
                            {sesiForm.desc_text}
                          </div>
                        )}
                        {sesiForm.instruction_steps && sesiForm.instruction_steps.length > 0 && (
                          <div className="pt-2 border-t border-purple-50 space-y-2">
                            <span className="text-[10px] font-bold text-[#7c4fd4] uppercase tracking-wider block">
                              Langkah-Langkah Latihan:
                            </span>
                            <div className="space-y-2">
                              {sesiForm.instruction_steps.map((st, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 bg-[#FAF8F5] p-2.5 rounded-xl border border-purple-100">
                                  <span className="w-5 h-5 rounded-full bg-[#7c4fd4] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <span className="text-xs text-[#2a1845] font-medium leading-snug">{st || `Langkah ${idx + 1}`}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : null

                  case "image":
                    return sesiForm.image_url ? (
                      <div key={blockKey} className="p-4 rounded-2xl bg-white border border-purple-100 space-y-2 shadow-xs">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#7c4fd4]">
                          <ImageIcon className="h-4 w-4" />
                          <span>{sesiForm.image_title || "Gambar Gerakan Latihan"}</span>
                        </div>
                        <img src={sesiForm.image_url} alt="Gambar Gerakan" className="w-full max-h-48 object-cover rounded-xl border border-purple-100" />
                      </div>
                    ) : null

                  case "audio":
                    return sesiForm.audio_url ? (
                      <div key={blockKey} className="p-3.5 rounded-2xl bg-purple-900 text-white space-y-1.5 shadow-md">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#f5c6d0]">
                          <Headphones className="h-3.5 w-3.5" />
                          <span>Audio Panduan Relaksasi Suara VO</span>
                        </div>
                        <audio controls src={sesiForm.audio_url} className="w-full h-7 rounded-md">
                          Browser tidak mendukung audio.
                        </audio>
                      </div>
                    ) : null

                  case "video":
                    return sesiForm.video_url ? (
                      <div key={blockKey} className="p-3 rounded-2xl bg-black text-white space-y-1.5 shadow-md">
                        <span className="text-[10px] font-bold text-sky-400 block px-1">Pratinjau Video Panduan</span>
                        <video controls src={sesiForm.video_url} className="w-full h-32 object-cover rounded-xl" />
                      </div>
                    ) : null

                  case "breathing":
                    return sesiForm.has_breathing_visualizer ? (
                      <div key={blockKey} className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-semibold flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-emerald-600" /> Visualizer Napas Interaktif</span>
                        <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded-md">Aktif</span>
                      </div>
                    ) : null

                  case "habit_tracker":
                    return sesiForm.has_habit_tracker ? (
                      <div key={blockKey} className="p-3 bg-purple-50 border border-purple-200 rounded-2xl text-xs text-[#7c4fd4] font-semibold flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-[#7c4fd4]" /> Widget Habit Tracker & Kalender</span>
                        <span className="text-[10px] bg-purple-200 px-2 py-0.5 rounded-md">Aktif</span>
                      </div>
                    ) : null

                  case "gratitude_journal":
                    return (
                      sesiForm.has_gratitude_journal ||
                      sesiForm.title?.toLowerCase().includes("jurnal syukur") ||
                      sesiForm.title?.toLowerCase().includes("gratitude") ||
                      sesiForm.subtitle?.toLowerCase().includes("jurnal syukur")
                    ) ? (
                      <div key={blockKey} className="my-2">
                        <GratitudeJournalCard />
                      </div>
                    ) : null

                  case "smart_goal":
                    return sesiForm.has_smart_goal ? (
                      <div key={blockKey} className="p-3 bg-sky-50 border border-sky-200 rounded-2xl text-xs text-sky-800 font-semibold flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-sky-600" /> Widget Form SMART Goal</span>
                        <span className="text-[10px] bg-sky-200 px-2 py-0.5 rounded-md">Aktif</span>
                      </div>
                    ) : null

                  case "self_checkin":
                    return sesiForm.has_self_checkin ? (
                      <div key={blockKey} className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 font-semibold flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-amber-600" /> Widget Self Check-In (1-5)</span>
                        <span className="text-[10px] bg-amber-200 px-2 py-0.5 rounded-md">Aktif</span>
                      </div>
                    ) : null

                  default:
                    return null
                }
              })}
            </div>

            {/* BLOK PREVIEW PERTANYAAN REFLEKSI AKTIVITAS */}
            <div className="pt-3 border-t border-purple-200/60 space-y-3">
              <div className="text-center space-y-1">
                <h4 className="font-serif text-lg font-bold text-[#2a1845]">
                  {sesiForm.reflection_title || "Refleksi Aktivitas 1"}
                </h4>
                {sesiForm.reflection_subtitle && (
                  <p className="text-xs text-muted-foreground italic font-light">
                    {sesiForm.reflection_subtitle}
                  </p>
                )}
                <div className="w-12 h-1 bg-[#7c4fd4] rounded-full mx-auto mt-1" />
              </div>

              {/* Slogan Banner - HANYA jika has_slogan_banner diaktifkan */}
              {sesiForm.has_slogan_banner && (sesiForm.slogan || sesiForm.character_strength) && (
                <div className="p-4 rounded-2xl bg-purple-200/70 border border-purple-300 text-center space-y-1 shadow-xs">
                  {sesiForm.slogan && (
                    <h5 className="font-serif font-bold text-[#2a1845] text-xs">
                      &quot;{sesiForm.slogan.trim().replace(/^["'“«]+|["'”»]+$/g, "")}&quot;
                    </h5>
                  )}
                  {sesiForm.character_strength && (
                    <p className="text-[11px] text-[#2a1845]/80 italic">
                      {sesiForm.character_strength}
                    </p>
                  )}
                </div>
              )}

              {/* Field Input Nama Peserta Preview (Hanya jika has_participant_name diaktifkan) */}
              {sesiForm.has_participant_name && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#2a1845]">Nama / Identitas Peserta</label>
                  <input
                    disabled
                    type="text"
                    placeholder="Masukkan nama Anda..."
                    className="w-full p-2.5 rounded-xl border border-purple-200 bg-white text-xs text-muted-foreground outline-none cursor-not-allowed"
                  />
                </div>
              )}

              {/* Daftar Pertanyaan dengan Title & Subtitle + Kotak Textarea */}
              <div className="space-y-4 pt-2">
                {activeQuestionsPreview.map((qItem, idx) => (
                  <div key={idx} className="space-y-1.5">
                    {qItem.title && (
                      <span className="text-[10px] font-bold text-[#7c4fd4] uppercase tracking-wider block">
                        {qItem.title}
                      </span>
                    )}
                    <label className="block text-xs font-bold text-[#2a1845] leading-snug">
                      {qItem.question || `Pertanyaan Refleksi #${idx + 1}`}
                    </label>
                    <textarea
                      disabled
                      rows={3}
                      placeholder="Peserta akan mengetik jawaban refleksi mereka di sini..."
                      className="w-full p-3 rounded-2xl border border-purple-200 bg-white text-xs text-muted-foreground resize-none shadow-xs outline-none cursor-not-allowed"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
