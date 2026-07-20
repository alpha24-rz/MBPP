import { Brain, Sparkles, Compass } from "lucide-react"

export function HomeSection() {
  return (
    <section id="what-is-mbpp" className="relative flex flex-col items-center bg-[#FBF6ED] px-6 py-28 text-center scroll-mt-20">
      {/* Background gradient fade from hero */}
      <div className="pointer-events-none absolute left-0 top-0 -mt-40 h-40 w-full bg-gradient-to-t from-[#FBF6ED] to-transparent" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <p className="mb-3 font-script text-3xl text-primary">What is MBPP?</p>
        <h2 className="mb-8 font-serif text-3xl font-bold leading-tight text-[#2a1845] md:text-4xl lg:text-5xl">
          Mindfulness-Based Psychoeducation Programme
        </h2>
        <p className="mb-16 max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-base">
          MBPP adalah sebuah program psikoedukasi berbasis ilmiah yang dirancang khusus untuk membantu Generasi Z membangun hubungan yang lebih sehat dan berkesadaran dengan teknologi Kecerdasan Buatan (AI). Kami memadukan pendekatan kesadaran diri (Mindfulness) dengan pemahaman psikologis kerangka Big Five Personality.
        </p>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full mt-4">
          
          {/* Pillar 1 */}
          <div className="flex flex-col p-6 rounded-2xl border border-border/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0e8fb] text-[#7c4fd4] mb-5">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-[#2a1845] mb-3">Mindfulness Practice</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Melatih kemampuan untuk sadar secara penuh saat menggunakan AI, mengenali dorongan impulsif, serta mengelola kecemasan kognitif di dunia digital.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col p-6 rounded-2xl border border-border/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0e8fb] text-[#7c4fd4] mb-5">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-[#2a1845] mb-3">Big Five Personality</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Memahami bagaimana karakteristik kepribadian unik Anda (seperti kecenderungan Neuroticism atau Openness) memengaruhi pola interaksi Anda dengan AI.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col p-6 rounded-2xl border border-border/60 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0e8fb] text-[#7c4fd4] mb-5">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-[#2a1845] mb-3">Responsible AI Literacy</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Membangun kecerdasan digital untuk memanfaatkan AI secara produktif sebagai asisten kolaboratif, tanpa kehilangan kemandirian berpikir kritis Anda.
            </p>
          </div>

        </div>

        {/* Informative highlight */}
        <div className="mt-16 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-6 py-2 text-xs font-semibold text-primary tracking-wide">
          <span>🎯 Tujuan Utama:</span>
          <span className="text-foreground/80 font-medium">Meningkatkan kesejahteraan mental & efikasi diri digital Gen Z</span>
        </div>
      </div>
    </section>
  )
}
