"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { FileText, Download, BookOpen, ExternalLink, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const resources = {
  articles: [
    {
      title: "Mengenal AI Intimacy pada Gen Z: Dampak & Solusi",
      desc: "Menelaah fenomena keterikatan emosional semu remaja terhadap asisten kecerdasan buatan dan bagaimana mengatasinya.",
      date: "15 Juli 2026",
      readTime: "6 Menit",
      category: "Artikel Edukasi",
    },
    {
      title: "Pentingnya Mindfulness di Era Generative AI",
      desc: "Melatih jeda sadar (mindful pause) sebagai jangkar kognitif saat menggunakan alat generative AI harian.",
      date: "08 Juni 2026",
      readTime: "8 Menit",
      category: "Mindfulness",
    },
    {
      title: "Kedaulatan Berpikir: Mengapa AI Bukan Pengganti Otak Anda",
      desc: "Cara produktif memanfaatkan output AI sebagai rekan kolaborasi tanpa mendelagasikan kemandirian logika kritis.",
      date: "24 Mei 2026",
      readTime: "5 Menit",
      category: "Literasi Digital",
    },
  ],
  papers: [
    {
      title: "Formulating MBPP: An Interdisciplinary Intervention for Cognitive Agency",
      journal: "Journal of Cyberpsychology & Digital Wellness",
      authors: "Arif, M. R. H., Riswandi, Kresna, A. F. R., Alwadi, R.",
      year: "2026",
      doi: "10.1016/j.chb.2026.108422",
    },
    {
      title: "Big Five Personality Dimensions and AI Intimacy Among Gen Z Students",
      journal: "Frontiers in Psychology (Clinical Section)",
      authors: "Riswandi, Arif, M. R. H., Alwadi, R.",
      year: "2025",
      doi: "10.3389/fpsyg.2025.992812",
    },
  ],
  downloads: [
    {
      name: "MBPP Daily Reflection Workbook.pdf",
      size: "4.2 MB",
      type: "Workbook Jurnal Terbimbing",
      downloads: "1,240 Kali",
    },
    {
      name: "Big Five Personality Digital Assessment Sheet.pdf",
      size: "1.8 MB",
      type: "Panduan Penilaian Mandiri",
      downloads: "850 Kali",
    },
    {
      name: "Mindful AI Checklist & Guidelines.pdf",
      size: "950 KB",
      type: "Lembar Panduan Praktis",
      downloads: "2,110 Kali",
    },
  ],
}

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 12,
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<"articles" | "papers" | "downloads">("articles")
  const [articles, setArticles] = useState<any[]>([])
  const [papers, setPapers] = useState<any[]>([])
  const [downloads, setDownloads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAllResources() {
      setLoading(true)
      try {
        // Fetch Articles
        const { data: artData } = await supabase
          .from("articles")
          .select("*")
          .order("created_at", { ascending: false })
        
        if (artData && artData.length > 0) {
          setArticles(artData.map(item => ({
            title: item.title,
            desc: item.desc_text,
            date: new Date(item.created_at || Date.now()).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric"
            }),
            readTime: item.read_time,
            category: item.category
          })))
        } else {
          setArticles(resources.articles)
        }

        // Fetch Papers
        const { data: paperData } = await supabase
          .from("research_papers")
          .select("*")
          .order("created_at", { ascending: false })
        
        if (paperData && paperData.length > 0) {
          setPapers(paperData)
        } else {
          setPapers(resources.papers)
        }

        // Fetch Downloads
        const { data: dlData } = await supabase
          .from("downloads")
          .select("*")
          .order("created_at", { ascending: false })
        
        if (dlData && dlData.length > 0) {
          setDownloads(dlData)
        } else {
          setDownloads(resources.downloads)
        }
      } catch (e) {
        console.error("Gagal mengambil data dari Supabase, menggunakan fallback:", e)
        setArticles(resources.articles)
        setPapers(resources.papers)
        setDownloads(resources.downloads)
      } finally {
        setLoading(false)
      }
    }
    fetchAllResources()
  }, [])

  return (
    <main className="min-h-screen bg-[#FBF6ED] overflow-hidden">
      <Navbar />

      {/* Header Banner */}
      <section className="relative bg-gradient-to-br from-[#2a1845] to-[#1a0f2d] pt-36 pb-20 px-6 text-center">
        {/* Glow */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[150%] h-[150%] pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(circle at 50% 0%, #7c4fd4 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <p className="mb-3 font-script text-2xl text-[#f5c6d0] drop-shadow-sm">
            Research Publications & Downloads
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            Resources
          </h1>
        </motion.div>
      </section>

      {/* Resource Navigator */}
      <section className="relative px-6 py-20 bg-white">
        <div className="mx-auto max-w-5xl">
          
          {/* Tab buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-border pb-4">
            <button
              onClick={() => setActiveTab("articles")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold tracking-wide transition-all ${
                activeTab === "articles"
                  ? "bg-[#2a1845] text-white shadow-md shadow-purple-950/10"
                  : "text-[#2a1845]/70 hover:bg-[#FBF6ED]"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Artikel Edukasi
            </button>
            <button
              onClick={() => setActiveTab("papers")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold tracking-wide transition-all ${
                activeTab === "papers"
                  ? "bg-[#2a1845] text-white shadow-md shadow-purple-950/10"
                  : "text-[#2a1845]/70 hover:bg-[#FBF6ED]"
              }`}
            >
              <FileText className="h-4 w-4" />
              Publikasi Riset
            </button>
            <button
              onClick={() => setActiveTab("downloads")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold tracking-wide transition-all ${
                activeTab === "downloads"
                  ? "bg-[#2a1845] text-white shadow-md shadow-purple-950/10"
                  : "text-[#2a1845]/70 hover:bg-[#FBF6ED]"
              }`}
            >
              <Download className="h-4 w-4" />
              Bahan Unduhan (PDF)
            </button>
          </div>

          {/* Animate Tab Content Switching */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer}
            >
              {/* Articles tab */}
              {activeTab === "articles" && (
                <div className="space-y-6">
                  {loading ? (
                    <div className="text-center py-10 text-xs text-[#2a1845]/50 animate-pulse">Memuat artikel dari database...</div>
                  ) : articles.length === 0 ? (
                    <div className="text-center py-10 text-xs text-muted-foreground">Tidak ada artikel.</div>
                  ) : (
                    articles.map((art, idx) => (
                      <motion.div
                        variants={fadeInUp}
                        whileHover={{ y: -4, boxShadow: "0 8px 24px -10px rgba(42, 24, 69, 0.1)" }}
                        key={idx}
                        className="flex flex-col md:flex-row items-start justify-between gap-6 p-6 rounded-3xl border border-[#e8e0f7] bg-white transition-all duration-300"
                      >
                        <div className="space-y-2 flex-1">
                          <span className="text-[10px] font-bold text-[#7c4fd4] uppercase tracking-wider">
                            {art.category}
                          </span>
                          <h3 className="text-lg font-bold text-[#2a1845]">{art.title}</h3>
                          <p className="text-xs text-foreground/70 leading-relaxed max-w-2xl">{art.desc}</p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 text-xs text-muted-foreground pt-1 md:pt-0">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {art.date}
                          </span>
                          <span className="rounded-full bg-[#ede9fb] text-[#6d3fc9] px-2.5 py-0.5 font-semibold text-[10px]">
                            {art.readTime}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {/* Research papers tab */}
              {activeTab === "papers" && (
                <div className="space-y-6">
                  {papers.length === 0 ? (
                    <div className="text-center py-10 text-xs text-muted-foreground">Tidak ada publikasi riset.</div>
                  ) : (
                    papers.map((paper, idx) => (
                      <motion.div
                        variants={fadeInUp}
                        whileHover={{ y: -4, boxShadow: "0 8px 24px -10px rgba(42, 24, 69, 0.1)" }}
                        key={idx}
                        className="p-6 rounded-3xl border border-[#e8e0f7] bg-white transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-base font-bold text-[#2a1845] leading-snug">{paper.title}</h3>
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={paper.doi ? (paper.doi.startsWith("http") ? paper.doi : `https://doi.org/${paper.doi}`) : "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-[#7c4fd4] hover:bg-purple-50 transition-all"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </motion.a>
                        </div>
                        <p className="text-xs text-[#7c4fd4] font-semibold mb-2">{paper.journal} ({paper.year})</p>
                        <p className="text-xs text-foreground/70 mb-4">Penulis: {paper.authors}</p>
                        <div className="text-[10px] font-mono text-muted-foreground">DOI: {paper.doi}</div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {/* Downloads tab */}
              {activeTab === "downloads" && (
                <div className="space-y-4">
                  {downloads.length === 0 ? (
                    <div className="text-center py-10 text-xs text-muted-foreground">Tidak ada bahan unduhan.</div>
                  ) : (
                    downloads.map((dl, idx) => (
                      <motion.div
                        variants={fadeInUp}
                        whileHover={{ y: -3, backgroundColor: "rgba(251, 246, 237, 0.4)" }}
                        key={idx}
                        className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-[#FBF6ED]/10 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#7c4fd4] border border-[#e8e0f7]">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#2a1845]">{dl.name}</h4>
                            <p className="text-xs text-foreground/60">{dl.type} • {dl.size}</p>
                          </div>
                        </div>

                        <motion.a
                          href={dl.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-1 rounded-xl bg-[#2a1845] hover:bg-[#1a0f2d] text-white px-4 py-2 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Unduh
                        </motion.a>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      <Footer />
    </main>
  )
}
