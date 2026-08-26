"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { FileText, Download, BookOpen, ExternalLink, Search, Quote, BookmarkCheck } from "lucide-react"
import { motion, AnimatePresence, type Variants } from "framer-motion"

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 12,
    },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

// Daftar Pustaka / Referensi Akademis Resmi (APA 7th Format)
const BIBLIOGRAPHY = [
  {
    category: "Mindfulness & Intervensi Psikoedukasi",
    citations: [
      {
        id: "ref-1",
        authors: "Güldal, S., & Satan, A.",
        year: "2022",
        title: "The effect of a mindfulness-based psychoeducation program on emotional regulation and psychological well-being among young adults.",
        source: "Journal of Rational-Emotive & Cognitive-Behavior Therapy, 40(3), 512–531.",
        doi: "https://doi.org/10.1007/s10942-021-00424-w",
        tag: "Adaptasi Utama Intervensi MBPP",
      },
      {
        id: "ref-2",
        authors: "Kabat-Zinn, J.",
        year: "1994",
        title: "Wherever you go, there you are: Mindfulness meditation in everyday life.",
        source: "Hyperion, New York.",
        doi: null,
        tag: "Prinsip Kesadaran Penuh (Mindfulness)",
      },
      {
        id: "ref-3",
        authors: "Goldberg, S. B., Tucker, R. P., Greene, P. A., Davidson, R. J., Wampold, B. E., Kearney, D. J., & Simpson, T. L.",
        year: "2018",
        title: "Mindfulness-based interventions for psychiatric disorders: A systematic review and meta-analysis.",
        source: "Clinical Psychology Review, 59, 52–60.",
        doi: "https://doi.org/10.1016/j.cpr.2017.10.011",
        tag: "Meta-Analisis Efektivitas MBI",
      },
    ],
  },
  {
    category: "Ketergantungan AI & Cyberpsychology (AI Intimacy)",
    citations: [
      {
        id: "ref-4",
        authors: "Pentina, N., Tarafdar, M., Pantoja, F., & Koh, C. E.",
        year: "2023",
        title: "Exploring the psychological mechanisms of AI intimacy: Chatbot attachment and parasocial interactions among Gen Z.",
        source: "Computers in Human Behavior, 148, 107873.",
        doi: "https://doi.org/10.1016/j.chb.2023.107873",
        tag: "Mekanisme Psikologis AI Intimacy",
      },
      {
        id: "ref-5",
        authors: "Turkle, S.",
        year: "2015",
        title: "Reclaiming conversation: The power of talk in a digital age.",
        source: "Penguin Press, New York.",
        doi: null,
        tag: "Teori Keterasingan Relasional Digital",
      },
      {
        id: "ref-6",
        authors: "Skjuve, M., Følstad, A., Fostervold, K. I., & Brandtzaeg, P. B.",
        year: "2021",
        title: "My chatbot friend: A longitudinal study of user-chatbot relationships.",
        source: "International Journal of Human-Computer Studies, 149, 102601.",
        doi: "https://doi.org/10.1016/j.ijhcs.2021.102601",
        tag: "Studi Longitudinal Hubungan Chatbot",
      },
    ],
  },
  {
    category: "Big Five Personality & Character Strengths",
    citations: [
      {
        id: "ref-7",
        authors: "Goldberg, L. R.",
        year: "1992",
        title: "The development of markers for the Big-Five factor structure.",
        source: "Psychological Assessment, 4(1), 26–42.",
        doi: "https://doi.org/10.1037/1040-3590.4.1.26",
        tag: "Dasar Instrumen IPIP-BFM-50",
      },
      {
        id: "ref-8",
        authors: "Peterson, C., & Seligman, M. E. P.",
        year: "2004",
        title: "Character strengths and virtues: A handbook and classification.",
        source: "Oxford University Press & American Psychological Association.",
        doi: null,
        tag: "Klasifikasi Strengths (VIA)",
      },
    ],
  },
  {
    category: "Metodologi Eksperimen & Treatment Fidelity",
    citations: [
      {
        id: "ref-9",
        authors: "Bellg, A. J., Borrelli, B., Resnick, B., Hecht, J., Minicucci, D. S., Ory, M., & Treatment Fidelity Workgroup.",
        year: "2004",
        title: "Enhancing treatment fidelity in health behavior change studies: Best practices and recommendations.",
        source: "Health Psychology, 23(5), 443–451.",
        doi: "https://doi.org/10.1037/0278-6133.23.5.443",
        tag: "Lembar Observasi Fidelitas",
      },
    ],
  },
]

