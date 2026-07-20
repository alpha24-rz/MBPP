"use client"

import { useState } from "react"
import { Brain, Sparkles, Compass, HeartHandshake, ShieldCheck, LineChart, ArrowRight, Clock, BookOpen, ChevronRight } from "lucide-react"

const modules = [
  {
    id: 1,
    number: "Module 01",
    icon: Sparkles,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    accent: "text-violet-600",
    border: "border-violet-100",
    badge: "Foundational",
    badgeColor: "bg-violet-100 text-violet-700",
    title: "Mengenal Diri di Era AI",
    subtitle: "AI Awareness & Self-Discovery",
    desc: "Membangun landasan kesadaran diri sebagai titik awal perjalanan. Peserta mengeksplorasi bagaimana kepribadian unik mereka — melalui kerangka Big Five — membentuk pola interaksi dengan AI.",
    topics: ["Big Five Personality", "AI Awareness", "Self-Reflection"],
    duration: "90 menit",
    sessions: "1 sesi",
  },
  {
    id: 2,
    number: "Module 02",
    icon: Brain,
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    accent: "text-sky-600",
    border: "border-sky-100",
    badge: "Core",
    badgeColor: "bg-sky-100 text-sky-700",
    title: "Mindfulness dalam Genggaman Digital",
    subtitle: "Digital Mindfulness Practice",
    desc: "Latihan mindfulness yang diadaptasi untuk konteks penggunaan teknologi digital. Peserta mempelajari teknik jeda sadar (mindful pause) untuk mengamati impuls saat berinteraksi dengan AI.",
    topics: ["Mindful Pause", "Attention Training", "Digital Detox"],
    duration: "90 menit",
    sessions: "1 sesi",
  },
  {
    id: 3,
    number: "Module 03",
    icon: HeartHandshake,
    color: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
    accent: "text-rose-600",
    border: "border-rose-100",
    badge: "Core",
    badgeColor: "bg-rose-100 text-rose-700",
    title: "Regulasi Emosi & AI Intimacy",
    subtitle: "Emotional Regulation",
    desc: "Memahami dan mengelola fenomena AI Intimacy — kedekatan emosional semu dengan chatbot. Peserta membangun strategi regulasi emosi yang sehat dalam ekosistem AI yang semakin personal.",
    topics: ["AI Intimacy", "Emotional Regulation", "Parasocial Awareness"],
    duration: "90 menit",
    sessions: "1 sesi",
  },
  {
    id: 4,
    number: "Module 04",
    icon: Compass,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    accent: "text-emerald-600",
    border: "border-emerald-100",
    badge: "Core",
    badgeColor: "bg-emerald-100 text-emerald-700",
    title: "Kedaulatan Berpikir",
    subtitle: "Cognitive Agency & Critical Thinking",
    desc: "Mengembalikan posisi peserta sebagai pemikir kritis yang otonom. Modul ini mengeksplorasi risiko ketergantungan kognitif dan membangun strategi untuk mempertahankan kemandirian berpikir.",
    topics: ["Cognitive Agency", "Critical Thinking", "AI Dependency"],
    duration: "90 menit",
    sessions: "1 sesi",
  },
  {
    id: 5,
    number: "Module 05",
    icon: ShieldCheck,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    accent: "text-amber-600",
    border: "border-amber-100",
    badge: "Advanced",
    badgeColor: "bg-amber-100 text-amber-700",
    title: "Literasi AI yang Bertanggung Jawab",
    subtitle: "Responsible AI Literacy",
    desc: "Membangun kecerdasan digital yang etis dan bertanggung jawab. Peserta memahami cara memanfaatkan AI sebagai alat kolaboratif tanpa mengorbankan nilai-nilai kemanusiaan dan kemandirian.",
    topics: ["AI Ethics", "Responsible Use", "Digital Citizenship"],
    duration: "90 menit",
    sessions: "1 sesi",
  },
  {
    id: 6,
    number: "Module 06",
    icon: LineChart,
    color: "from-indigo-500 to-violet-600",
    bg: "bg-indigo-50",
    accent: "text-indigo-600",
    border: "border-indigo-100",
    badge: "Capstone",
    badgeColor: "bg-indigo-100 text-indigo-700",
    title: "Integrasi & Rencana Ke Depan",
    subtitle: "Integration & Future Planning",
    desc: "Sesi penutup yang mengintegrasikan seluruh pembelajaran. Peserta menyusun rencana pribadi untuk mempertahankan keseimbangan digital jangka panjang berdasarkan profil kepribadian dan temuan refleksi mereka.",
    topics: ["Personal Action Plan", "Wellbeing Strategy", "Long-term Balance"],
    duration: "90 menit",
    sessions: "1 sesi",
  },
]

export function FeaturedSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="featured-modules" className="relative bg-white px-6 py-28 scroll-mt-20">

      {/* Subtle top border fade from previous section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FBF6ED] to-white" />

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="mb-3 font-script text-3xl text-primary">Learning Modules</p>
            <h2 className="font-serif text-3xl font-bold leading-tight text-[#2a1845] md:text-4xl lg:text-5xl max-w-xl">
              Featured Learning<br className="hidden sm:block" /> Modules
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-foreground/70 md:text-right">
            Explore the core modules of the<br className="hidden sm:block" />
            <span className="font-medium text-[#5e35b8]">Mindfulness-Based Psychoeducation Programme.</span>
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const Icon = mod.icon
            const isHovered = hovered === mod.id
            return (
              <div
                key={mod.id}
                onMouseEnter={() => setHovered(mod.id)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative flex flex-col rounded-3xl border ${mod.border} bg-white overflow-hidden cursor-pointer transition-all duration-300 ${isHovered ? "shadow-2xl -translate-y-1.5 shadow-black/10" : "shadow-sm hover:shadow-md"}`}
              >
                {/* Card header band */}
                <div className={`relative px-6 pt-7 pb-5 ${mod.bg} border-b ${mod.border}`}>
                  {/* Module number + badge row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold tracking-widest text-foreground/40 uppercase">
                      {mod.number}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-[11px] font-semibold ${mod.badgeColor}`}>
                      {mod.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${mod.color} shadow-lg mb-4 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#2a1845] leading-snug mb-1">{mod.title}</h3>
                  <p className={`text-xs font-medium italic ${mod.accent}`}>{mod.subtitle}</p>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 px-6 py-5 gap-4">
                  <p className="text-sm text-foreground/65 leading-relaxed">{mod.desc}</p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5">
                    {mod.topics.map((t) => (
                      <span key={t} className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-foreground/60">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer meta */}
                  <div className="mt-auto pt-4 border-t border-foreground/8 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11px] text-foreground/50">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {mod.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {mod.sessions}
                      </span>
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-semibold transition-all duration-200 ${mod.accent} ${isHovered ? "translate-x-1" : ""}`}>
                      Explore <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA bottom */}
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-foreground/60 max-w-md">
            Setiap modul dirancang untuk dapat diikuti secara mandiri maupun berurutan sebagai satu program intervensi lengkap.
          </p>
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7c4fd4] to-[#5e35b8] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition-all duration-200 hover:shadow-xl hover:brightness-110 hover:scale-105">
            View All Modules
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  )
}
