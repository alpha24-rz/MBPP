"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"

import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { supabase } from "@/lib/supabaseClient"
import { useAuth } from "@/lib/auth-context"
import { uploadFileToSupabase } from "@/lib/upload-utils"

import { BADGE_COLOR_PRESETS } from "./components/constants"
import { AdminHeader } from "./components/admin-header"
import { AdminTabs, AdminViewType } from "./components/admin-tabs"
import { ModulesView } from "./components/modules-view"
import { PertemuanView } from "./components/pertemuan-view"
import { SessionsView } from "./components/sessions-view"
import { JournalsView } from "./components/journals-view"

import { ModuleModal } from "./components/module-modal"
import { PertemuanModal } from "./components/pertemuan-modal"
import { SesiModal, ReflectionQuestionItem, DEFAULT_BLOCK_ORDER } from "./components/sesi-modal"

export default function AdminConsolePage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.user_metadata?.role !== "admin") {
        router.push("/")
      }
    }
  }, [user, authLoading, router])

  const [activeView, setActiveView] = useState<AdminViewType>("modules")

  const [modules, setModules] = useState<any[]>([])
  const [pertemuan, setPertemuan] = useState<any[]>([])
  const [interventions, setInterventions] = useState<any[]>([])
  const [journals, setJournals] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [papers, setPapers] = useState<any[]>([])
  const [downloads, setDownloads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Filters & Search
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>("all")
  const [selectedPertemuanFilter, setSelectedPertemuanFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Modals & Form States
  // 1. Modul Modal
  const [showModuleModal, setShowModuleModal] = useState(false)
  const [editingModule, setEditingModule] = useState<any | null>(null)
  const [moduleForm, setModuleForm] = useState({
    module_number: "Modul 01",
    title: "",
    subtitle: "",
    desc_text: "",
    badge: "Kurikulum Utama MBPP",
    badge_color: BADGE_COLOR_PRESETS[0].value,
    image_url: "/images/module-01.png",
    order_index: "1",
  })

  // 2. Pertemuan Modal
  const [showPertemuanModal, setShowPertemuanModal] = useState(false)
  const [editingPertemuan, setEditingPertemuan] = useState<any | null>(null)
  const [pertemuanForm, setPertemuanForm] = useState({
    module_id: "1",
    pertemuan_number: "Pertemuan 05",
    title: "",
    subtitle: "",
    desc_text: "",
    duration: "130 Menit",
    sessions_count: "3 Sesi",
    badge: "Sesi Pertemuan",
    badge_color: BADGE_COLOR_PRESETS[0].value,
    image_url: "/images/module-01.png",
    order_index: "5",
  })

  // 3. Sesi Intervention Modal
  const [showSesiModal, setShowSesiModal] = useState(false)
  const [editingSesi, setEditingSesi] = useState<any | null>(null)
  const [sesiForm, setSesiForm] = useState({
    pertemuan_id: "1",
    module_id: "1",
    title: "",
    subtitle: "",
    desc_text: "",
    has_text_instruction: true,
    instruction_steps: [] as string[],
    image_url: "",
    image_title: "",
    content_order: DEFAULT_BLOCK_ORDER,
    has_slogan_banner: false,
    has_participant_name: true,
    audio_url: "",
    audio_title: "",
    video_url: "",
    slogan: "",
    character_strength: "",
    has_breathing_visualizer: false,
    has_habit_tracker: false,
    has_gratitude_journal: false,
    has_smart_goal: false,
    has_self_checkin: false,
    reflection_title: "Refleksi Aktivitas 1",
    reflection_subtitle: "",
    reflection_questions: [] as (string | ReflectionQuestionItem)[],
    order_index: "1",
  })

  async function fetchDbData() {
    setLoading(true)
    try {
      // Fetch Modules
      const { data: modData } = await supabase.from("modules").select("*").order("order_index", { ascending: true })
      if (modData) setModules(modData)

      // Fetch Pertemuan
      const { data: pData } = await supabase.from("pertemuan").select("*").order("order_index", { ascending: true })
      if (pData) setPertemuan(pData)

      // Fetch Sesi Interventions
      const { data: intData } = await supabase.from("interventions").select("*").order("order_index", { ascending: true })
      if (intData) setInterventions(intData)

      // Fetch Journals
      const { data: jData } = await supabase.from("journal_entries").select("*").order("created_at", { ascending: false })
      if (jData) setJournals(jData)

      // Fetch Articles
      const { data: artData } = await supabase.from("articles").select("*").order("created_at", { ascending: false })
      if (artData) setArticles(artData)

      // Fetch Papers & Downloads
      const { data: paperData } = await supabase.from("research_papers").select("*")
      if (paperData) setPapers(paperData)

      const { data: dlData } = await supabase.from("downloads").select("*")
      if (dlData) setDownloads(dlData)
    } catch (err) {
      console.error("Gagal memuat data dari Supabase:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDbData()
  }, [])

  // Image Upload Handler
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void,
    bucketName: string = "module-images"
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const result = await uploadFileToSupabase({
      bucketName,
      file,
      allowedTypes: ["image/*"],
      maxSizeMB: 5,
    })

    if (result.success && result.url) {
      setter(result.url)
    } else {
      throw new Error(result.error || "Gagal mengupload gambar.")
    }
  }

  // Media File Upload Handler (Audio / Video / Image)
  const handleMediaFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void,
    bucketName: string = "session-media"
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    let allowedTypes = ["image/*", "audio/*", "video/*"]
    let maxSizeMB = 25

    if (file.type.startsWith("image/")) {
      allowedTypes = ["image/*"]
      maxSizeMB = 5
    } else if (file.type.startsWith("audio/")) {
      allowedTypes = ["audio/*"]
      maxSizeMB = 25
    } else if (file.type.startsWith("video/")) {
      allowedTypes = ["video/*"]
      maxSizeMB = 50
    }

    const result = await uploadFileToSupabase({
      bucketName,
      file,
      allowedTypes,
      maxSizeMB,
    })

    if (result.success && result.url) {
      setter(result.url)
    } else {
      throw new Error(result.error || "Gagal mengupload file media.")
    }
  }

  // Modul Handlers
  const handleOpenAddModule = () => {
    setEditingModule(null)
    setModuleForm({
      module_number: `Modul 0${modules.length + 1}`,
      title: "",
      subtitle: "",
      desc_text: "",
      badge: "Kurikulum Utama MBPP",
      badge_color: BADGE_COLOR_PRESETS[0].value,
      image_url: "/images/module-01.png",
      order_index: String(modules.length + 1),
    })
    setShowModuleModal(true)
  }

  const handleOpenEditModule = (mod: any) => {
    setEditingModule(mod)
    setModuleForm({
      module_number: mod.module_number || `Modul 0${mod.id}`,
      title: mod.title || "",
      subtitle: mod.subtitle || "",
      desc_text: mod.desc_text || "",
      badge: mod.badge || "",
      badge_color: mod.badge_color || BADGE_COLOR_PRESETS[0].value,
      image_url: mod.image_url || "/images/module-01.png",
      order_index: String(mod.order_index || 1),
    })
    setShowModuleModal(true)
  }

  const handleSaveModule = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        module_number: moduleForm.module_number || `Modul 0${modules.length + 1}`,
        title: moduleForm.title,
        subtitle: moduleForm.subtitle,
        desc_text: moduleForm.desc_text,
        badge: moduleForm.badge,
        badge_color: moduleForm.badge_color,
        image_url: moduleForm.image_url,
        order_index: parseInt(moduleForm.order_index, 10) || 1,
      }

      if (editingModule) {
        const { error } = await supabase.from("modules").update(payload).eq("id", editingModule.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("modules").insert([payload])
        if (error) throw error
      }
      setShowModuleModal(false)
      fetchDbData()
    } catch (err: any) {
      alert("Error saat menyimpan modul: " + err.message)
    }
  }

  const handleDeleteModule = async (id: number) => {
    if (!confirm("Hapus modul ini beserta seluruh pertemuannya?")) return
    try {
      const { error } = await supabase.from("modules").delete().eq("id", id)
      if (error) throw error
      fetchDbData()
    } catch (err: any) {
      alert("Error menghapus modul: " + err.message)
    }
  }

  // Pertemuan Handlers
  const handleOpenAddPertemuan = (defaultModId?: string) => {
    setEditingPertemuan(null)
    const targetModId = defaultModId || (modules.length > 0 ? String(modules[0].id) : "1")
    setPertemuanForm({
      module_id: targetModId,
      pertemuan_number: `Pertemuan 0${pertemuan.length + 1}`,
      title: "",
      subtitle: "",
      desc_text: "",
      duration: "130 Menit",
      sessions_count: "3 Sesi",
      badge: `Pertemuan ${pertemuan.length + 1}: Topik Utama`,
      badge_color: BADGE_COLOR_PRESETS[0].value,
      image_url: "/images/module-01.png",
      order_index: String(pertemuan.length + 1),
    })
    setShowPertemuanModal(true)
  }

  const handleOpenEditPertemuan = (p: any) => {
    setEditingPertemuan(p)
    setPertemuanForm({
      module_id: String(p.module_id || "1"),
      pertemuan_number: p.pertemuan_number || "",
      title: p.title || "",
      subtitle: p.subtitle || "",
      desc_text: p.desc_text || "",
      duration: p.duration || "130 Menit",
      sessions_count: p.sessions_count || "3 Sesi",
      badge: p.badge || "",
      badge_color: p.badge_color || BADGE_COLOR_PRESETS[0].value,
      image_url: p.image_url || "/images/module-01.png",
      order_index: String(p.order_index || 1),
    })
    setShowPertemuanModal(true)
  }

  const handleSavePertemuan = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        module_id: parseInt(pertemuanForm.module_id, 10) || 1,
        pertemuan_number: pertemuanForm.pertemuan_number,
        title: pertemuanForm.title,
        subtitle: pertemuanForm.subtitle,
        desc_text: pertemuanForm.desc_text,
        duration: pertemuanForm.duration,
        sessions_count: pertemuanForm.sessions_count,
        badge: pertemuanForm.badge,
        badge_color: pertemuanForm.badge_color,
        image_url: pertemuanForm.image_url,
        order_index: parseInt(pertemuanForm.order_index, 10) || 1,
      }

      if (editingPertemuan) {
        const { error } = await supabase.from("pertemuan").update(payload).eq("id", editingPertemuan.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("pertemuan").insert([payload])
        if (error) throw error
      }
      setShowPertemuanModal(false)
      fetchDbData()
    } catch (err: any) {
      if (err?.message?.includes("schema cache") || err?.message?.includes("public.pertemuan")) {
        alert(
          "⚠️ TABEL SUPABASE 'pertemuan' BELUM DIBUAT!\n\n" +
          "Pesan Error: " + err.message + "\n\n" +
          "Solusi Cepat (1 Menit):\n" +
          "1. Buka Supabase Dashboard (https://supabase.com/dashboard/project/rogoaopcfbhjwubrtevl/sql/new)\n" +
          "2. Buka file 'supabase_complete_schema.sql' di folder proyek ini\n" +
          "3. Salin seluruh teks SQL, paste ke SQL Editor, lalu klik 'Run'.\n" +
          "4. Refresh halaman admin ini."
        )
      } else {
        alert("Error saat menyimpan pertemuan: " + err.message)
      }
    }
  }

  const handleDeletePertemuan = async (id: number) => {
    if (!confirm("Hapus pertemuan ini beserta seluruh sesinya?")) return
    try {
      const { error } = await supabase.from("pertemuan").delete().eq("id", id)
      if (error) throw error
      fetchDbData()
    } catch (err: any) {
      alert("Error menghapus pertemuan: " + err.message)
    }
  }

  // Helper parsing questions & array steps
  const parseQuestions = (rawQuestions: any): any[] => {
    if (!rawQuestions) return []
    if (Array.isArray(rawQuestions)) return rawQuestions
    if (typeof rawQuestions === "string") {
      try {
        const parsed = JSON.parse(rawQuestions)
        if (Array.isArray(parsed)) return parsed
      } catch (e) {
        return [rawQuestions]
      }
    }
    return []
  }

  // Sesi Handlers
  const handleOpenAddSesi = (defaultPertemuanId?: string) => {
    setEditingSesi(null)
    const targetPId = defaultPertemuanId || (pertemuan.length > 0 ? String(pertemuan[0].id) : "1")
    const targetP = pertemuan.find((p) => String(p.id) === String(targetPId))
    setSesiForm({
      pertemuan_id: targetPId,
      module_id: targetP ? String(targetP.module_id) : "1",
      title: "",
      subtitle: "",
      desc_text: "",
      has_text_instruction: true,
      instruction_steps: [],
      image_url: "",
      image_title: "",
      content_order: DEFAULT_BLOCK_ORDER,
      has_slogan_banner: false,
      has_participant_name: true,
      audio_url: "",
      audio_title: "",
      video_url: "",
      slogan: "",
      character_strength: "",
      has_breathing_visualizer: false,
      has_habit_tracker: false,
      has_gratitude_journal: false,
      has_smart_goal: false,
      has_self_checkin: false,
      reflection_title: "Refleksi Aktivitas 1",
      reflection_subtitle: "",
      reflection_questions: [],
      order_index: String(interventions.length + 1),
    })
    setShowSesiModal(true)
  }

  const handleOpenEditSesi = (s: any) => {
    setEditingSesi(s)
    const parsedOrder = parseQuestions(s.content_order)
    const mergedOrder = Array.from(
      new Set([...(parsedOrder.length > 0 ? parsedOrder : DEFAULT_BLOCK_ORDER), ...DEFAULT_BLOCK_ORDER])
    )
    const isGratitudeAuto = Boolean(
      s.has_gratitude_journal ||
      s.title?.toLowerCase().includes("jurnal syukur") ||
      s.title?.toLowerCase().includes("gratitude") ||
      s.subtitle?.toLowerCase().includes("jurnal syukur")
    )
    setSesiForm({
      pertemuan_id: String(s.pertemuan_id || "1"),
      module_id: String(s.module_id || "1"),
      title: s.title || "",
      subtitle: s.subtitle || "",
      desc_text: s.desc_text || "",
      has_text_instruction: s.has_text_instruction !== false,
      instruction_steps: parseQuestions(s.instruction_steps) as string[],
      image_url: s.image_url || "",
      image_title: s.image_title || "",
      content_order: mergedOrder,
      has_slogan_banner: Boolean(s.has_slogan_banner),
      has_participant_name: s.has_participant_name !== false,
      audio_url: s.audio_url || "",
      audio_title: s.audio_title || "",
      video_url: s.video_url || "",
      slogan: s.slogan || "",
      character_strength: s.character_strength || s.characterStrength || "",
      has_breathing_visualizer: Boolean(s.has_breathing_visualizer),
      has_habit_tracker: Boolean(s.has_habit_tracker),
      has_gratitude_journal: isGratitudeAuto,
      has_smart_goal: Boolean(s.has_smart_goal),
      has_self_checkin: Boolean(s.has_self_checkin),
      reflection_title: s.reflection_title || "Refleksi Aktivitas 1",
      reflection_subtitle: s.reflection_subtitle || "",
      reflection_questions: parseQuestions(s.reflection_questions),
      order_index: String(s.order_index || 1),
    })
    setShowSesiModal(true)
  }

  const handleSaveSesi = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const targetPId = parseInt(sesiForm.pertemuan_id, 10) || 1
      const targetP = pertemuan.find((p) => Number(p.id) === Number(targetPId))

      const payload = {
        pertemuan_id: targetPId,
        module_id: targetP ? Number(targetP.module_id) : 1,
        title: sesiForm.title,
        subtitle: sesiForm.subtitle,
        desc_text: sesiForm.has_text_instruction ? sesiForm.desc_text : "",
        has_text_instruction: sesiForm.has_text_instruction,
        instruction_steps: sesiForm.instruction_steps,
        image_url: sesiForm.image_url,
        image_title: sesiForm.image_title,
        content_order: sesiForm.content_order,
        has_slogan_banner: sesiForm.has_slogan_banner,
        has_participant_name: sesiForm.has_participant_name,
        audio_url: sesiForm.audio_url,
        audio_title: sesiForm.audio_title || "Audio Panduan Suara MBPP",
        video_url: sesiForm.video_url,
        slogan: sesiForm.slogan,
        character_strength: sesiForm.character_strength,
        has_breathing_visualizer: sesiForm.has_breathing_visualizer,
        has_habit_tracker: sesiForm.has_habit_tracker,
        has_gratitude_journal: sesiForm.has_gratitude_journal,
        has_smart_goal: sesiForm.has_smart_goal,
        has_self_checkin: sesiForm.has_self_checkin,
        reflection_title: sesiForm.reflection_title,
        reflection_subtitle: sesiForm.reflection_subtitle,
        reflection_questions: sesiForm.reflection_questions,
        order_index: parseInt(sesiForm.order_index, 10) || 1,
      }

      if (editingSesi) {
        const { error } = await supabase.from("interventions").update(payload).eq("id", editingSesi.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("interventions").insert([payload])
        if (error) throw error
      }
      setShowSesiModal(false)
      fetchDbData()
    } catch (err: any) {
      if (err?.message?.includes("schema cache") || err?.message?.includes("public.interventions")) {
        alert(
          "⚠️ TABEL SUPABASE 'interventions' BELUM DIBUAT!\n\n" +
          "Pesan Error: " + err.message + "\n\n" +
          "Solusi Cepat (1 Menit):\n" +
          "1. Buka Supabase Dashboard (https://supabase.com/dashboard/project/rogoaopcfbhjwubrtevl/sql/new)\n" +
          "2. Buka file 'supabase_complete_schema.sql' di folder proyek ini\n" +
          "3. Salin seluruh teks SQL, paste ke SQL Editor, lalu klik 'Run'.\n" +
          "4. Refresh halaman admin ini."
        )
      } else {
        alert("Error saat menyimpan sesi: " + err.message)
      }
    }
  }

  const handleDeleteSesi = async (id: number) => {
    if (!confirm("Hapus sesi ini?")) return
    try {
      const { error } = await supabase.from("interventions").delete().eq("id", id)
      if (error) throw error
      fetchDbData()
    } catch (err: any) {
      alert("Error menghapus sesi: " + err.message)
    }
  }

  // Filter Search
  const filteredModules = modules.filter((m) =>
    searchQuery ? m.title?.toLowerCase().includes(searchQuery.toLowerCase()) || m.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) : true
  )

  const filteredPertemuan = pertemuan.filter((p) => {
    const matchesSearch = searchQuery
      ? p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || p.pertemuan_number?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    const matchesModuleFilter = selectedModuleFilter !== "all" ? String(p.module_id) === selectedModuleFilter : true
    return matchesSearch && matchesModuleFilter
  })

  const filteredInterventions = interventions.filter((s) => {
    const matchesSearch = searchQuery ? s.title?.toLowerCase().includes(searchQuery.toLowerCase()) || s.desc_text?.toLowerCase().includes(searchQuery.toLowerCase()) : true
    const matchesPertemuanFilter = selectedPertemuanFilter !== "all" ? String(s.pertemuan_id) === selectedPertemuanFilter : true
    return matchesSearch && matchesPertemuanFilter
  })

  const filteredJournals = journals.filter((j) =>
    searchQuery ? j.participant_name?.toLowerCase().includes(searchQuery.toLowerCase()) || j.journal_text?.toLowerCase().includes(searchQuery.toLowerCase()) : true
  )

  return (
    <main className="min-h-screen bg-[#FAF8F5] overflow-hidden">
      <Navbar />

      {/* Header Banner */}
      <AdminHeader
        loading={loading}
        onRefresh={fetchDbData}
        onAddModule={handleOpenAddModule}
      />

      {/* Navigation Console */}
      <section className="relative px-6 py-10 max-w-6xl mx-auto">
        <AdminTabs
          activeView={activeView}
          setActiveView={setActiveView}
          modulesCount={modules.length}
          pertemuanCount={pertemuan.length}
          sessionsCount={interventions.length}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* View Contents */}
        <AnimatePresence mode="wait">
          {activeView === "modules" && (
            <ModulesView
              modules={filteredModules}
              pertemuan={pertemuan}
              onAddModule={handleOpenAddModule}
              onEditModule={handleOpenEditModule}
              onDeleteModule={handleDeleteModule}
              onAddPertemuan={handleOpenAddPertemuan}
              onNavigateToSessions={(pertemuanId) => {
                setSelectedPertemuanFilter(pertemuanId)
                setActiveView("sessions")
              }}
            />
          )}

          {activeView === "pertemuan" && (
            <PertemuanView
              pertemuan={filteredPertemuan}
              modules={modules}
              interventions={interventions}
              onAddPertemuan={handleOpenAddPertemuan}
              onEditPertemuan={handleOpenEditPertemuan}
              onDeletePertemuan={handleDeletePertemuan}
              onAddSesi={handleOpenAddSesi}
              onEditSesi={handleOpenEditSesi}
              onDeleteSesi={handleDeleteSesi}
            />
          )}

          {activeView === "sessions" && (
            <SessionsView
              interventions={filteredInterventions}
              pertemuan={pertemuan}
              onAddSesi={handleOpenAddSesi}
              onEditSesi={handleOpenEditSesi}
              onDeleteSesi={handleDeleteSesi}
            />
          )}

          {activeView === "journals" && (
            <JournalsView journals={filteredJournals} />
          )}
        </AnimatePresence>
      </section>

      {/* Modals */}
      <ModuleModal
        isOpen={showModuleModal}
        onClose={() => setShowModuleModal(false)}
        editingModule={editingModule}
        moduleForm={moduleForm}
        setModuleForm={setModuleForm}
        onSave={handleSaveModule}
        handleImageUpload={handleImageUpload}
      />

      <PertemuanModal
        isOpen={showPertemuanModal}
        onClose={() => setShowPertemuanModal(false)}
        editingPertemuan={editingPertemuan}
        pertemuanForm={pertemuanForm}
        setPertemuanForm={setPertemuanForm}
        modules={modules}
        onSave={handleSavePertemuan}
        handleImageUpload={handleImageUpload}
      />

      <SesiModal
        isOpen={showSesiModal}
        onClose={() => setShowSesiModal(false)}
        editingSesi={editingSesi}
        sesiForm={sesiForm}
        setSesiForm={setSesiForm}
        pertemuan={pertemuan}
        onSave={handleSaveSesi}
        handleMediaFileUpload={handleMediaFileUpload}
      />

      <Footer />
    </main>
  )
}
