"use client"

import { BookOpen, Calendar, Layers, Brain, Search } from "lucide-react"

export type AdminViewType = "modules" | "pertemuan" | "sessions" | "journals" | "articles" | "participants" | "papers" | "downloads"

interface AdminTabsProps {
  activeView: AdminViewType
  setActiveView: (view: AdminViewType) => void
  modulesCount: number
  pertemuanCount: number
  sessionsCount: number
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function AdminTabs({
  activeView,
  setActiveView,
  modulesCount,
  pertemuanCount,
  sessionsCount,
  searchQuery,
  setSearchQuery,
}: AdminTabsProps) {
  return (
    <div className="bg-white rounded-3xl p-3 border border-purple-100 shadow-sm mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      <div className="flex overflow-x-auto pb-1 md:pb-0 flex-nowrap md:flex-wrap gap-2 custom-purple-scrollbar">
        <button
          onClick={() => setActiveView("modules")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeView === "modules" ? "bg-[#2a1845] text-white shadow-md" : "text-[#2a1845]/70 hover:bg-purple-50"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Level 1: Modul Utama</span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px]">{modulesCount}</span>
        </button>

        <button
          onClick={() => setActiveView("pertemuan")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeView === "pertemuan" ? "bg-[#2a1845] text-white shadow-md" : "text-[#2a1845]/70 hover:bg-purple-50"
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>Level 2: Pertemuan</span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px]">{pertemuanCount}</span>
        </button>

        <button
          onClick={() => setActiveView("sessions")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeView === "sessions" ? "bg-[#2a1845] text-white shadow-md" : "text-[#2a1845]/70 hover:bg-purple-50"
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Level 3: Sesi Konten</span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px]">{sessionsCount}</span>
        </button>

        <button
          onClick={() => setActiveView("journals")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeView === "journals" ? "bg-[#2a1845] text-white shadow-md" : "text-[#2a1845]/70 hover:bg-purple-50"
          }`}
        >
          <Brain className="h-4 w-4" />
          <span>Jurnal Refleksi</span>
        </button>
      </div>

      <div className="relative w-full md:w-60">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari..."
          className="w-full pl-9 pr-4 py-2 rounded-2xl border border-purple-100 bg-[#FAF8F5] text-xs outline-none focus:border-[#7c4fd4]"
        />
      </div>
    </div>
  )
}