const DEFAULT_DOWNLOADS = [
  {
    name: "Modul Eksperimen MBPP Revisi 2026.pdf",
    type: "Modul Intervensi Utama",
    size: "4.2 MB",
    url: "/downloads/Modul_MBPP.pdf",
  },
  {
    name: "Kalender Latihan Harian & Jurnal Syukur.pdf",
    type: "Panduan Latihan Mandiri",
    size: "1.8 MB",
    url: "/downloads/MBPP_Jurnal_Syukur.pdf",
  },
  {
    name: "Lembar Observasi Fidelitas & Manipulation Check.pdf",
    type: "Instrumen Observer",
    size: "1.1 MB",
    url: "/downloads/Fidelitas_MBPP.pdf",
  },
  {
    name: "Instrumen Pengukuran CAIDS-20 & IPIP-BFM-50.pdf",
    type: "Skala Asesmen Psikologi",
    size: "2.4 MB",
    url: "/downloads/Instrumen_CAIDS20_IPIP50.pdf",
  },
]

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<"bibliography" | "papers" | "downloads">("bibliography")
  const [searchQuery, setSearchQuery] = useState("")
  const [bibliographyList, setBibliographyList] = useState<any[]>(BIBLIOGRAPHY)
  const [papers, setPapers] = useState<any[]>([])
  const [downloads, setDownloads] = useState<any[]>(DEFAULT_DOWNLOADS)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDatabaseResources() {
      try {
        // Fetch Bibliographies / Sitasi
        const { data: bibData } = await supabase
          .from("bibliographies")
          .select("*")
          .order("order_index", { ascending: true })

        if (bibData && bibData.length > 0) {
          const map = new Map<string, any[]>()
          for (const item of bibData) {
            const cat = item.category || "Umum & Referensi Akademis"
            if (!map.has(cat)) {
              map.set(cat, [])
            }
            map.get(cat)!.push({
              id: String(item.id),
              authors: item.authors,
              year: String(item.year),
              title: item.title,
              source: item.source,
              doi: item.doi || null,
              tag: item.tag || "Sitasi MBPP",
            })
          }
          const formatted = Array.from(map.entries()).map(([category, citations]) => ({
            category,
            citations,
          }))
          setBibliographyList(formatted)
        }

        // Fetch Research Papers
        const { data: paperData } = await supabase
          .from("research_papers")
          .select("*")
          .order("created_at", { ascending: false })

        if (paperData && paperData.length > 0) {
          setPapers(paperData)
        }

        // Fetch Downloads
        const { data: dlData } = await supabase
          .from("downloads")
          .select("*")
          .order("created_at", { ascending: false })

        if (dlData && dlData.length > 0) {
          setDownloads(dlData)
        }
      } catch (e) {
        console.error("Gagal mengambil data dari Supabase:", e)
      }
    }
    fetchDatabaseResources()
  }, [])

  const handleCopyCitation = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  // Filter Daftar Pustaka berdasarkan kata kunci pencarian
  const filteredBibliography = bibliographyList
    .map((cat) => ({
      ...cat,
      citations: (cat.citations || []).filter(
        (c: any) =>
          c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.authors?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.tag?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.year?.includes(searchQuery)
      ),
    }))
    .filter((cat) => cat.citations.length > 0)


  return (
    <main className="min-h-screen bg-[#FBF6ED] overflow-hidden">
      <Navbar />

      {/* Header Banner */}
      <section className="relative bg-gradient-to-br from-[#2a1845] to-[#1a0f2d] pt-36 pb-20 px-6 text-center">
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
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-300/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-[#f5c6d0] mb-4">
            <Quote className="h-3.5 w-3.5" />
            <span>Referensi Akademis & Landasan Teoretis</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            Daftar Pustaka & Referensi
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed text-white/80 md:text-base">
            Kumpulan rujukan ilmiah, jurnal internasional, dan instrumen ukur yang menjadi landasan penyusunan program intervensi MBPP.
          </p>
        </motion.div>
      </section>

      {/* Main Content Navigator */}
      <section className="relative px-6 py-16 bg-white">
        <div className="mx-auto max-w-5xl">
          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 border-b border-border pb-4">
            <button
              onClick={() => setActiveTab("bibliography")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === "bibliography"
                  ? "bg-[#2a1845] text-white shadow-md shadow-purple-950/10"
                  : "text-[#2a1845]/70 hover:bg-[#FBF6ED]"
              }`}
            >
              <Quote className="h-4 w-4 text-[#B08D57]" />
              Daftar Pustaka & Sitasi
            </button>
            <button
              onClick={() => setActiveTab("papers")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === "papers"
                  ? "bg-[#2a1845] text-white shadow-md shadow-purple-950/10"
                  : "text-[#2a1845]/70 hover:bg-[#FBF6ED]"
              }`}
            >
              <FileText className="h-4 w-4 text-[#B08D57]" />
              Publikasi Riset Utama
            </button>
            <button
              onClick={() => setActiveTab("downloads")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === "downloads"
                  ? "bg-[#2a1845] text-white shadow-md shadow-purple-950/10"
                  : "text-[#2a1845]/70 hover:bg-[#FBF6ED]"
              }`}
            >
              <Download className="h-4 w-4 text-[#B08D57]" />
              Bahan Unduhan PDF
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer}
            >
              {/* Tab 1: Daftar Pustaka & Referensi (APA 7th Format) */}
              {activeTab === "bibliography" && (
                <div className="space-y-10">
                  {/* Search Bar */}
                  <div className="relative max-w-lg mx-auto mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Cari berdasarkan penulis, judul, instrumen (mis. Kabat-Zinn, CAIDS-20, Big Five)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-2xl border border-purple-100 bg-[#FBF6ED]/50 pl-11 pr-4 py-3 text-xs text-[#2a1845] focus:outline-none focus:ring-2 focus:ring-[#7c4fd4]/30"
                    />
                  </div>

                  {filteredBibliography.length === 0 ? (
                    <div className="text-center py-12 text-xs text-muted-foreground">
                      Tidak ditemukan referensi yang cocok dengan pencarian &quot;{searchQuery}&quot;.
                    </div>
                  ) : (
                    filteredBibliography.map((cat, catIdx) => (
                      <div key={catIdx} className="space-y-4">
                        <div className="flex items-center gap-2.5 border-b border-[#2a1845]/10 pb-2">
                          <span className="h-2 w-2 rounded-full bg-[#B08D57]" />
                          <h2 className="text-sm font-serif font-bold text-[#2a1845]">
                            {cat.category}
                          </h2>
                        </div>

                        <div className="space-y-4">
                          {cat.citations.map((item: any) => {
                            const fullCitationText = `${item.authors} (${item.year}). ${item.title} ${item.source}`

                            return (
                              <motion.div
                                key={item.id}
                                variants={fadeInUp}
                                className="group relative rounded-2xl border border-[#e8e0f7] bg-white p-6 shadow-xs hover:shadow-md transition-all duration-300"
                              >
                                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                                  <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="inline-flex items-center rounded-md bg-[#5e35b8]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#5e35b8] border border-[#5e35b8]/15">
                                        {item.tag}
                                      </span>
                                      <span className="text-[11px] font-mono text-[#B08D57] font-semibold">
                                        APA 7th Format
                                      </span>
                                    </div>
                                    <p className="text-sm font-medium text-[#2a1845] leading-relaxed font-sans">
                                      <span className="font-semibold text-[#2a1845]">{item.authors}</span> ({item.year}).{" "}
                                      <span className="italic">{item.title}</span> {item.source}
                                    </p>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0 self-end md:self-start">
                                    <button
                                      onClick={() => handleCopyCitation(item.id, fullCitationText)}
                                      className="inline-flex items-center gap-1.5 rounded-xl border border-purple-100 bg-[#FBF6ED] px-3 py-1.5 text-[11px] font-semibold text-[#2a1845] hover:bg-purple-50 transition-colors cursor-pointer"
                                      title="Salin Sitasi APA"
                                    >
                                      {copiedId === item.id ? (
                                        <>
                                          <BookmarkCheck className="h-3.5 w-3.5 text-emerald-600" />
                                          <span className="text-emerald-600">Tersalin!</span>
                                        </>
                                      ) : (
                                        <>
                                          <Quote className="h-3.5 w-3.5 text-[#7c4fd4]" />
                                          <span>Salin Sitasi</span>
                                        </>
                                      )}
                                    </button>

                                    {item.doi && (
                                      <a
                                        href={item.doi}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 rounded-xl bg-[#2a1845] hover:bg-[#1a0f2d] px-3 py-1.5 text-[11px] font-semibold text-white transition-colors"
                                      >
                                        <span>DOI</span>
                                        <ExternalLink className="h-3 w-3" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 2: Publikasi Riset Utama */}
              {activeTab === "papers" && (
                <div className="space-y-6">
                  {papers.length === 0 ? (
                    <div className="p-8 rounded-3xl border border-[#e8e0f7] bg-[#FBF6ED]/50 text-center">
                      <BookOpen className="h-8 w-8 text-[#7c4fd4] mx-auto mb-3" />
                      <h3 className="text-base font-serif font-bold text-[#2a1845]">Publikasi Hasil Penelitian RCT MBPP (2026)</h3>
                      <p className="text-xs text-foreground/70 max-w-lg mx-auto leading-relaxed mt-2">
                        Naskah artikel ilmiah mengenai efektivitas intervensi MBPP dalam menurunkan ketergantungan curhat AI pada Generasi Z saat ini sedang dalam proses peer-review jurnal internasional bereputasi.
                      </p>
                    </div>
                  ) : (
                    papers.map((paper, idx) => (
                      <motion.div
                        variants={fadeInUp}
                        key={idx}
                        className="p-6 rounded-3xl border border-[#e8e0f7] bg-white shadow-xs hover:shadow-md transition-all duration-300 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            {paper.badge && (
                              <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-md ${paper.badge_color || "bg-purple-100 text-purple-700 border border-purple-200"}`}>
                                {paper.badge}
                              </span>
                            )}
                            <h3 className="text-base font-bold text-[#2a1845] leading-snug">{paper.title}</h3>
                          </div>
                          {paper.doi && (
                            <a
                              href={paper.doi.startsWith("http") ? paper.doi : `https://doi.org/${paper.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-[#7c4fd4] hover:bg-purple-50 transition-all"
                              title="Buka DOI Riset"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>

                        <p className="text-xs text-[#7c4fd4] font-semibold">{paper.journal || "Jurnal Ilmiah"} {paper.year ? `(${paper.year})` : ""}</p>
                        <p className="text-xs text-foreground/70">Penulis: <span className="font-medium text-[#2a1845]">{paper.authors}</span></p>

                        {paper.desc_text && (
                          <p className="text-xs text-foreground/80 leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-purple-50">
                            {paper.desc_text}
                          </p>
                        )}

                        {paper.download_url && (
                          <div className="pt-2 flex justify-end">
                            <a
                              href={paper.download_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl bg-[#2a1845] hover:bg-[#1a0f2d] text-white px-4 py-2 text-xs font-semibold transition-all"
                            >
                              <Download className="h-3.5 w-3.5" />
                              <span>Unduh Naskah PDF</span>
                            </a>
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 3: Bahan Unduhan PDF */}
              {activeTab === "downloads" && (
                <div className="space-y-4">
                  {downloads.map((dl, idx) => {
                    const title = dl.title || dl.name || "File Unduhan PDF"
                    const url = dl.download_url || dl.url || "#"
                    return (
                      <motion.div
                        variants={fadeInUp}
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-[#e8e0f7] bg-white shadow-xs hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-[#7c4fd4] border border-[#e8e0f7] shrink-0">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#2a1845]">{title}</h4>
                            <p className="text-xs text-foreground/60">
                              {dl.type || "PDF Document"} {dl.size ? `• ${dl.size}` : ""}
                            </p>
                            {dl.desc_text && (
                              <p className="text-[11px] text-foreground/70 mt-1">{dl.desc_text}</p>
                            )}
                          </div>
                        </div>

                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2a1845] hover:bg-[#1a0f2d] text-white px-5 py-2.5 text-xs font-semibold transition-all cursor-pointer shrink-0"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Unduh PDF
                        </a>
                      </motion.div>
                    )
                  })}
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
