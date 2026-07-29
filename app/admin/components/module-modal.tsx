"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"

interface ModuleModalProps {
  isOpen: boolean
  onClose: () => void
  editingModule: any
  moduleForm: {
    module_number: string
    title: string
    subtitle: string
    desc_text: string
    badge: string
    badge_color: string
    image_url: string
    order_index: string
  }
  setModuleForm: React.Dispatch<React.SetStateAction<any>>
  onSave: (e: React.FormEvent) => void
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => void
}

export function ModuleModal({
  isOpen,
  onClose,
  editingModule,
  moduleForm,
  setModuleForm,
  onSave,
  handleImageUpload,
}: ModuleModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white rounded-3xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-[#2a1845] transition-colors cursor-pointer">
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-base font-serif font-bold text-[#2a1845] mb-4">
          {editingModule ? "Edit Modul Utama" : "Buat Modul Utama Baru"}
        </h3>
        <form onSubmit={onSave} className="space-y-3.5 text-xs">
          <div className="flex flex-col gap-1">
            <label className="font-bold text-[#2a1845]">Judul Modul Utama</label>
            <input
              type="text"
              required
              value={moduleForm.title}
              onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
              placeholder="Contoh: Modul 1 - Mindfulness MBPP"
              className="rounded-xl border border-purple-200 p-2.5 outline-none focus:border-[#7c4fd4]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-[#2a1845]">Sub-Judul / Program</label>
            <input
              type="text"
              value={moduleForm.subtitle}
              onChange={(e) => setModuleForm({ ...moduleForm, subtitle: e.target.value })}
              placeholder="Program Psikoedukasi Kesadaran Penuh"
              className="rounded-xl border border-purple-200 p-2.5 outline-none focus:border-[#7c4fd4]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-[#2a1845]">Deskripsi Modul</label>
            <textarea
              rows={3}
              value={moduleForm.desc_text}
              onChange={(e) => setModuleForm({ ...moduleForm, desc_text: e.target.value })}
              placeholder="Deskripsi ringkas aktivitas modul..."
              className="rounded-xl border border-purple-200 p-2.5 resize-none outline-none focus:border-[#7c4fd4]"
            />
          </div>

          {/* Upload Gambar Modul */}
          <div className="flex flex-col gap-1.5 p-3.5 rounded-2xl bg-[#FAF8F5] border border-purple-100">
            <label className="font-bold text-[#2a1845] flex items-center justify-between">
              <span>Upload Gambar Modul</span>
              <span className="text-[10px] text-muted-foreground font-normal">Format: PNG, JPG, WEBP</span>
            </label>
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, (url) => setModuleForm({ ...moduleForm, image_url: url }))}
              className="block w-full text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-[#7c4fd4] hover:file:bg-purple-200 cursor-pointer"
            />

            {moduleForm.image_url && (
              <div className="mt-2 relative w-full h-28 rounded-xl overflow-hidden border border-purple-200 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={moduleForm.image_url} alt="Pratinjau Gambar" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setModuleForm({ ...moduleForm, image_url: "" })}
                  className="absolute top-1.5 right-1.5 bg-black/60 text-white p-1 rounded-full text-[10px]"
                  title="Hapus Gambar"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            <div className="mt-1">
              <span className="text-[10px] font-semibold text-muted-foreground">Atau masukkan URL / Path Gambar:</span>
              <input
                type="text"
                value={moduleForm.image_url}
                onChange={(e) => setModuleForm({ ...moduleForm, image_url: e.target.value })}
                placeholder="/images/module-01.png atau URL Supabase"
                className="mt-1 w-full rounded-xl border border-purple-200 bg-white p-2 text-xs outline-none focus:border-[#7c4fd4]"
              />
            </div>
          </div>

          <button type="submit" className="w-full rounded-xl bg-[#7c4fd4] hover:bg-[#683cb8] py-3 font-bold text-white shadow-md transition-all cursor-pointer mt-2">
            Simpan Modul
          </button>
        </form>
      </motion.div>
    </div>
  )
}
