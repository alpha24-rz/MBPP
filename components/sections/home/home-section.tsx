"use client"

import { useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 14 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14 },
  },
}

const pillars = [
  {
    mark: "M",
    title: "Mindfulness Practice",
    body: "Melatih kemampuan untuk sadar secara penuh saat menggunakan AI, mengenali dorongan impulsif, serta mengelola kecemasan kognitif di dunia digital.",
  },
  {
    mark: "P",
    title: "Big Five Personality",
    body: "Memahami bagaimana karakteristik kepribadian unik Anda — seperti kecenderungan Neuroticism atau Openness — memengaruhi pola interaksi Anda dengan AI.",
  },
  {
    mark: "L",
    title: "Responsible AI Literacy",
    body: "Membangun kecerdasan digital untuk memanfaatkan AI secara produktif sebagai asisten kolaboratif, tanpa kehilangan kemandirian berpikir kritis Anda.",
  },
]

/** Concentric "breathing" rings — the section's signature motif.
 *  A slow inhale/exhale pulse that ties mindfulness (breath) to the
 *  Big Five's layered-trait structure (rings within rings). */
function BreathingRings() {
  const reduceMotion = useReducedMotion()
  return (
    <svg
      viewBox="0 0 240 240"
      className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 opacity-[0.35] md:h-72 md:w-72"
      aria-hidden="true"
    >
      {[96, 74, 52].map((r, i) => (
        <motion.circle
          key={r}
          cx="120"
          cy="120"
          r={r}
          fill="none"
          stroke="#B08D57"
          strokeWidth="0.75"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={
            reduceMotion
              ? { scale: 1, opacity: 0.5 }
              : { scale: [1, 1.06, 1], opacity: [0.5, 0.75, 0.5] }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}
    </svg>
  )
}

export function HomeSection() {
  return (
    <section
      id="what-is-mbpp"
      className="relative flex flex-col items-center overflow-hidden bg-[#F7F4EC] px-6 py-28 text-center scroll-mt-20"
    >
      {/* Background gradient fade from hero */}
      <div className="pointer-events-none absolute left-0 top-0 -mt-40 h-40 w-full bg-gradient-to-t from-[#F7F4EC] to-transparent" />

      <BreathingRings />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mx-auto flex max-w-4xl flex-col items-center"
      >
        {/* Eyebrow with hairline rule */}
        <motion.div variants={fadeInUp} className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-[#B08D57]/60" />
          <p className="font-script text-sm italic tracking-[0.2em] text-[#B08D57]">
            What is MBPP?
          </p>
          <span className="h-px w-8 bg-[#B08D57]/60" />
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="mb-8 font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-[#1E2A22] md:text-4xl lg:text-5xl"
        >
          Mindfulness-Based Psychoeducation Programme
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mb-16 max-w-2xl text-sm leading-relaxed text-[#1E2A22]/70 md:text-base"
        >
          MBPP adalah program psikoedukasi berbasis ilmiah yang dirancang khusus
          untuk membantu Generasi Z membangun hubungan yang lebih sehat dan
          berkesadaran dengan teknologi Kecerdasan Buatan (AI) — memadukan
          pendekatan kesadaran diri (Mindfulness) dengan kerangka psikologis
          Big Five Personality.
        </motion.p>

        {/* Core Pillars */}
        <motion.div
          variants={staggerContainer}
          className="grid w-full grid-cols-1 gap-px overflow-hidden rounded-[28px] border border-[#1E2A22]/10 bg-[#1E2A22]/10 text-left md:grid-cols-3"
        >
          {pillars.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeInUp}
              className="group relative flex flex-col bg-[#FBF9F3] p-8 transition-colors duration-300 hover:bg-white"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-[#B08D57]/50 font-serif text-base text-[#B08D57]">
                {p.mark}
              </div>
              <h3 className="mb-1 text-lg font-bold text-[#1E2A22]">
                {p.title}
              </h3>
              <span className="mb-4 h-px w-6 origin-left scale-x-100 bg-[#B08D57]/60 transition-all duration-500 group-hover:w-12" />
              <p className="text-sm leading-relaxed text-[#1E2A22]/65">
                {p.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission statement — treated as a certification line, not a badge */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 border-y border-[#B08D57]/30 px-6 py-4"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B08D57]">
            Tujuan Utama
          </p>
          <p className="mt-1 text-sm font-medium text-[#1E2A22]/80 md:text-base">
            Meningkatkan kesejahteraan mental &amp; efikasi diri digital Gen Z
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}