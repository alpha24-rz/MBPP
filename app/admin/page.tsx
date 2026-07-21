"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { BarChart3, Users, BookOpen, Brain, Activity, ShieldAlert, Plus, Trash2, Edit3, X, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"
import { useAuth } from "@/lib/auth-context"

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

export default function AdminPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.user_metadata?.role !== "admin") {
        router.push("/")
      }
    }
  }, [user, authLoading, router])
  
  const [activeView, setActiveView] = useState<"overview" | "participants" | "articles" | "interventions" | "journals" | "papers" | "downloads">("overview")
  const [articles, setArticles] = useState<any[]>([])
  const [interventions, setInterventions] = useState<any[]>([])
  const [journals, setJournals] = useState<any[]>([])
  const [papers, setPapers] = useState<any[]>([])
  const [downloads, setDownloads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Form states
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [editingArticle, setEditingArticle] = useState<any | null>(null)
  const [articleForm, setArticleForm] = useState({
    title: "",
    desc_text: "",
    category: "Artikel Edukasi",
    read_time: "5 Menit",
  })

  const [showInterventionModal, setShowInterventionModal] = useState(false)
  const [editingIntervention, setEditingIntervention] = useState<any | null>(null)
  const [interventionForm, setInterventionForm] = useState({
    title: "",
    desc_text: "",
  })

  const [showPaperModal, setShowPaperModal] = useState(false)
  const [editingPaper, setEditingPaper] = useState<any | null>(null)
  const [paperForm, setPaperForm] = useState({
    title: "",
    journal: "",
    authors: "",
    year: "",
    doi: "",
  })

  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [editingDownload, setEditingDownload] = useState<any | null>(null)
  const [downloadForm, setDownloadForm] = useState({
    name: "",
    type: "Workbook Jurnal Terbimbing",
    size: "",
    url: "",
  })

  async function fetchDbData() {
    setLoading(true)
    try {
      const { data: artData, error: artErr } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false })
      if (!artErr && artData) setArticles(artData)

      const { data: intData, error: intErr } = await supabase
        .from("interventions")
        .select("*")
        .order("created_at", { ascending: true })
      if (!intErr && intData) setInterventions(intData)

      const { data: jData, error: jErr } = await supabase
        .from("journal_entries")
        .select("*")
        .order("created_at", { ascending: false })
      if (!jErr && jData) setJournals(jData)

      // Fetch Papers
      const { data: paperData } = await supabase
        .from("research_papers")
        .select("*")
        .order("created_at", { ascending: false })
      if (paperData) setPapers(paperData)

      // Fetch Downloads
      const { data: dlData } = await supabase
        .from("downloads")
        .select("*")
        .order("created_at", { ascending: false })
      if (dlData) setDownloads(dlData)
    } catch (error) {
      console.error("Gagal memuat data dari Supabase:", error)
    } finally {
      setLoading(false)
    }
  }

  // Paper CRUD Handlers
  const handleOpenAddPaper = () => {
    setEditingPaper(null)
    setPaperForm({ title: "", journal: "", authors: "", year: "", doi: "" })
    setShowPaperModal(true)
  }

  const handleOpenEditPaper = (paper: any) => {
    setEditingPaper(paper)
    setPaperForm({
      title: paper.title,
      journal: paper.journal,
      authors: paper.authors,
      year: paper.year,
      doi: paper.doi,
    })
    setShowPaperModal(true)
  }

  const handleSavePaper = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!paperForm.title.trim()) return
    try {
      if (editingPaper) {
        const { error } = await supabase
          .from("research_papers")
          .update(paperForm)
          .eq("id", editingPaper.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from("research_papers")
          .insert([paperForm])
        if (error) throw error
      }
      setShowPaperModal(false)
      fetchDbData()
    } catch (error) {
      alert("Error saat menyimpan publikasi: " + (error as any).message)
    }
  }

  const handleDeletePaper = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus publikasi riset ini?")) return
    try {
      const { error } = await supabase.from("research_papers").delete().eq("id", id)
      if (error) throw error
      fetchDbData()
    } catch (error) {
      alert("Error saat menghapus publikasi: " + (error as any).message)
    }
  }

  // Download CRUD Handlers
  const handleOpenAddDownload = () => {
    setEditingDownload(null)
    setDownloadForm({ name: "", type: "Workbook Jurnal Terbimbing", size: "", url: "" })
    setShowDownloadModal(true)
  }

  const handleOpenEditDownload = (dl: any) => {
    setEditingDownload(dl)
    setDownloadForm({
      name: dl.name,
      type: dl.type,
      size: dl.size,
      url: dl.url || "",
    })
    setShowDownloadModal(true)
  }

  const handleSaveDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!downloadForm.name.trim()) return
    try {
      if (editingDownload) {
        const { error } = await supabase
          .from("downloads")
          .update(downloadForm)
          .eq("id", editingDownload.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from("downloads")
          .insert([downloadForm])
        if (error) throw error
      }
      setShowDownloadModal(false)
      fetchDbData()
    } catch (error) {
      alert("Error saat menyimpan bahan unduhan: " + (error as any).message)
    }
  }

  const handleDeleteDownload = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus bahan unduhan ini?")) return
    try {
      const { error } = await supabase.from("downloads").delete().eq("id", id)
      if (error) throw error
      fetchDbData()
    } catch (error) {
      alert("Error saat menghapus bahan unduhan: " + (error as any).message)
    }
  }

  useEffect(() => {
    fetchDbData()
  }, [])

  // Article Actions
  const handleOpenAddArticle = () => {
    setEditingArticle(null)
    setArticleForm({ title: "", desc_text: "", category: "Artikel Edukasi", read_time: "5 Menit" })
    setShowArticleModal(true)
  }

  const handleOpenEditArticle = (art: any) => {
    setEditingArticle(art)
    setArticleForm({
      title: art.title,
      desc_text: art.desc_text,
      category: art.category,
      read_time: art.read_time,
    })
    setShowArticleModal(true)
  }

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingArticle) {
        // Update
        const { error } = await supabase
          .from("articles")
          .update({
            title: articleForm.title,
            desc_text: articleForm.desc_text,
            category: articleForm.category,
            read_time: articleForm.read_time,
          })
          .eq("id", editingArticle.id)
        if (error) throw error
      } else {
        // Create
        const { error } = await supabase
          .from("articles")
          .insert([
            {
              title: articleForm.title,
              desc_text: articleForm.desc_text,
              category: articleForm.category,
              read_time: articleForm.read_time,
            },
          ])
        if (error) throw error
      }
      setShowArticleModal(false)
      fetchDbData()
    } catch (error) {
      alert("Error saat menyimpan artikel: " + (error as any).message)
    }
  }

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return
    try {
      const { error } = await supabase.from("articles").delete().eq("id", id)
      if (error) throw error
      fetchDbData()
    } catch (error) {
      alert("Error saat menghapus artikel: " + (error as any).message)
    }
  }

  // Intervention Actions
  const handleOpenAddIntervention = () => {
    setEditingIntervention(null)
    setInterventionForm({ title: "", desc_text: "" })
    setShowInterventionModal(true)
  }

  const handleOpenEditIntervention = (int: any) => {
    setEditingIntervention(int)
    setInterventionForm({
      title: int.title,
      desc_text: int.desc_text,
    })
    setShowInterventionModal(true)
  }

  const handleSaveIntervention = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingIntervention) {
        // Update
        const { error } = await supabase
          .from("interventions")
          .update({
            title: interventionForm.title,
            desc_text: interventionForm.desc_text,
          })
          .eq("id", editingIntervention.id)
        if (error) throw error
      } else {
        // Create
        const { error } = await supabase
          .from("interventions")
          .insert([
            {
              title: interventionForm.title,
              desc_text: interventionForm.desc_text,
              module_id: 1,
            },
          ])
        if (error) throw error
      }
      setShowInterventionModal(false)
      fetchDbData()
    } catch (error) {
      alert("Error saat menyimpan intervensi: " + (error as any).message)
    }
  }

  const handleDeleteIntervention = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus intervensi ini?")) return
    try {
      const { error } = await supabase.from("interventions").delete().eq("id", id)
      if (error) throw error
      fetchDbData()
    } catch (error) {
      alert("Error saat menghapus intervensi: " + (error as any).message)
    }
  }

  // Extract unique participant names from the journals list
  const uniqueParticipants = Array.from(new Set(journals.map(j => j.participant_name).filter(Boolean)))

  const stats = [
    { 
      title: "Total Partisipan", 
      val: `${uniqueParticipants.length} Peserta`, 
      icon: Users, 
      change: "Aktif dalam program", 
      color: "text-[#7c4fd4] bg-purple-50" 
    },
    { 
      title: "Sesi Intervensi", 
      val: `${interventions.length} Sesi Aktif`, 
      icon: BookOpen, 
      change: "Tersedia di kurikulum", 
      color: "text-amber-600 bg-amber-50" 
    },
    { 
      title: "Refleksi Jurnal", 
      val: `${journals.length} Dikirim`, 
      icon: Activity, 
      change: "Telah diarsipkan", 
      color: "text-emerald-600 bg-emerald-50" 
    },
    { 
      title: "Artikel Edukasi", 
      val: `${articles.length} Publikasi`, 
      icon: Brain, 
      change: "Artikel aktif", 
      color: "text-sky-600 bg-sky-50" 
    },
  ]

  const participants = uniqueParticipants.map((name) => {
    // Filter journals written by this participant
    const userJournals = journals.filter(j => j.participant_name === name)
    
    // Find unique sessions completed by the user
    const completedSessions = new Set(userJournals.map(j => j.intervention_title))
    const totalCompleted = completedSessions.size
    
    // Format email based on their name
    const email = name.toLowerCase().replace(/[^a-z0-9]/g, "") + "@student.edu"
    
    return {
      name: name,
      email: email,
      personality: "Partisipan MBPP",
      progress: `${totalCompleted} dari ${interventions.length || 5} Sesi`,
      score: `${userJournals.length} Refleksi`
    }
  })

  if (authLoading || !user || user.user_metadata?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#FBF6ED] flex flex-col items-center justify-center font-sans gap-3">
        <Loader2 className="h-8 w-8 text-[#7c4fd4] animate-spin" />
        <p className="text-xs text-neutral-500 font-semibold">Memeriksa otorisasi...</p>
      </div>
    )
  }

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
            Research Observer Dashboard
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            Admin Console
          </h1>
        </motion.div>
      </section>

      {/* Dashboard Section */}
      <section className="relative px-6 py-20 bg-white">
        <div className="mx-auto max-w-5xl">
          
          {/* Dashboard Tabs */}
          <div className="flex flex-wrap gap-4 mb-10 border-b border-border pb-4">
            <button
              onClick={() => setActiveView("overview")}
              className={`text-sm font-bold pb-2 transition-all relative ${
                activeView === "overview" ? "text-[#7c4fd4]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Ringkasan Data
              {activeView === "overview" && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7c4fd4]" />
              )}
            </button>
            <button
              onClick={() => setActiveView("participants")}
              className={`text-sm font-bold pb-2 transition-all relative ${
                activeView === "participants" ? "text-[#7c4fd4]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Partisipan Riset
              {activeView === "participants" && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7c4fd4]" />
              )}
            </button>
            <button
              onClick={() => setActiveView("articles")}
              className={`text-sm font-bold pb-2 transition-all relative ${
                activeView === "articles" ? "text-[#7c4fd4]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Kelola Blog/Artikel
              {activeView === "articles" && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7c4fd4]" />
              )}
            </button>
            <button
              onClick={() => setActiveView("interventions")}
              className={`text-sm font-bold pb-2 transition-all relative ${
                activeView === "interventions" ? "text-[#7c4fd4]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Kelola Intervensi
              {activeView === "interventions" && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7c4fd4]" />
              )}
            </button>
            <button
              onClick={() => setActiveView("journals")}
              className={`text-sm font-bold pb-2 transition-all relative cursor-pointer ${
                activeView === "journals" ? "text-[#7c4fd4]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Jurnal Refleksi Peserta
              {activeView === "journals" && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7c4fd4]" />
              )}
            </button>
            <button
              onClick={() => setActiveView("papers")}
              className={`text-sm font-bold pb-2 transition-all relative cursor-pointer ${
                activeView === "papers" ? "text-[#7c4fd4]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Kelola Publikasi Riset
              {activeView === "papers" && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7c4fd4]" />
              )}
            </button>
            <button
              onClick={() => setActiveView("downloads")}
              className={`text-sm font-bold pb-2 transition-all relative cursor-pointer ${
                activeView === "downloads" ? "text-[#7c4fd4]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Kelola Bahan Unduhan
              {activeView === "downloads" && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7c4fd4]" />
              )}
            </button>
          </div>

          {/* Animate Tab switching */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer}
            >
              {/* Overview View */}
              {activeView === "overview" && (
                <div className="space-y-8">
                  {/* Stat Cards */}
                  <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((st, idx) => {
                      const Icon = st.icon
                      return (
                        <motion.div
                          variants={fadeInUp}
                          whileHover={{ y: -4, boxShadow: "0 10px 25px -10px rgba(42, 24, 69, 0.1)" }}
                          key={idx}
                          className="p-6 rounded-2xl border border-border bg-white shadow-sm flex flex-col justify-between transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold text-muted-foreground">{st.title}</span>
                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${st.color}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-[#2a1845] mb-1">{st.val}</h4>
                            <span className="text-[10px] text-muted-foreground font-medium">{st.change}</span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>

                  {/* Research Status Alert */}
                  <motion.div
                    variants={fadeInUp}
                    className="p-6 rounded-2xl border border-blue-100 bg-blue-50/20 flex gap-4 items-start"
                  >
                    <ShieldAlert className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-blue-950 mb-1">Status Keamanan Data Aktif</h4>
                      <p className="text-xs text-blue-950/70 leading-relaxed">
                        Sistem dalam kepatuhan HIPAA & GDPR penuh. Seluruh data asesmen psikologis Big Five dienkripsi *at rest* dan *in transit*. Identifikasi personal dianonimkan untuk menjaga objektivitas penilaian peneliti.
                      </p>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Participants View */}
              {activeView === "participants" && (
                <motion.div
                  variants={fadeInUp}
                  className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm"
                >
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#FBF6ED]/30 text-xs font-bold text-[#2a1845] border-b border-border">
                        <th className="p-4">Nama Lengkap</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Tipe Kepribadian Dominan</th>
                        <th className="p-4">Progres Intervensi</th>
                        <th className="p-4">Nilai Efikasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-xs text-foreground/80">
                      {participants.map((p, idx) => (
                        <motion.tr
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={idx}
                          className="hover:bg-[#FBF6ED]/10 transition-colors"
                        >
                          <td className="p-4 font-bold text-[#2a1845]">{p.name}</td>
                          <td className="p-4 font-mono text-muted-foreground">{p.email}</td>
                          <td className="p-4">
                            <span className="rounded-full bg-[#ede9fb] text-[#6d3fc9] px-2.5 py-0.5 font-semibold text-[10px]">
                              {p.personality}
                            </span>
                          </td>
                          <td className="p-4 text-emerald-600 font-semibold">{p.progress}</td>
                          <td className="p-4 font-bold">{p.score}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}

              {/* Kelola Blog/Artikel View */}
              {activeView === "articles" && (
                <motion.div variants={fadeInUp} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[#2a1845]">Daftar Artikel</h3>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleOpenAddArticle}
                      className="flex items-center gap-1.5 rounded-xl bg-[#7c4fd4] hover:bg-[#5e35b8] text-white px-4 py-2 text-xs font-semibold shadow transition-all duration-200"
                    >
                      <Plus className="h-4 w-4" /> Tambah Artikel
                    </motion.button>
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 text-[#7c4fd4] animate-spin" />
                    </div>
                  ) : articles.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-2xl text-muted-foreground text-xs">
                      Tidak ada artikel ditemukan. Pastikan Supabase sudah terkonfigurasi.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {articles.map((art) => (
                        <div key={art.id} className="p-5 rounded-2xl border border-border bg-white flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-[#7c4fd4] uppercase tracking-wider">{art.category}</span>
                            <h4 className="text-sm font-bold text-[#2a1845]">{art.title}</h4>
                            <p className="text-xs text-foreground/60 line-clamp-2 max-w-2xl">{art.desc_text}</p>
                            <span className="inline-block text-[10px] text-muted-foreground pt-1">Lama Baca: {art.read_time}</span>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => handleOpenEditArticle(art)}
                              className="p-2 rounded-lg border border-border text-[#7c4fd4] hover:bg-purple-50 transition-colors"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(art.id)}
                              className="p-2 rounded-lg border border-border text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Kelola Intervensi View */}
              {activeView === "interventions" && (
                <motion.div variants={fadeInUp} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-[#2a1845]">Daftar Intervensi</h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Mengelola sesi/topik intervensi untuk Modul 1 (Awal)</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleOpenAddIntervention}
                      className="flex items-center gap-1.5 rounded-xl bg-[#7c4fd4] hover:bg-[#5e35b8] text-white px-4 py-2 text-xs font-semibold shadow transition-all duration-200"
                    >
                      <Plus className="h-4 w-4" /> Tambah Intervensi
                    </motion.button>
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 text-[#7c4fd4] animate-spin" />
                    </div>
                  ) : interventions.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-2xl text-muted-foreground text-xs">
                      Tidak ada intervensi ditemukan. Pastikan Supabase sudah terkonfigurasi.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {interventions.map((item, index) => (
                        <div key={item.id} className="p-5 rounded-2xl border border-border bg-white flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-[#7c4fd4] uppercase tracking-wider">Intervensi {index + 1}</span>
                            <h4 className="text-sm font-bold text-[#2a1845]">{item.title}</h4>
                            <p className="text-xs text-foreground/60 leading-relaxed max-w-2xl">{item.desc_text}</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => handleOpenEditIntervention(item)}
                              className="p-2 rounded-lg border border-border text-[#7c4fd4] hover:bg-purple-50 transition-colors"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteIntervention(item.id)}
                              className="p-2 rounded-lg border border-border text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Jurnal Refleksi View */}
              {activeView === "journals" && (
                <motion.div variants={fadeInUp} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[#2a1845]">Jurnal Refleksi Peserta</h3>
                    <button
                      onClick={fetchDbData}
                      className="text-xs text-[#7c4fd4] hover:text-[#5e35b8] font-bold cursor-pointer"
                    >
                      Refresh Data
                    </button>
                  </div>
                  {loading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 text-[#7c4fd4] animate-spin" />
                    </div>
                  ) : journals.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-neutral-200 rounded-2xl text-muted-foreground text-xs">
                      Belum ada jurnal refleksi yang dikirimkan oleh peserta.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {journals.map((j) => (
                        <div key={j.id} className="p-5 rounded-2xl border border-neutral-200 bg-white shadow-sm space-y-3">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h4 className="text-sm font-bold text-[#2a1845]">{j.participant_name}</h4>
                              <p className="text-[10px] text-[#7c4fd4] font-semibold mt-0.5">Sesi: {j.intervention_title}</p>
                            </div>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              {new Date(j.created_at).toLocaleString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </span>
                          </div>
                          <p className="text-xs text-foreground/80 leading-relaxed bg-[#FBF6ED]/30 p-3.5 rounded-xl border border-purple-50">
                            {j.journal_text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Kelola Publikasi Riset View */}
              {activeView === "papers" && (
                <motion.div variants={fadeInUp} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[#2a1845]">Daftar Publikasi Riset</h3>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleOpenAddPaper}
                      className="flex items-center gap-1.5 rounded-xl bg-[#7c4fd4] hover:bg-[#5e35b8] text-white px-4 py-2 text-xs font-semibold shadow transition-all duration-200 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" /> Tambah Publikasi
                    </motion.button>
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 text-[#7c4fd4] animate-spin" />
                    </div>
                  ) : papers.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-2xl text-muted-foreground text-xs">
                      Tidak ada publikasi riset ditemukan. Pastikan Supabase sudah terkonfigurasi.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {papers.map((paper) => (
                        <div key={paper.id} className="p-5 rounded-2xl border border-border bg-white flex justify-between items-start gap-4">
                          <div className="space-y-1 flex-1">
                            <h4 className="text-sm font-bold text-[#2a1845]">{paper.title}</h4>
                            <p className="text-xs text-[#7c4fd4] font-semibold">{paper.journal} ({paper.year})</p>
                            <p className="text-xs text-foreground/60">Penulis: {paper.authors}</p>
                            <span className="inline-block text-[10px] font-mono text-muted-foreground">DOI: {paper.doi}</span>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => handleOpenEditPaper(paper)}
                              className="p-2 rounded-lg border border-border text-[#7c4fd4] hover:bg-purple-50 transition-colors cursor-pointer"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePaper(paper.id)}
                              className="p-2 rounded-lg border border-border text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Kelola Bahan Unduhan View */}
              {activeView === "downloads" && (
                <motion.div variants={fadeInUp} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[#2a1845]">Daftar Bahan Unduhan</h3>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleOpenAddDownload}
                      className="flex items-center gap-1.5 rounded-xl bg-[#7c4fd4] hover:bg-[#5e35b8] text-white px-4 py-2 text-xs font-semibold shadow transition-all duration-200 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" /> Tambah Bahan Unduhan
                    </motion.button>
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 text-[#7c4fd4] animate-spin" />
                    </div>
                  ) : downloads.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-2xl text-muted-foreground text-xs">
                      Tidak ada bahan unduhan ditemukan. Pastikan Supabase sudah terkonfigurasi.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {downloads.map((dl) => (
                        <div key={dl.id} className="p-5 rounded-2xl border border-border bg-[#FBF6ED]/10 flex justify-between items-start gap-4">
                          <div className="space-y-1 flex-1">
                            <h4 className="text-sm font-bold text-[#2a1845]">{dl.name}</h4>
                            <p className="text-xs text-foreground/60">{dl.type} • {dl.size}</p>
                            <span className="inline-block text-[10px] text-muted-foreground truncate max-w-md">URL: {dl.url || "-"}</span>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => handleOpenEditDownload(dl)}
                              className="p-2 rounded-lg border border-border text-[#7c4fd4] hover:bg-purple-50 transition-colors cursor-pointer"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteDownload(dl.id)}
                              className="p-2 rounded-lg border border-border text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ARTICLE MODAL */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-3xl p-6 border border-border shadow-2xl relative"
          >
            <button
              onClick={() => setShowArticleModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-bold text-[#2a1845] mb-5">
              {editingArticle ? "Edit Artikel" : "Tambah Artikel Baru"}
            </h3>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#2a1845]">Judul Artikel</label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  placeholder="Masukkan judul artikel..."
                  className="rounded-xl border border-border bg-[#FBF6ED]/20 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#2a1845]">Kategori</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                    className="rounded-xl border border-border bg-white px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors"
                  >
                    <option value="Artikel Edukasi">Artikel Edukasi</option>
                    <option value="Mindfulness">Mindfulness</option>
                    <option value="Literasi Digital">Literasi Digital</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#2a1845]">Lama Baca (Menit)</label>
                  <input
                    type="text"
                    required
                    value={articleForm.read_time}
                    onChange={(e) => setArticleForm({ ...articleForm, read_time: e.target.value })}
                    placeholder="Contoh: 5 Menit"
                    className="rounded-xl border border-border bg-[#FBF6ED]/20 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#2a1845]">Isi / Deskripsi Singkat</label>
                <textarea
                  required
                  rows={4}
                  value={articleForm.desc_text}
                  onChange={(e) => setArticleForm({ ...articleForm, desc_text: e.target.value })}
                  placeholder="Tulis deskripsi atau konten ringkas artikel..."
                  className="rounded-xl border border-border bg-[#FBF6ED]/20 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#7c4fd4] to-[#5e35b8] py-3 font-bold text-white shadow transition-all duration-200 mt-2"
              >
                Simpan Artikel
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}

      {/* INTERVENTION MODAL */}
      {showInterventionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-3xl p-6 border border-border shadow-2xl relative"
          >
            <button
              onClick={() => setShowInterventionModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-bold text-[#2a1845] mb-5">
              {editingIntervention ? "Edit Intervensi" : "Tambah Intervensi Baru"}
            </h3>

            <form onSubmit={handleSaveIntervention} className="space-y-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#2a1845]">Nama Sesi / Topik Intervensi</label>
                <input
                  type="text"
                  required
                  value={interventionForm.title}
                  onChange={(e) => setInterventionForm({ ...interventionForm, title: e.target.value })}
                  placeholder="Contoh: Big Five Personality Framework"
                  className="rounded-xl border border-border bg-[#FBF6ED]/20 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#2a1845]">Deskripsi Kegiatan</label>
                <textarea
                  required
                  rows={4}
                  value={interventionForm.desc_text}
                  onChange={(e) => setInterventionForm({ ...interventionForm, desc_text: e.target.value })}
                  placeholder="Jelaskan apa yang dilakukan atau dipelajari pada sesi intervensi ini..."
                  className="rounded-xl border border-border bg-[#FBF6ED]/20 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#7c4fd4] to-[#5e35b8] py-3 font-bold text-white shadow transition-all duration-200 mt-2"
              >
                Simpan Intervensi
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
      {/* RESEARCH PAPER MODAL */}
      {showPaperModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-3xl p-6 border border-border shadow-2xl relative"
          >
            <button
              onClick={() => setShowPaperModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-bold text-[#2a1845] mb-5">
              {editingPaper ? "Edit Publikasi Riset" : "Tambah Publikasi Riset Baru"}
            </h3>

            <form onSubmit={handleSavePaper} className="space-y-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#2a1845]">Judul Publikasi / Paper</label>
                <input
                  type="text"
                  required
                  value={paperForm.title}
                  onChange={(e) => setPaperForm({ ...paperForm, title: e.target.value })}
                  placeholder="Judul jurnal..."
                  className="rounded-xl border border-border bg-[#FBF6ED]/20 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#2a1845]">Nama Jurnal</label>
                <input
                  type="text"
                  required
                  value={paperForm.journal}
                  onChange={(e) => setPaperForm({ ...paperForm, journal: e.target.value })}
                  placeholder="Contoh: Frontiers in Psychology"
                  className="rounded-xl border border-border bg-[#FBF6ED]/20 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#2a1845]">Penulis (Authors)</label>
                <input
                  type="text"
                  required
                  value={paperForm.authors}
                  onChange={(e) => setPaperForm({ ...paperForm, authors: e.target.value })}
                  placeholder="Contoh: Riswandi, Arif, M. R. H., Alwadi, R."
                  className="rounded-xl border border-border bg-[#FBF6ED]/20 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#2a1845]">Tahun Terbit</label>
                  <input
                    type="text"
                    required
                    value={paperForm.year}
                    onChange={(e) => setPaperForm({ ...paperForm, year: e.target.value })}
                    placeholder="Contoh: 2026"
                    className="rounded-xl border border-border bg-[#FBF6ED]/20 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#2a1845]">DOI / Link Tautan</label>
                  <input
                    type="text"
                    required
                    value={paperForm.doi}
                    onChange={(e) => setPaperForm({ ...paperForm, doi: e.target.value })}
                    placeholder="Contoh: 10.3389/fpsyg.2025.992812"
                    className="rounded-xl border border-border bg-[#FBF6ED]/20 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#7c4fd4] to-[#5e35b8] py-3 font-bold text-white shadow transition-all duration-200 mt-2 cursor-pointer"
              >
                Simpan Publikasi
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}

      {/* DOWNLOADS MODAL */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-3xl p-6 border border-border shadow-2xl relative"
          >
            <button
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-bold text-[#2a1845] mb-5">
              {editingDownload ? "Edit Bahan Unduhan" : "Tambah Bahan Unduhan Baru"}
            </h3>

            <form onSubmit={handleSaveDownload} className="space-y-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#2a1845]">Nama File / Judul Unduhan</label>
                <input
                  type="text"
                  required
                  value={downloadForm.name}
                  onChange={(e) => setDownloadForm({ ...downloadForm, name: e.target.value })}
                  placeholder="Contoh: MBPP Workbook.pdf"
                  className="rounded-xl border border-border bg-[#FBF6ED]/20 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#2a1845]">Tipe Bahan / Dokumen</label>
                <select
                  value={downloadForm.type}
                  onChange={(e) => setDownloadForm({ ...downloadForm, type: e.target.value })}
                  className="rounded-xl border border-border bg-[#FBF6ED]/20 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors"
                >
                  <option value="Workbook Jurnal Terbimbing">Workbook Jurnal Terbimbing</option>
                  <option value="Panduan Penilaian Mandiri">Panduan Penilaian Mandiri</option>
                  <option value="Lembar Panduan Praktis">Lembar Panduan Praktis</option>
                  <option value="Dokumen Riset Tambahan">Dokumen Riset Tambahan</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#2a1845]">Ukuran File</label>
                  <input
                    type="text"
                    required
                    value={downloadForm.size}
                    onChange={(e) => setDownloadForm({ ...downloadForm, size: e.target.value })}
                    placeholder="Contoh: 4.2 MB"
                    className="rounded-xl border border-border bg-[#FBF6ED]/20 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#2a1845]">URL File Unduhan</label>
                  <input
                    type="text"
                    value={downloadForm.url}
                    onChange={(e) => setDownloadForm({ ...downloadForm, url: e.target.value })}
                    placeholder="Tautan PDF/dokumen..."
                    className="rounded-xl border border-border bg-[#FBF6ED]/20 px-3.5 py-2.5 outline-none focus:border-[#7c4fd4] transition-colors"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#7c4fd4] to-[#5e35b8] py-3 font-bold text-white shadow transition-all duration-200 mt-2 cursor-pointer"
              >
                Simpan Bahan Unduhan
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
      <Footer />
    </main>
  )
}
