const steps = [
  {
    number: "01",
    title: "Asesmen Awal & Skrining",
    subtitle: "Baseline Assessment",
    desc: "Peserta Gen Z (18–28 tahun) mengisi instrumen CAIDS-20 untuk mengukur tingkat kecenderungan curhat ke AI dan instrumen IPIP-BFM-50 untuk pemetaan 5 tipe kepribadian Big Five (OCEAN).",
    tag: "Pre-Test (CAIDS-20 & IPIP-BFM-50)",
  },
  {
    number: "02",
    title: "4 Pertemuan Intervensi",
    subtitle: "Offline Group Interventions",
    desc: "Pelaksanaan 4 kali pertemuan tatap muka kelompok kecil: (1) Menyapa Diri & Ketekunan, (2) Automatic Pilot & Kehati-hatian, (3) Welas Asih & Rasa Syukur, (4) Evaluasi & Perpisahan.",
    tag: "4 Pertemuan Tatap Muka",
  },
  {
    number: "03",
    title: "Latihan Mandiri Harian",
    subtitle: "Daily Practice & Reflection",
    desc: "Peserta menjalankan tugas latihan harian di rumah, mencatat target di 'Kalender Latihan Harian' serta mengisi 'Jurnal Syukur Harian' (4 pertanyaan refleksi) dan jeda 'Berhenti, Pikirkan, Bertindak'.",
    tag: "Kalender & Jurnal Syukur",
  },
  {
    number: "04",
    title: "Post-Test & Fidelitas",
    subtitle: "Post-Programme Evaluation",
    desc: "Pengukuran ulang dengan CAIDS-20 dan skala mindfulness, pengisian Form Evaluasi Kegiatan, Manipulation Check, serta pemantauan Treatment Fidelity Checklist oleh observer independen.",
    tag: "Post-Test & Fidelitas",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-[#FBF6ED] px-6 py-28 scroll-mt-20 overflow-hidden">
      <div className="relative mx-auto max-w-7xl">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 mb-16 border-b border-[#2a1845]/15">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-2 w-2 rounded-full bg-[#B08D57]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B08D57]">
                Metodologi & Alur Program
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold leading-tight text-[#2a1845] md:text-5xl lg:text-6xl tracking-tight">
              Bagaimana MBPP Bekerja?
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-[#2a1845]/75 md:text-base">
              MBPP menerjemahkan riset psikologi eksperimental menjadi tahapan intervensi terstruktur untuk membangun regulasi emosi dan kedaulatan kognitif Generasi Z.
            </p>
          </div>
        </div>

        {/* Editorial Process Grid (Zero Cards / Zero Icon Boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {steps.map((step, idx) => (
            <div key={step.number} className="group relative flex flex-col pt-6 border-t-2 border-[#2a1845]/10 hover:border-[#5e35b8] transition-colors duration-500">
              {/* Top Accent Indicator */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-4xl lg:text-5xl font-light text-[#2a1845]/30 group-hover:text-[#5e35b8] transition-colors duration-300">
                  {step.number}
                </span>
                <span className="text-[10px] font-mono tracking-wider text-[#B08D57] uppercase">
                  Tahap 0{idx + 1}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl font-serif font-bold text-[#2a1845] group-hover:text-[#5e35b8] transition-colors duration-300 mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-xs font-semibold text-[#7c4fd4]/80 tracking-wide mb-4">
                {step.subtitle}
              </p>

              {/* Description */}
              <p className="text-xs leading-relaxed text-[#2a1845]/70 mb-8 flex-1">
                {step.desc}
              </p>

              {/* Minimal Tag */}
              <div className="pt-4 border-t border-[#2a1845]/5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
                <span className="text-[11px] font-semibold text-[#2a1845]/80">
                  {step.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Professional Research Footer */}
        <div className="mt-20 pt-8 border-t border-[#2a1845]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full border border-[#B08D57]/40 bg-[#B08D57]/10 text-[11px] font-bold text-[#8C6D37] uppercase tracking-wider">
              RCT Validated
            </span>
            <p className="text-xs font-medium text-[#2a1845]/80">
              Desain Penelitian Randomized Controlled Trial (RCT) & Pemetaan Big Five Personality (IPIP-BFM-50).
            </p>
          </div>
          <div className="text-xs text-[#2a1845]/60 italic shrink-0">
            Fakultas Psikologi UNM &copy; 2026
          </div>
        </div>
      </div>
    </section>
  )
}

export const CaptainSection = HowItWorksSection
