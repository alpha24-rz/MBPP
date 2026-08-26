import Link from "next/link"
import { GraduationCap } from "lucide-react"
const partnerLogos = [
  { src: "/logo/logo_twh.png", alt: "TWH", className: "h-8" },
  { src: "/logo/logo_unm.png", alt: "UNM", className: "h-8" },
  { src: "/logo/logo_belmawa.png", alt: "Belmawa", className: "h-7" },
  { src: "/logo/logo_dikti.png", alt: "Dikti", className: "h-7" },
  { src: "/logo/logo_pkm.png", alt: "PKM", className: "h-7" },
  { src: "/logo/logo_tim.png", alt: "Tim", className: "h-8" },
]

export function Footer() {
  return (
    <footer className="border-t border-purple-950/40 bg-[#130b24] text-white px-6 py-16 md:px-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-5">

          {/* Brand & Institution Info */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-200 via-white to-purple-300 bg-clip-text text-transparent">
                AI Intimacy
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                MBPP UNM
              </span>
            </div>

            <p className="text-xs leading-relaxed text-purple-200/70 max-w-sm">
              Mindfulness-Based Psychoeducation Programme (MBPP) adalah platform edukasi berbasis penelitian ilmiah dari Fakultas Psikologi UNM untuk membantu Generasi Z membangun hubungan yang sehat, beretika, dan bijak dengan AI.
            </p>

            {/* Partner Logos */}
            <div className="mt-12 pt-8 border-t border-purple-500/15">

              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 rounded-2xl bg-white/95 px-6 py-4 mx-auto w-fit">
                {partnerLogos.map((logo) => (
                  <img
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    className={`${logo.className} w-auto object-contain`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Column 1: Program MBPP */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300">Program MBPP</h4>
            <ul className="space-y-2 text-xs text-purple-200/70">
              <li>
                <Link href="/#what-is-mbpp" className="hover:text-white transition-colors">
                  Apa itu MBPP?
                </Link>
              </li>
              <li>
                <Link href="/#why-mbpp" className="hover:text-white transition-colors">
                  Mengapa MBPP?
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  Cara Kerja Program
                </Link>
              </li>
              <li>
                <Link href="/#featured-modules" className="hover:text-white transition-colors">
                  Modul Unggulan
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="hover:text-white transition-colors">
                  Tim Peneliti
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Modul Pembelajaran */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300">Modul & Pembelajaran</h4>
            <ul className="space-y-2 text-xs text-purple-200/70">
              <li>
                <Link href="/modules" className="hover:text-white transition-colors">
                  Semua Modul
                </Link>
              </li>
              <li>
                <Link href="/modules" className="hover:text-white transition-colors">
                  Mindfulness & AI
                </Link>
              </li>
              <li>
                <Link href="/modules" className="hover:text-white transition-colors">
                  Karakter & Etika
                </Link>
              </li>
              <li>
                <Link href="/modules" className="hover:text-white transition-colors">
                  Regulasi Emosi
                </Link>
              </li>
              <li>
                <Link href="/modules" className="hover:text-white transition-colors">
                  Batasan Sehat AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Sumber Daya & Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300">Sumber Daya & Info</h4>
            <ul className="space-y-2 text-xs text-purple-200/70">
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Perpustakaan Riset
                </Link>
              </li>
              <li>
                <Link href="/about#science-behind" className="hover:text-white transition-colors">
                  Latar Belakang Ilmiah
                </Link>
              </li>
              <li>
                <Link href="/about#research-info" className="hover:text-white transition-colors">
                  Informasi Penelitian
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="hover:text-white transition-colors">
                  Kontak Tim Penelitian
                </Link>
              </li>
            </ul>
          </div>

        </div>


        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-purple-500/15 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-purple-300/60">
          <p>© {new Date().getFullYear()} MBPP — Mindfulness-Based Psychoeducation Programme. Fakultas Psikologi UNM.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-purple-200 transition-colors">Tentang Program</Link>
            <Link href="/resources" className="hover:text-purple-200 transition-colors">Publikasi & Riset</Link>
            <Link href="/about#contact" className="hover:text-purple-200 transition-colors">Kontak</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
