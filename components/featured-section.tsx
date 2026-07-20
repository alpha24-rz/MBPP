"use client"

import Image from "next/image"
import { Sparkles, Clock, BookOpen, CheckCircle } from "lucide-react"

const moduleData = {
  id: 1,
  number: "Module 01",
  image: "/images/module-01.png",
  badge: "Foundational Intervention",
  badgeColor: "bg-violet-100 text-violet-700 border border-violet-200/50",
  title: "Mengenal Diri di Era AI",
  subtitle: "AI Awareness & Self-Discovery",
  desc: "Membangun landasan kesadaran diri sebagai titik awal perjalanan intervensi. Modul ini membimbing peserta untuk mengeksplorasi bagaimana profil kepribadian unik mereka — berdasarkan kerangka psikologis Big Five Personality — memengaruhi kecenderungan, motivasi, dan pola interaksi mereka dengan teknologi Artificial Intelligence (AI) sehari-hari.",
  topics: [
    { title: "Big Five Personality Framework", desc: "Memahami dimensi Openness, Conscientiousness, Extraversion, Agreeableness, dan Neuroticism dalam konteks digital." },
    { title: "AI Bias & Awareness", desc: "Menumbuhkan kepekaan kognitif terhadap respon otomatis dan ketergantungan psikologis pada hasil generate AI." },
    { title: "Self-Reflection Practice", desc: "Latihan mengenali motif personal dan melakukan refleksi mendalam mengenai otonomitas berpikir." }
  ],
  duration: "90 Menit",
  sessions: "1 Sesi Intervensi",
}

export function FeaturedSection() {
  return (
    <section id="featured-modules" className="relative bg-white px-6 py-28 scroll-mt-20">
      {/* Subtle top border fade from previous section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FBF6ED] to-white" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="mb-16 text-center md:text-left">
          <p className="mb-3 font-script text-3xl text-primary">Intervention Module</p>
          <h2 className="font-serif text-3xl font-bold leading-tight text-[#2a1845] md:text-4xl lg:text-5xl">
            Featured Learning Module
          </h2>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 border-4 border-white ring-1 ring-violet-100">
              <Image
                src={moduleData.image}
                alt={moduleData.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 z-10">
                <span className={`inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold backdrop-blur-md shadow-sm ${moduleData.badgeColor}`}>
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  {moduleData.badge}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Content Detail */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-[11px] font-bold tracking-widest text-[#7c4fd4] uppercase mb-2">
              {moduleData.number}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-[#2a1845] leading-tight mb-2">
              {moduleData.title}
            </h3>
            <p className="text-sm font-semibold italic text-[#7c4fd4]/80 mb-6">
              {moduleData.subtitle}
            </p>

            <p className="text-sm md:text-base text-[#2a1845]/80 leading-relaxed mb-8">
              {moduleData.desc}
            </p>

            {/* Key Topics List */}
            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-bold text-[#2a1845] tracking-wider uppercase mb-3">
                Key Learning Outcomes
              </h4>
              {moduleData.topics.map((topic, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-[#2a1845]">{topic.title}</h5>
                    <p className="text-xs text-[#2a1845]/70 leading-relaxed mt-0.5">{topic.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer metadata */}
            <div className="flex items-center gap-6 pt-6 border-t border-[#e0d6f5] text-xs font-semibold text-[#7c4fd4]">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {moduleData.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                {moduleData.sessions}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

