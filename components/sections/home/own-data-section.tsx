"use client"

import Image from "next/image"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 12 },
  },
}

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 50, damping: 14 },
  },
}

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 50, damping: 14 },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const challenges = [
  {
    title: "Ketergantungan Kognitif",
    desc: "Kecenderungan menyerahkan seluruh keputusan dan proses berpikir kreatif kepada AI, sehingga menurunkan ketajaman logika berpikir kritis.",
  },
  {
    title: "Ilusi Hubungan Emosional (AI Intimacy)",
    desc: "Terjebak dalam kedekatan semu (parasocial) dengan chatbot AI, yang berisiko mengurangi kualitas interaksi sosial di dunia nyata.",
  },
  {
    title: "Kecemasan & Kelelahan Informasi",
    desc: "Banjir output AI yang instan memicu kebiasaan serba cepat, menurunkan rentang perhatian (attention span), dan memicu burnout.",
  },
]

const solutions = [
  {
    title: "Kedaulatan Berpikir (Cognitive Agency)",
    desc: "Mengembalikan posisi Anda sebagai pengendali utama. AI digunakan sebagai alat bantu, sementara kreativitas dan keputusan tetap milik Anda.",
  },
  {
    title: "Regulasi Emosi & Interaksi Sadar",
    desc: "Latihan jeda sadar (mindful pause) untuk mengamati reaksi emosional Anda saat menggunakan teknologi dan menjaga batasan sehat.",
  },
  {
    title: "Efikasi Diri yang Disesuaikan",
    desc: "Pendekatan berbasis Big Five Personality membantu Anda memahami kelemahan serta kekuatan psikologis pribadi Anda dalam merespons AI.",
  },
]

/** Gallery-style corner brackets — the framing device used on the
 *  section's hero image, echoed by nothing else on the page so the
 *  photograph reads as a placed artifact, not a stock banner. */
function CornerMarks() {
  const corner = "absolute h-6 w-6 border-[#B08D57]"
  return (
    <>
      <span className={`${corner} left-4 top-4 border-l border-t`} />
      <span className={`${corner} right-4 top-4 border-r border-t`} />
      <span className={`${corner} bottom-4 left-4 border-b border-l`} />
      <span className={`${corner} bottom-4 right-4 border-b border-r`} />
    </>
  )
}

export function OwnDataSection() {
  return (
    <section id="why-mbpp" className="relative bg-[#F7F4EC] pb-28 scroll-mt-20">
      {/* Framed hero image */}
      <div className="relative h-[300px] w-full md:h-[450px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.15, opacity: 0.8 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/why-mbpp-harmony.png"
            alt="A person meditating with a glowing digital brain representing mindfulness and AI balance"
            fill
            className="object-cover object-center top-10 grayscale-[15%] contrast-[1.05]"
            priority
          />
          {/* Ink wash tying the photo into the palette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A22]/50 via-transparent to-[#1E2A22]/10" />
        </motion.div>

        <CornerMarks />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#F7F4EC] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#F7F4EC] to-transparent" />
      </div>

      <div className="mx-auto mt-12 max-w-5xl px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-16 text-center"
        >
          <motion.div variants={fadeInUp} className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#B08D57]/60" />
            <p className="font-script text-sm italic tracking-[0.2em] text-[#B08D57]">
              Why This Research Matters?
            </p>
            <span className="h-px w-8 bg-[#B08D57]/60" />
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="mb-6 font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-[#1E2A22] md:text-4xl lg:text-5xl"
          >
            Menghadapi Era AI dengan Kesadaran Penuh
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-sm leading-relaxed text-[#1E2A22]/70 md:text-base"
          >
            Interaksi tanpa batas dengan AI menghadirkan tantangan baru bagi
            kesehatan mental dan kemandirian berpikir. MBPP hadir sebagai
            jembatan ilmiah untuk memulihkan kontrol kognitif Anda.
          </motion.p>
        </motion.div>

        {/* Comparison ledger — one bordered artifact, split by a hairline,
            instead of two competing colored cards */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[28px] border border-[#1E2A22]/10 bg-[#1E2A22]/10 md:grid-cols-2">
          {/* Column 1: Tantangan */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideLeft}
            className="flex flex-col bg-[#FBF9F3] p-8 md:p-10"
          >
            <div className="mb-8 flex items-center gap-2 text-[#9A5A42]">
              <AlertCircle className="h-4 w-4" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em]">
                Tantangan Digital Saat Ini
              </p>
            </div>

            <div className="flex-1 space-y-7">
              {challenges.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9A5A42]" />
                  <div>
                    <h4 className="mb-1 text-sm font-semibold text-[#1E2A22]">
                      {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-[#1E2A22]/65">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Solusi */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideRight}
            className="flex flex-col bg-white p-8 md:p-10"
          >
            <div className="mb-8 flex items-center gap-2 text-[#B08D57]">
              <CheckCircle2 className="h-4 w-4" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em]">
                Solusi Melalui MBPP
              </p>
            </div>

            <div className="flex-1 space-y-7">
              {solutions.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#B08D57]/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
                  </span>
                  <div>
                    <h4 className="mb-1 text-sm font-semibold text-[#1E2A22]">
                      {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-[#1E2A22]/65">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}