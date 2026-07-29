"use client"

import { Sparkles, RefreshCw, Plus } from "lucide-react"

interface AdminHeaderProps {
  loading: boolean
  onRefresh: () => void
  onAddModule: () => void
}

export function AdminHeader({ loading, onRefresh, onAddModule }: AdminHeaderProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#2a1845] via-[#211238] to-[#140b24] pt-32 pb-16 px-6 border-b border-purple-900/40">
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold backdrop-blur-md mb-3 border border-white/10">
            <Sparkles className="h-3.5 w-3.5 text-[#f5c6d0]" />
            <span>Hierarki 3-Tingkat (Modul ➔ Pertemuan ➔ Sesi)</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">Admin Console</h1>
          <p className="text-sm text-white/70 mt-2 max-w-xl">
            Kelola Modul Utama, Pertemuan Tatap Muka, dan Sesi Konten dengan kendali penuh di setiap tingkatan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh Data
          </button>
          <button
            onClick={onAddModule}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7c4fd4] hover:bg-[#683cb8] text-white text-xs font-bold shadow-lg transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Buat Modul Utama
          </button>
        </div>
      </div>
    </section>
  )
}
