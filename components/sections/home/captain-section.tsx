import { ClipboardList, FlaskConical, BookOpen, BarChart3, Users, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Asesmen Awal",
    subtitle: "Baseline Assessment",
    desc: "Peserta mengisi instrumen penilaian awal yang mengukur profil kepribadian Big Five, tingkat kesadaran diri (mindfulness trait), serta pola interaksi mereka dengan teknologi AI saat ini.",
    tag: "Pre-Programme",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Sesi Psikoedukasi",
    subtitle: "Psychoeducation Sessions",
    desc: "Serangkaian 6 sesi terstruktur yang memadukan konten berbasis riset dengan latihan mindfulness praktis. Setiap sesi dirancang untuk membangun pemahaman secara bertahap — dari kesadaran diri, regulasi emosi, hingga literasi AI yang bertanggung jawab.",
    tag: "Core Programme",
    tagColor: "bg-[#ede9fb] text-[#6d3fc9]",
  },
  {
    number: "03",
    icon: FlaskConical,
    title: "Latihan & Refleksi",
    subtitle: "Practice & Journaling",
    desc: "Di antara sesi, peserta melakukan latihan mandiri yang dipandu — termasuk journaling terbimbing, latihan jeda sadar (mindful pause), dan analisis interaksi AI mereka sendiri berdasarkan kerangka Big Five.",
    tag: "Between Sessions",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Evaluasi & Pengukuran",
    subtitle: "Post-Programme Evaluation",
    desc: "Setelah programme selesai, dilakukan pengukuran ulang menggunakan instrumen yang sama. Data pre- dan post-test dianalisis untuk mengukur perubahan signifikan dalam efikasi diri digital, regulasi emosi, dan pola penggunaan AI.",
    tag: "Post-Programme",
    tagColor: "bg-sky-100 text-sky-700",
  },
]

export function CaptainSection() {
  return (
    <section id="how-it-works" className="relative bg-[#FBF6ED] px-6 py-28 scroll-mt-20">

      {/* Header */}
      <div className="mx-auto max-w-4xl text-center mb-20">
        <p className="mb-3 font-script text-3xl text-primary">The Mechanism</p>
        <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-[#2a1845] md:text-4xl lg:text-5xl">
          How the Programme Works?
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-base">
          MBPP diterapkan melalui sebuah desain penelitian eksperimental yang terstruktur. Berikut adalah alur bagaimana
          temuan riset diterjemahkan menjadi sebuah program intervensi yang dapat diikuti oleh peserta.
        </p>
      </div>

      {/* Steps */}
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative flex flex-col group">
                {/* Card */}
                <div className="flex flex-col h-full rounded-3xl border border-[#e8e0f7] bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-7">

                  {/* Number + Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c4fd4] to-[#5e35b8] shadow-md shadow-purple-200">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-4xl font-bold text-[#ede9fb] select-none leading-none">
                      {step.number}
                    </span>
                  </div>

                  {/* Tag */}
                  <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide mb-4 ${step.tagColor}`}>
                    {step.tag}
                  </span>

                  {/* Text */}
                  <h3 className="text-lg font-bold text-[#2a1845] mb-1">{step.title}</h3>
                  <p className="text-xs font-medium text-[#7c4fd4]/70 mb-3 italic">{step.subtitle}</p>
                  <p className="text-sm text-foreground/70 leading-relaxed flex-1">{step.desc}</p>

                  {/* Arrow between cards (desktop) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-4 top-12 z-10 h-8 w-8 items-center justify-center rounded-full bg-white border border-[#e0d6f5] shadow-sm">
                      <ArrowRight className="h-4 w-4 text-[#7c4fd4]" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Research design note */}
        <div className="mt-16 mx-auto max-w-3xl rounded-2xl border border-[#e0d6f5] bg-[#f7f3fd] p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ede9fb] text-[#7c4fd4]">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2a1845] mb-1">Desain Penelitian</p>
            <p className="text-xs text-foreground/70 leading-relaxed">
              Programme ini diuji menggunakan desain{" "}
              <span className="font-medium text-[#5e35b8]">Randomized Controlled Trial (RCT)</span>{" "}
              dengan kelompok eksperimen dan kelompok kontrol. Validitas instrumen, reliabilitas inter-rater,
              dan signifikansi statistik hasil intervensi telah diverifikasi melalui proses peer-review.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

