"use client"

import { useState } from "react"

const team = [
  {
    name: "Rina",
    role: "Sabrina",
    title: "Lead Researcher",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Amalia",
    role: "Sophia",
    title: "Clinical Psychologist",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Elena",
    role: "Olivia",
    title: "Data Analyst",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Charlotte",
    role: "Evelyn",
    title: "Program Director",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Harumi",
    role: "Takara",
    title: "UX Researcher",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=600&auto=format&fit=crop",
  },
]

export function DeveloperSection() {
  const [active, setActive] = useState(null)

  return (
    <section className="w-full bg-[#2a1845] py-16 px-4">
      <div className="mx-auto max-w-5xl text-center mb-10">
        <p className="mb-2 text-xs font-bold tracking-[0.3em] text-[#b79ef0] uppercase">
          Meet The Team
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Orang-Orang di Balik Riset Ini
        </h2>
      </div>

      <div className="mx-auto max-w-5xl h-[420px] flex overflow-hidden rounded-2xl shadow-2xl">
        {team.map((member, i) => {
          const isActive = active === i
          return (
            <div
              key={member.name}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="relative h-full cursor-pointer overflow-hidden transition-[flex-grow] duration-500 ease-out"
              style={{
                flexGrow: isActive ? 2.4 : 1,
                flexBasis: 0,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Photo */}
              <img
                src={member.img}
                alt={member.name}
                className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-500"
                style={{
                  transform: isActive ? "scale(1.06)" : "scale(1)",
                }}
              />

              {/* Purple gradient wash */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(200deg, rgba(109,63,201,0.15) 0%, rgba(58,26,110,0.55) 55%, rgba(30,10,60,0.9) 100%)",
                  opacity: isActive ? 0.55 : 0.85,
                }}
              />

              {/* Divider line */}
              {i !== 0 && (
                <div className="absolute left-0 top-0 h-full w-px bg-white/15" />
              )}

              {/* Name label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 pb-6">
                <p
                  className="font-bold text-white leading-tight transition-all duration-300 whitespace-nowrap"
                  style={{ fontSize: isActive ? "1.15rem" : "0.95rem" }}
                >
                  {member.name}
                </p>
                <p
                  className="text-[#c9b6f2] font-light transition-all duration-300 whitespace-nowrap"
                  style={{ fontSize: isActive ? "0.95rem" : "0.8rem" }}
                >
                  {member.role}
                </p>

                {/* Extra detail only shown when expanded */}
                <p
                  className="mt-2 text-xs text-white/80 uppercase tracking-wider transition-all duration-300 overflow-hidden"
                  style={{
                    maxHeight: isActive ? "2rem" : "0px",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  {member.title}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <p className="mx-auto max-w-5xl mt-4 text-center text-xs text-white/40">
        Arahkan kursor ke salah satu foto untuk melihat detail anggota tim.
      </p>
    </section>
  )
}