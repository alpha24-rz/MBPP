"use client"

import dynamic from "next/dynamic"
import { Sparkles, Layers, Palette, ArrowRight } from "lucide-react"
import { motion, type Variants } from "framer-motion"

const CopilotCharacter = dynamic(
  () => import("@/components/ui/copilot-character").then((mod) => mod.CopilotCharacter),
  { ssr: false }
)

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
    },
  },
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-white">
      {/* Blob ungu blur besar di atas, meleleh ke putih */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
        style={{
          width: "190%",
          height: "170%",
          background:
            "radial-gradient(ellipse 60% 65% at 50% 0%, #6d3fc9 0%, #7c4fd4 30%, #8b5fe0 50%, rgba(139,95,224,0.4) 70%, transparent 100%)",
          filter: "blur(80px)",
        }}
      />

      {/* Layer kedua, blur lebih kecil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.2 }}
        className="absolute left-1/2 -top-20 pointer-events-none"
        style={{
          width: "100%",
          height: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse 55% 60% at 50% 0%, #5e35b8 0%, #7248c9 40%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />

      {/* ===== Floating cards ===== */}
      <FloatingCard
        className="left-[6%] top-[60%] hidden md:flex"
        rotate={-8}
        delay={0}
        icon={<Sparkles className="h-5 w-5 text-[#7c4fd4]" />}
        title="AI Awareness"
        subtitle="Kenali pola pikirmu"
      />

      <FloatingCard
        className="left-[12%] top-[80%] hidden lg:flex"
        rotate={6}
        delay={1.2}
        icon={<Layers className="h-5 w-5 text-[#7c4fd4]" />}
        title="Big Five"
        subtitle="Kenali kepribadianmu"
      />

      {/* Kanan atas — Karakter 3D Copilot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring" as const,
          stiffness: 60,
          damping: 10,
          delay: 0.6,
        }}
        className="absolute right-[-10%] md:right-[-9%] lg:right-[-10%] xl:right-[-11%] top-[10%] md:top-[12%] lg:top-[10%] hidden md:flex flex-col items-center justify-center z-20 pointer-events-auto"
      >
        <div className="relative w-[360px] h-[360px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] xl:w-[540px] xl:h-[540px]">
          <div className="absolute inset-0 -z-10 rounded-full bg-[#7c4fd4]/30 blur-3xl" />
          <CopilotCharacter className="h-full w-full" />
        </div>
      </motion.div>

      <FloatingCard
        className="right-[8%] top-[78%] hidden lg:flex"
        rotate={-10}
        delay={1.2}
        icon={<Palette className="h-5 w-5 text-[#7c4fd4]" />}
        title="Self Reflection"
        subtitle="Latihan mindfulness"
      />

      {/* ===== Hero content ===== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center px-4 text-center my-20 max-w-4xl"
      >
        <motion.p
          variants={itemVariants}
          className="mb-4 font-script text-2xl text-[#f5c6d0] md:text-3xl drop-shadow-sm"
        >
          Mindfulness-Based Psychoeducation Programme
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="mb-6 font-serif text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl drop-shadow-md"
        >
          Build a Healthier Relationship with AI
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mb-8 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base drop-shadow-sm"
        >
          Platform edukasi berbasis penelitian yang mengintegrasikan Mindfulness dan kerangka Big Five Personality untuk membantu Generasi Z mengembangkan kesadaran diri, ketahanan emosional, serta penggunaan Artificial Intelligence (AI) secara bertanggung jawab.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/modules"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#5e35b8] shadow-xl shadow-purple-950/20 transition-all hover:bg-purple-50 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Mulai Kurikulum Modul MBPP"
          >
            <span>Mulai Kurikulum Modul</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#what-is-mbpp"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Pelajari Program MBPP"
          >
            <span>Pelajari Program</span>
          </a>
        </motion.div>
      </motion.div>


      <style jsx>{`
        @keyframes floatCard {
          0%,
          100% {
            transform: translateY(0px) rotate(var(--rotate));
          }
          50% {
            transform: translateY(-14px) rotate(var(--rotate));
          }
        }
      `}</style>
    </section>
  )
}

function FloatingCard({
  className = "",
  rotate = 0,
  delay = 0,
  icon,
  title,
  subtitle,
}: {
  className?: string
  rotate?: number
  delay?: number
  icon: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring" as const,
        stiffness: 60,
        damping: 10,
        delay: delay * 0.5 + 0.3,
      }}
      className={`absolute z-20 items-center gap-3 rounded-2xl border border-white/40 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-md ${className}`}
      style={
        {
          "--rotate": `${rotate}deg`,
          animation: `floatCard 5s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          transform: `rotate(${rotate}deg)`,
        } as React.CSSProperties
      }
      whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0e8fb]">
        {icon}
      </div>
      <div className="text-left">
        <p className="text-sm font-semibold text-[#2a1845]">{title}</p>
        <p className="text-xs text-[#5e35b8]/70">{subtitle}</p>
      </div>
    </motion.div>
  )
}
