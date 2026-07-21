"use client"

import { Sparkles, Layers, Palette, Pen } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
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

        transition={{ duration: 1.5 }}
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "190%",
          height: "170%",
          background:
            "radial-gradient(ellipse 60% 65% at 50% 0%, #6d3fc9 0%, #7c4fd4 30%, #8b5fe0 50%, rgba(139,95,224,0.4) 70%, transparent 100%)",
          filter: "blur(80px)",
        }}
      />

      {/* Layer kedua, blur lebih kecil, biar ada sedikit ketegasan warna di bagian atas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.2 }}
        className="absolute left-1/2 -top-20"
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

      {/* Kiri atas — agak besar, rotasi negatif */}
      <FloatingCard
        className="left-[6%] top-[60%] hidden md:flex"
        rotate={-8}
        delay={0}
        icon={<Sparkles className="h-5 w-5 text-[#7c4fd4]" />}
        title="AI Awareness"
        subtitle="Kenali pola pikirmu"
      />

      {/* Kiri bawah — kecil, rotasi positif, lebih ke bawah */}
      <FloatingCard
        className="left-[12%] top-[80%] hidden lg:flex"
        rotate={6}
        delay={1.2}
        icon={<Layers className="h-5 w-5 text-[#7c4fd4]" />}
        title="Big Five"
        subtitle="Kenali kepribadianmu"
      />

      {/* Kanan atas — kecil, rotasi kuat */}
      <FloatingCard
        className="right-[7%] top-[60%] hidden lg:flex"
        rotate={10}
        delay={0.6}
        icon={<Palette className="h-5 w-5 text-[#7c4fd4]" />}
        title="Self Reflection"
        subtitle="Latihan mindfulness"
      />

      {/* Kanan bawah — sedang, rotasi negatif ringan */}
      <FloatingCard
        className="right-[6%] top-[80%] hidden md:flex"
        rotate={-5}
        delay={1.8}
        icon={<Pen className="h-5 w-5 text-[#7c4fd4]" />}
        title="Journaling"
        subtitle="Tulis emosimu"
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
        type: "spring",
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
