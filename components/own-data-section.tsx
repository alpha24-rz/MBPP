import Image from "next/image"
import { ShieldAlert, Sparkles, Brain, CheckCircle2, AlertCircle } from "lucide-react"

export function OwnDataSection() {
  return (
    <section id="why-mbpp" className="relative bg-[#FBF6ED] pb-28 scroll-mt-20">
      {/* Curved/faded top image banner */}
      <div className="relative h-[300px] w-full md:h-[450px] overflow-hidden">
        <Image
          src="/images/why-mbpp-harmony.png"
          alt="A person meditating with a glowing digital brain representing mindfulness and AI balance"
          fill
          className="object-cover object-center top-10"
          priority
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#FBF6ED] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FBF6ED] to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="mb-3 font-script text-3xl text-primary">Why MBPP?</p>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-[#2a1845] md:text-4xl lg:text-5xl">
            Menghadapi Era AI dengan Kesadaran Penuh
          </h2>
          <p className="max-w-2xl mx-auto text-sm leading-relaxed text-foreground/80 md:text-base">
            Interaksi tanpa batas dengan AI menghadirkan tantangan baru bagi kesehatan mental dan kemandirian berpikir. MBPP hadir sebagai jembatan ilmiah untuk memulihkan kontrol kognitif Anda.
          </p>
        </div>

        {/* Comparison Layout (Problem vs Solution) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

          {/* Column 1: The Challenges (Red/Orange Theme) */}
          <div className="flex flex-col p-8 rounded-3xl border border-red-100 bg-red-50/30 backdrop-blur-sm shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <AlertCircle className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-red-950">Tantangan Digital Saat Ini</h3>
            </div>

            <div className="space-y-6 flex-1">
              {[
                {
                  title: "Ketergantungan Kognitif",
                  desc: "Kecenderungan menyerahkan seluruh keputusan dan proses berpikir kreatif kepada AI, sehingga menurunkan ketajaman logika berpikir kritis."
                },
                {
                  title: "Ilusi Hubungan Emosional (AI Intimacy)",
                  desc: "Terjebak dalam kedekatan semu (parasocial) dengan chatbot AI, yang berisiko mengurangi kualitas interaksi sosial di dunia nyata."
                },
                {
                  title: "Kecemasan & Kelelahan Informasi",
                  desc: "Banjir output AI yang instan memicu kebiasaan serba cepat, menurunkan rentang perhatian (attention span), dan memicu burnout."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-red-400 mt-2 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-red-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-red-950/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: The MBPP Approach (Purple/Green Theme) */}
          <div className="flex flex-col p-8 rounded-3xl border border-[#e0d6f5] bg-[#f7f3fd] backdrop-blur-sm shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0e8fb] text-[#7c4fd4]">
                <Brain className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-[#2a1845]">Solusi Melalui MBPP</h3>
            </div>

            <div className="space-y-6 flex-1">
              {[
                {
                  title: "Kedaulatan Berpikir (Cognitive Agency)",
                  desc: "Mengembalikan posisi Anda sebagai pengendali utama. AI digunakan sebagai alat bantu, sementara kreativitas dan keputusan tetap milik Anda."
                },
                {
                  title: "Regulasi Emosi & Interaksi Sadar",
                  desc: "Latihan jeda sadar (mindful pause) untuk mengamati reaksi emosional Anda saat menggunakan teknologi dan menjaga batasan sehat."
                },
                {
                  title: "Efikasi Diri yang Disesuaikan",
                  desc: "Pendekatan berbasis Big Five Personality membantu Anda memahami kelemahan serta kekuatan psikologis pribadi Anda dalam merespons AI."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#2a1845] text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-foreground/75 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
