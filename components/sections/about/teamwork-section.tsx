import { HelpCircle, Target, Compass, Share2 } from "lucide-react"

const pillars = [
  {
    icon: HelpCircle,
    color: "bg-amber-100 text-amber-700",
    title: "Mengapa Riset Ini Dilakukan?",
    subtitle: "Latar Belakang",
    description: "Generasi Z tumbuh di tengah penetrasi AI yang agresif. Interaksi konstan tanpa batas ini memicu tantangan kognitif baru, seperti penurunan rentang perhatian, ketergantungan berpikir, hingga risiko alienasi sosial akibat interaksi parasosial dengan AI.",
  },
  {
    icon: Target,
    color: "bg-[#ede9fb] text-[#6d3fc9]",
    title: "Apa Tujuan Utama Penelitian?",
    subtitle: "Fokus & Sasaran",
    description: "Merumuskan dan menguji keefektifan program MBPP berbasis Big Five Personality untuk membantu Gen Z melatih kedaulatan kognitif (cognitive agency) mereka dan memitigasi tingkat ketergantungan emosional (AI intimacy).",
  },
  {
    icon: Compass,
    color: "bg-emerald-100 text-emerald-700",
    title: "Bagaimana MBPP Dikembangkan?",
    subtitle: "Proses & Metodologi",
    description: "MBPP dirancang secara interdisipliner dengan memadukan teori psikologi kepribadian, praktik mindfulness klinis, dan literasi teknologi. Dikembangkan melalui metode penelitian eksperimental terkontrol untuk memastikan dampak empirisnya.",
  },
  {
    icon: Share2,
    color: "bg-sky-100 text-sky-700",
    title: "Mengapa Platform Ini Dibuat?",
    subtitle: "Media Diseminasi Riset",
    description: "Website ini dirancang bukan sebagai LMS atau e-learning komersial, melainkan sebagai ruang diseminasi publik. Kami ingin menerjemahkan temuan riset akademis ke dalam program interaktif yang dapat diakses oleh masyarakat umum.",
  },
]

export function TeamworkSection({ id = "science-behind" }: { id?: string }) {
  return (
    <section id={id} className="relative bg-[#FBF6ED] px-6 py-28 scroll-mt-20">
      {/* Subtle border fade from previous white section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-[#FBF6ED]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-20">
          <p className="mb-3 font-script text-3xl text-primary">Research Foundation</p>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-[#2a1845] md:text-4xl lg:text-5xl">
            The Science Behind MBPP
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-base">
            Di balik modul intervensi dan panduan refleksi, terdapat landasan ilmiah kokoh yang dirumuskan melalui riset akademis.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <div
                key={index}
                className="flex gap-5 p-8 rounded-3xl border border-[#e8e0f7] bg-white/70 backdrop-blur-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Icon Container */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${pillar.color} shadow-sm`}>
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-[#7c4fd4] uppercase mb-1">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-[#2a1845] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

