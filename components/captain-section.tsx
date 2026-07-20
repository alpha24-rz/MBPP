import Image from "next/image"
import {
  MessageSquare,
  FolderOpen,
  StickyNote,
  Music,
  Figma,
  Languages,
  Code,
  Globe,
  Terminal,
  Palette,
} from "lucide-react"

const apps = [
  { name: "Messages", desc: "Real-time chat", icon: MessageSquare, color: "from-[#f59e0b] to-[#fbbf24]" },
  { name: "Files", desc: "Cloud storage", icon: FolderOpen, color: "from-[#6366f1] to-[#818cf8]" },
  { name: "Notes", desc: "Rich documents", icon: StickyNote, color: "from-[#1e1e2e] to-[#3a3a5c]" },
  { name: "Music", desc: "Audio player", icon: Music, color: "from-[#ec4899] to-[#f472b6]" },
  { name: "Design", desc: "Visual editor", icon: Figma, color: "from-[#a78bfa] to-[#c4b5fd]" },
  { name: "Translate", desc: "Language tools", icon: Languages, color: "from-[#f87171] to-[#fca5a5]" },
  { name: "Code", desc: "Code editor", icon: Code, color: "from-[#fb923c] to-[#fdba74]" },
  { name: "Publish", desc: "Web publishing", icon: Globe, color: "from-[#3b82f6] to-[#60a5fa]" },
  { name: "Terminal", desc: "Command line", icon: Terminal, color: "from-[#1e1e2e] to-[#374151]" },
  { name: "Canvas", desc: "Design tool", icon: Palette, color: "from-[#8b5cf6] to-[#a78bfa]" },
]

export function CaptainSection() {
  return (
    <section className="relative">
      {/* Biplane illustration */}
      <div className="relative h-[400px] w-full md:h-[500px]">
        <Image
          src="/images/biplane.jpg"
          alt="Red vintage biplane flying through the sky"
          fill
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#FBF6ED] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FBF6ED] to-transparent" />
      </div>

      <div className="flex flex-col items-center bg-[#FBF6ED] px-4 py-20 text-center">
        <p className="mb-4 font-script text-2xl text-primary md:text-3xl">{"You're in Control"}</p>
        <h2 className="mb-4 max-w-lg font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
          A universe of tools<br />
          at your fingertips
        </h2>
        <p className="mb-12 max-w-md text-sm leading-relaxed text-muted-foreground">
          Discover a growing library of powerful apps
          designed to help you work, create, and play.
        </p>

        {/* App grid */}
        <div className="mx-auto grid w-full max-w-2xl grid-cols-5 gap-6 md:gap-8">
          {apps.map((app) => (
            <div key={app.name} className="flex flex-col items-center gap-2">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${app.color} shadow-md transition-transform hover:scale-105 md:h-16 md:w-16`}
              >
                <app.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-[10px] font-medium text-foreground md:text-xs">{app.name}</span>
              <span className="hidden text-[9px] text-muted-foreground md:block">{app.desc}</span>
            </div>
          ))}
        </div>

        <button className="mt-12 rounded-full bg-gradient-to-r from-[#d94f7a] to-[#e8738a] px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110">
          Explore All Tools
        </button>
      </div>
    </section>
  )
}
