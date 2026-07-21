"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

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

export function CtaSection() {
  return (
    <section id="cta" className="relative bg-[#FBF6ED] px-6 pb-28 scroll-mt-20">
      {/* Subtle fade from previous section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className="relative overflow-hidden rounded-3xl border border-[#e8e0f7] bg-gradient-to-br from-[#2a1845] to-[#1a0f2d] px-8 py-16 text-center shadow-xl shadow-purple-950/20 md:px-16 md:py-20"
        >
          
          {/* Decorative background blurs */}
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Icon Badge */}
            <motion.div
              variants={fadeInUp}
              className="relative z-10 mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
            >
              <Sparkles className="h-6 w-6 text-[#b79ef0]" />
            </motion.div>

            {/* Heading & Subheading */}
            <motion.h2 variants={fadeInUp} className="relative z-10 mb-6 font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Siap Melatih Kedaulatan Kognitif Anda?
            </motion.h2>
            <motion.p variants={fadeInUp} className="relative z-10 mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
              Mulai perjalanan psikoedukasi terstruktur untuk mengenali bagaimana kepribadian unik Anda memengaruhi interaksi dengan AI, serta bangun kebiasaan digital yang lebih sehat hari ini.
            </motion.p>

            {/* Button Group */}
            <motion.div variants={fadeInUp} className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/modules"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#2a1845] shadow-md transition-all duration-300 hover:scale-105 hover:bg-neutral-50"
              >
                Mulai Belajar Sekarang
                <ArrowRight className="h-4 w-4 text-[#2a1845] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                <BookOpen className="h-4 w-4 text-white/80" />
                Pelajari Riset MBPP
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
