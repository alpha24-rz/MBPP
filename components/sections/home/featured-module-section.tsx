"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, Clock, BookOpen, CheckCircle, ChevronRight } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export function FeaturedModuleSection() {
  const [activeModule, setActiveModule] = useState<any>(null)
  const [topics, setTopics] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchModulesData() {
      try {
        // Fetch first module or primary module from Supabase database
        const { data: modData, error: modErr } = await supabase
          .from("modules")
          .select("*")
          .order("order_index", { ascending: true })

        if (!modErr && modData && modData.length > 0) {
          const firstMod = modData[0]
          setActiveModule({
            id: firstMod.id,
            number: firstMod.module_number || "Kurikulum MBPP",
            image: firstMod.image_url || "/images/module-01.png",
            badge: firstMod.badge || "Mindfulness MBPP",
            badgeColor: firstMod.badge_color || "bg-violet-100 text-violet-700 border border-violet-200/50",
            title: firstMod.title,
            subtitle: firstMod.subtitle,
            desc: firstMod.desc_text,
            duration: firstMod.duration || "4 Pertemuan",
            sessions: firstMod.sessions_count || "Sesi Tatap Muka",
          })
        } else {
          setActiveModule(null)
        }

        // Fetch sub-sessions interventions
        const { data: intData, error: intErr } = await supabase
          .from("interventions")
          .select("*")
          .order("order_index", { ascending: true })

        if (!intErr && intData && intData.length > 0) {
          const mapped = intData.map(item => ({
            title: item.title,
            desc: item.desc_text
          }))
          setTopics(mapped)
        } else {
          setTopics([])
        }
      } catch (e) {
        console.error("Gagal memuat data modul dari database:", e)
        setActiveModule(null)
        setTopics([])
      } finally {
        setLoading(false)
      }
    }
    fetchModulesData()
  }, [])

  const displayModule = activeModule

  return (
    <section id="featured-modules" className="relative bg-white px-6 py-28 scroll-mt-20">
      {/* Subtle top border fade from previous section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FBF6ED] to-white" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-script text-3xl text-primary">Intervention Module</p>
            <h2 className="font-serif text-3xl font-bold leading-tight text-[#2a1845] md:text-4xl lg:text-5xl">
              Featured Learning Module
            </h2>
          </div>
          <Link
            href="/modules"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#7c4fd4] hover:text-[#2a1845] transition-colors"
          >
            Lihat Semua Modul <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Showcase Grid */}
        {loading ? (
          <div className="text-center py-16 text-xs text-[#2a1845]/70 font-semibold animate-pulse">
            Menyiapkan modul pembelajaran unggulan MBPP...
          </div>
        ) : !displayModule ? (
          <div className="text-center py-16 bg-[#FAF8F5] rounded-3xl border border-purple-100 p-8 max-w-xl mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7c4fd4] flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#2a1845]">Modul Pembelajaran Sedang Disiapkan</h3>
            <p className="text-xs text-foreground/70 mt-2 max-w-md mx-auto leading-relaxed">
              Modul unggulan MBPP sedang disiapkan oleh tim peneliti. Silakan cek kembali dalam beberapa saat.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Visual Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 border-4 border-white ring-1 ring-violet-100 bg-purple-50">
                <Image
                  src={displayModule.image}
                  alt={displayModule.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className={`inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold backdrop-blur-md shadow-sm ${displayModule.badgeColor}`}>
                    <Sparkles className="mr-1 h-3.5 w-3.5" />
                    {displayModule.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Content Detail */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-[11px] font-bold tracking-widest text-[#7c4fd4] uppercase mb-2">
                {displayModule.number}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-[#2a1845] leading-tight mb-2">
                {displayModule.title}
              </h3>
              <p className="text-sm font-semibold italic text-[#7c4fd4]/80 mb-6">
                {displayModule.subtitle}
              </p>

              <p className="text-sm md:text-base text-[#2a1845]/80 leading-relaxed mb-8">
                {displayModule.desc}
              </p>

              {/* Key Topics List */}
              <div className="space-y-4 mb-8">
                <h4 className="text-xs font-bold text-[#2a1845] tracking-wider uppercase mb-3">
                  Sub-Sesi Intervensi Terintegrasi
                </h4>
                {topics.length === 0 ? (
                  <p className="text-xs text-muted-foreground">Belum ada sub-sesi terdaftar.</p>
                ) : (
                  topics.map((topic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-sm font-bold text-[#2a1845]">{topic.title}</h5>
                        <p className="text-xs text-[#2a1845]/70 leading-relaxed mt-0.5">{topic.desc}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer metadata */}
              <div className="flex items-center gap-6 pt-6 border-t border-[#e0d6f5] text-xs font-semibold text-[#7c4fd4]">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {displayModule.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  {`${topics.length} Sesi Intervensi`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export const FeaturedSection = FeaturedModuleSection
