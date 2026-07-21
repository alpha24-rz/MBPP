"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2, UserPlus, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { useAuth } from "@/lib/auth-context"

export default function RegisterPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  useEffect(() => {
    // Redirect if already logged in
    if (!authLoading && user) {
      router.push("/")
    }
  }, [user, authLoading, router])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !email.trim() || !password.trim()) return

    setLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
            role: "user",
          },
        },
      })

      if (error) {
        throw error
      }

      setSuccessMsg(
        "Pendaftaran berhasil! Silakan periksa kotak masuk email Anda untuk melakukan verifikasi akun jika diperlukan, lalu masuk."
      )
      
      // Clear forms
      setFullName("")
      setEmail("")
      setPassword("")

      // Wait a moment and redirect to login
      setTimeout(() => {
        router.push("/login")
      }, 5000)
    } catch (err: any) {
      console.error("Register error:", err)
      setErrorMsg(err.message || "Gagal melakukan registrasi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen w-full bg-[#13072E] flex items-center justify-center p-4 overflow-hidden font-sans">
      {/* Background gradients and blobs */}
      <div 
        className="absolute left-[-10%] top-[-10%] w-[50%] h-[50%] rounded-full opacity-35 filter blur-[80px]"
        style={{
          background: "radial-gradient(circle, #7c4fd4 0%, transparent 70%)"
        }}
      />
      <div 
        className="absolute right-[-10%] bottom-[-10%] w-[60%] h-[60%] rounded-full opacity-25 filter blur-[100px]"
        style={{
          background: "radial-gradient(circle, #2a1845 0%, transparent 70%)"
        }}
      />
      
      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 text-sm font-medium transition-all group duration-200"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          Kembali ke Beranda
        </Link>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl shadow-black/40"
        >
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white/90 to-purple-300 bg-clip-text text-transparent font-serif tracking-tight">
              Daftar Akun Baru
            </h1>
            <p className="text-white/60 text-xs mt-2.5">
              Mulai pelajari kedaulatan berpikir dan mitigasi ketergantungan AI.
            </p>
          </div>

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs leading-relaxed"
            >
              {errorMsg}
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs leading-relaxed"
            >
              {successMsg}
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Nama Lengkap Field */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-white/80 pl-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Budi Utomo"
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-purple-400 focus:bg-white/10 text-white rounded-2xl px-4 py-3.5 text-sm outline-none transition-all duration-200"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-white/80 pl-1">
                Alamat Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-purple-400 focus:bg-white/10 text-white rounded-2xl px-4 py-3.5 text-sm outline-none transition-all duration-200"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/80 pl-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  minLength={6}
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-purple-400 focus:bg-white/10 text-white rounded-2xl pl-4 pr-11 py-3.5 text-sm outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-purple-800 disabled:to-indigo-800 text-white font-semibold text-sm rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-600/35 border border-purple-500/20 mt-8"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <UserPlus className="h-4.5 w-4.5" />
                  Daftar Akun
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-8 pt-6 border-t border-white/5 text-xs text-white/50">
            Sudah memiliki akun?{" "}
            <Link 
              href="/login" 
              className="text-purple-300 hover:text-purple-200 font-semibold hover:underline transition-colors"
            >
              Masuk
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
