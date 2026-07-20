"use client"

import { useState } from "react"

const team = [
  {
    name: "Muhammad Rafli Hidayatullah Arif",
    nickname: "Rafli",
    role: "Psikologi",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Riswandi",
    nickname: "Wandi",
    role: "Psikologi",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Andi Fadli Risandi Kresna",
    nickname: "Fadli",
    role: "Psikologi",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Rahmaddika Alwadi",
    nickname: "Alwa",
    role: "Psikologi",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Muhammad Alfarizi",
    nickname: "Alfarizi",
    role: "Teknik Informatika dan Komputer",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
  },
]

export function DeveloperSection() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="team" className="relative bg-white px-6 py-28 scroll-mt-20">
      {/* Top transition fade from previous beige section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FBF6ED] to-white" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <p className="mb-3 font-script text-3xl text-primary">Meet The Team</p>
          <h2 className="mb-6 font-serif text-3xl font-bold leading-tight text-[#2a1845] md:text-4xl lg:text-5xl">
            Orang-Orang di Balik Riset Ini
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-base">
            Tim peneliti dan kolaborator lintas disiplin yang mendedikasikan keahlian mereka untuk merancang, menguji, dan menyebarluaskan program intervensi MBPP.
          </p>
        </div>

        {/* Desktop Layout: Sleek Accordion */}
        <div className="hidden md:flex mx-auto max-w-5xl h-[450px] overflow-hidden rounded-3xl border border-[#e8e0f7] bg-white/50 shadow-xl shadow-purple-950/5">
          {team.map((member, i) => {
            const isActive = active === i
            return (
              <div
                key={member.name}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="relative h-full cursor-pointer overflow-hidden transition-[flex-grow] duration-500 ease-out"
                style={{
                  flexGrow: isActive ? 2.6 : 1,
                  flexBasis: 0,
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {/* Photo */}
                <img
                  src={member.img}
                  alt={member.name}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                  style={{
                    filter: isActive ? "grayscale(0%)" : "grayscale(80%)",
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                  }}
                />

                {/* Purple gradient wash overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(200deg, rgba(109,63,201,0.15) 0%, rgba(58,26,110,0.55) 60%, rgba(30,10,60,0.9) 100%)",
                    opacity: isActive ? 0.55 : 0.85,
                  }}
                />

                {/* Divider line */}
                {i !== 0 && (
                  <div className="absolute left-0 top-0 h-full w-px bg-white/10" />
                )}

                {/* Info Container */}
                <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 z-10 flex flex-col justify-end h-1/2">
                  <p
                    className="font-bold text-white leading-snug transition-all duration-300 whitespace-nowrap drop-shadow-sm"
                    style={{ fontSize: isActive ? "1.25rem" : "1rem" }}
                  >
                    {member.name}
                  </p>
                  <p
                    className="text-[#c9b6f2] font-semibold tracking-wider transition-all duration-300 whitespace-nowrap uppercase text-[10px]"
                    style={{ 
                      opacity: isActive ? 1 : 0.8,
                      marginTop: "2px"
                    }}
                  >
                    {member.role}
                  </p>

                  {/* Extra detail only shown when expanded */}
                  <div
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{
                      maxHeight: isActive ? "50px" : "0px",
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? "8px" : "0px",
                    }}
                  >
                    <p className="text-xs text-white/80 font-light border-t border-white/20 pt-2">
                      Panggilan: {member.nickname}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile Layout: Premium Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col rounded-3xl border border-[#e8e0f7] bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-4 bg-muted">
                <img
                  src={member.img}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
                {/* Subtle wash overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(200deg, rgba(109,63,201,0.05) 0%, rgba(58,26,110,0.3) 100%)",
                  }}
                />
              </div>

              {/* Info */}
              <span className="text-[10px] font-bold tracking-widest text-[#7c4fd4] uppercase mb-1">
                {member.role}
              </span>
              <h3 className="text-lg font-bold text-[#2a1845] mb-1">
                {member.name}
              </h3>
              <p className="text-xs text-foreground/75 leading-relaxed">
                Nama Panggilan: <span className="font-semibold text-[#2a1845]">{member.nickname}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}