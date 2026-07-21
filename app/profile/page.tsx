"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { motion, AnimatePresence } from "framer-motion"
import { User, Mail, Calendar, BookOpen, LogOut, Loader2, Award, Clock } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading, signOut } = useAuth()
  const [journals, setJournals] = useState<any[]>([])
  const [loadingJournals, setLoadingJournals] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    async function fetchUserJournals() {
      if (!user) return
      
      const fullName = user.user_metadata?.full_name || ""
      if (!fullName) {
        setLoadingJournals(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from("journal_entries")
          .select("*")
          .eq("participant_name", fullName)
          .order("created_at", { ascending: false })

        if (!error && data) {
          setJournals(data)
        }
      } catch (err) {
        console.error("Gagal memuat jurnal profil:", err)
      } finally {
        setLoadingJournals(false)
      }
    }

    if (user) {
      fetchUserJournals()
    }
  }, [user])

  const handleLogout = async () => {
    await signOut()
    router.push("/")
  }

  if (authLoading || (!user && authLoading)) {
    return (
      <div className="min-h-screen bg-[#FBF6ED] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#7c4fd4] animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  const fullName = user.user_metadata?.full_name || "Peserta MBPP"
  const email = user.email || ""
  const initials = fullName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()

  return (
    <main className="min-h-screen bg-[#FBF6ED] overflow-hidden font-sans">
      <Navbar />

      {/* Profile Header Banner */}
      <section className="relative bg-gradient-to-br from-[#2a1845] to-[#1a0f2d] pt-36 pb-24 px-6 text-center">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[150%] h-[150%] pointer-events-none opacity-30"
          style={{
            background: "radial-gradient(circle at 50% 0%, #7c4fd4 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Avatar Initials */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 border-4 border-white/20 shadow-2xl flex items-center justify-center text-white text-3xl font-bold font-serif mb-6 hover:scale-105 transition-transform"
          >
            {initials}
          </motion.div>

          <motion.h1
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white font-serif tracking-tight"
          >
            {fullName}
          </motion.h1>

          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-white/60 text-sm mt-2 flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            {email}
          </motion.p>
        </div>
      </section>

      {/* Profile Details & Journals */}
      <section className="max-w-5xl mx-auto px-6 py-12 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar Info Card */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-xl shadow-purple-950/[0.02]"
            >
              <h3 className="text-base font-bold text-[#2a1845] mb-5 font-serif border-b pb-3 border-neutral-100 flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-[#7c4fd4]" />
                Ringkasan Program
              </h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center py-2.5 border-b border-neutral-50">
                  <span className="text-neutral-500">Total Refleksi</span>
                  <span className="font-bold text-[#2a1845] bg-[#7c4fd4]/10 text-[#7c4fd4] px-2.5 py-1 rounded-full text-[10px]">
                    {journals.length} Jurnal
                  </span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-neutral-50">
                  <span className="text-neutral-500">Status Akun</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-[10px] border border-emerald-100">
                    Aktif
                  </span>
                </div>
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-neutral-500">Bergabung</span>
                  <span className="font-semibold text-neutral-800">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    }) : "-"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full mt-6 py-3 border border-red-200 hover:bg-red-50 text-red-600 font-semibold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Keluar Aplikasi
              </button>
            </motion.div>
          </div>

          {/* Main Journals List Card */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="bg-white border border-neutral-200/80 rounded-3xl p-6 md:p-8 shadow-xl shadow-purple-950/[0.02] min-h-[400px]"
            >
              <h3 className="text-lg font-bold text-[#2a1845] mb-6 font-serif flex items-center gap-2.5">
                <BookOpen className="h-5 w-5 text-[#7c4fd4]" />
                Riwayat Jurnal Refleksi Anda
              </h3>

              {loadingJournals ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 text-[#7c4fd4] animate-spin" />
                  <p className="text-xs text-neutral-400 mt-3 font-medium">Memuat data jurnal...</p>
                </div>
              ) : journals.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-neutral-100 rounded-2xl flex flex-col items-center justify-center">
                  <BookOpen className="h-10 w-10 text-neutral-300 mb-3" />
                  <p className="text-sm font-bold text-[#2a1845] mb-1">Belum Ada Refleksi Jurnal</p>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto mb-5 leading-relaxed">
                    Anda belum mengirimkan refleksi modul. Selesaikan intervensi modul pertama Anda di kurikulum MBPP.
                  </p>
                  <button 
                    onClick={() => router.push("/modules")}
                    className="px-5 py-2.5 text-xs font-semibold text-white rounded-xl bg-primary hover:bg-primary/95 transition-all shadow-md shadow-primary/20"
                  >
                    Buka Kurikulum Modul
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence>
                    {journals.map((journal, idx) => (
                      <motion.div
                        key={journal.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-5 rounded-2xl border border-neutral-100 bg-[#FBF6ED]/15 hover:bg-[#FBF6ED]/30 hover:border-purple-200 transition-all duration-200 shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3.5 pb-2.5 border-b border-neutral-100/60">
                          <div>
                            <span className="text-[10px] font-bold text-[#7c4fd4] uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100/50">
                              {journal.intervention_title}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium">
                            <Clock className="h-3 w-3" />
                            {new Date(journal.created_at).toLocaleString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </div>
                        </div>
                        <p className="text-xs text-neutral-700 leading-relaxed font-sans whitespace-pre-line">
                          {journal.journal_text}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
