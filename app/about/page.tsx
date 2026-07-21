"use client"

import { useState } from "react"
import { Navbar } from "@/components/common/navbar"
import { Footer } from "@/components/common/footer"
import { TeamworkSection } from "@/components/sections/about/teamwork-section"
import { DeveloperSection } from "@/components/sections/about/developer-section"
import { Mail, Landmark, MessageSquare, Send, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 12,
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function AboutPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    institution: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormState({ name: "", email: "", institution: "", message: "" })
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-[#FBF6ED] overflow-hidden">
      <Navbar />

      {/* Hero Header Banner */}
      <section className="relative bg-gradient-to-br from-[#2a1845] to-[#1a0f2d] pt-36 pb-20 px-6 text-center">
        {/* Glow effect */}
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
          <p className="mb-3 font-script text-2xl text-[#f5c6d0] drop-shadow-sm animate-pulse">
            Scientific Initiative & Collaborative Research
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            About the Project
          </h1>
        </motion.div>
      </section>

      {/* About MBPP Intro Section */}
      <section id="about-mbpp" className="relative bg-white px-6 py-20 scroll-mt-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p variants={fadeInUp} className="mb-2 text-[10px] font-bold tracking-widest text-[#7c4fd4] uppercase">
            Introduction
          </motion.p>
          <motion.h2 variants={fadeInUp} className="mb-6 font-serif text-3xl font-bold text-[#2a1845] md:text-4xl">
            Mengenal MBPP lebih Dekat
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm md:text-base leading-relaxed text-foreground/80 mb-6">
            **Mindfulness-Based Psychoeducation Programme (MBPP)** lahir dari kegelisahan akademis akan masifnya penetrasi teknologi AI dalam keseharian Generasi Z. Interaksi tanpa jeda dengan AI seringkali melumpuhkan kemampuan kognitif orisinal dan memicu ketergantungan psikologis yang mendalam (*AI intimacy*).
          </motion.p>
          <motion.p variants={fadeInUp} className="text-sm md:text-base leading-relaxed text-foreground/80">
            Penelitian eksperimental ini merumuskan intervensi psikoedukasi berbasis kesadaran diri (*mindfulness*) yang dikombinasikan dengan asesmen kepribadian *Big Five*. Tujuannya adalah membantu individu mengenali kelemahan psikologis unik mereka saat berinteraksi dengan AI dan melatih kembali kedaulatan kognitif mereka (*cognitive agency*).
          </motion.p>
        </motion.div>
      </section>

      {/* Research Foundations (Background, Objectives, Methodology, About Platform) */}
      <TeamworkSection />

      {/* Research Information Section */}
      <section id="research-info" className="relative bg-white px-6 py-20 scroll-mt-20">
        {/* Fade transition */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FBF6ED] to-white" />

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="mb-2 text-[10px] font-bold tracking-widest text-[#7c4fd4] uppercase">
              Scientific Outline
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#2a1845] md:text-4xl">
              Informasi Penelitian
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4"
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-2xl border border-border bg-[#FBF6ED]/30 transition-all duration-300"
            >
              <h3 className="text-base font-bold text-[#2a1845] mb-3 flex items-center gap-2">
                <Landmark className="h-5 w-5 text-[#7c4fd4]" />
                Latar Akademik & Etika
              </h3>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Penelitian ini mematuhi standar etika penelitian psikologis yang ketat. Seluruh data partisipan dianonimkan secara penuh, digunakan hanya untuk keperluan analisis ilmiah, serta dilindungi menggunakan protokol enkripsi standar industri.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-6 rounded-2xl border border-border bg-[#FBF6ED]/30 transition-all duration-300"
            >
              <h3 className="text-base font-bold text-[#2a1845] mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#7c4fd4]" />
                Kolaborasi Lintas Ilmu
              </h3>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Riset ini terwujud berkat kolaborasi erat antara pakar psikologi klinis, peneliti sosial kognitif, serta praktisi teknologi informasi untuk menjamin bahwa modul intervensi tidak hanya berdasar teori psikologi yang matang melainkan juga responsif terhadap lanskap teknologi terkini.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Research Team (DeveloperSection) */}
      <DeveloperSection />

      {/* Contact Section */}
      <section id="contact" className="relative bg-[#FBF6ED] px-6 py-20 scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="mb-3 font-script text-3xl text-primary">Get in Touch</p>
            <h2 className="font-serif text-3xl font-bold text-[#2a1845] md:text-4xl">
              Hubungi Kami
            </h2>
            <p className="mt-2 text-xs text-foreground/70 leading-relaxed max-w-md mx-auto">
              Apakah Anda institusi pendidikan, peneliti, atau mahasiswa yang tertarik berkolaborasi dengan program MBPP? Silakan kirimkan pesan Anda.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 12 }}
            className="rounded-3xl border border-[#e8e0f7] bg-white p-8 shadow-lg shadow-purple-950/5 min-h-[320px] flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-10 text-center w-full"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.1 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4"
                  >
                    <CheckCircle2 className="h-8 w-8" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-[#2a1845] mb-2">Pesan Berhasil Terkirim!</h3>
                  <p className="text-xs text-foreground/60 max-w-sm">
                    Terima kasih atas tanggapan Anda. Tim kami akan segera meninjau pesan Anda dan membalas melalui email secepatnya.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5 w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-[#2a1845]">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Masukkan nama lengkap"
                        className="rounded-xl border border-border bg-[#FBF6ED]/20 px-4 py-2.5 text-xs text-foreground outline-none focus:border-[#7c4fd4] focus:ring-1 focus:ring-[#7c4fd4] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-[#2a1845] flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="contoh@domain.com"
                        className="rounded-xl border border-border bg-[#FBF6ED]/20 px-4 py-2.5 text-xs text-foreground outline-none focus:border-[#7c4fd4] focus:ring-1 focus:ring-[#7c4fd4] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Institution */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="institution" className="text-xs font-bold text-[#2a1845]">
                      Institusi / Universitas
                    </label>
                    <input
                      type="text"
                      id="institution"
                      value={formState.institution}
                      onChange={(e) => setFormState({ ...formState, institution: e.target.value })}
                      placeholder="Nama Universitas atau Organisasi Anda"
                      className="rounded-xl border border-border bg-[#FBF6ED]/20 px-4 py-2.5 text-xs text-foreground outline-none focus:border-[#7c4fd4] focus:ring-1 focus:ring-[#7c4fd4] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-[#2a1845]">
                      Pesan Anda
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                      className="rounded-xl border border-border bg-[#FBF6ED]/20 px-4 py-2.5 text-xs text-foreground outline-none focus:border-[#7c4fd4] focus:ring-1 focus:ring-[#7c4fd4] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7c4fd4] to-[#5e35b8] py-3 text-xs font-bold text-white shadow-md shadow-purple-200 hover:shadow-lg transition-all duration-300"
                  >
                    Kirim Pesan
                    <Send className="h-3.5 w-3.5" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
