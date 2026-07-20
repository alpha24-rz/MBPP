import Image from "next/image"
import { PenTool, Layers, Rocket } from "lucide-react"

const features = [
  {
    icon: PenTool,
    color: "from-[#3b82f6] to-[#6366f1]",
    title: "Write + Publish",
    description: "Draft documents, publish to the web, and collaborate with your team in real time.",
  },
  {
    icon: Layers,
    color: "from-[#f59e0b] to-[#84cc16]",
    title: "Design + Generate",
    description: "Create visuals with AI, embed them into your projects, and iterate instantly.",
  },
  {
    icon: Rocket,
    color: "from-[#ef4444] to-[#ec4899]",
    title: "Build + Ship",
    description: "Prototype ideas, build integrations, and ship products from a single workspace.",
  },
]

export function TeamworkSection() {
  return (
    <section className="relative">
      {/* Sunset clouds */}
      <div className="relative h-[300px] w-full md:h-[400px]">
        <Image
          src="/images/sunset-clouds.jpg"
          alt="Majestic sunset clouds"
          fill
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#FBF6ED] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FBF6ED] to-transparent" />
      </div>

      <div className="flex flex-col items-center bg-[#FBF6ED] px-4 py-20 text-center">
        <p className="mb-4 font-script text-2xl text-primary md:text-3xl">Better Together</p>
        <h2 className="mb-4 max-w-lg font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
          Tools that talk to each other<br />
          so you can dream bigger.
        </h2>
        <p className="mb-12 max-w-md text-sm leading-relaxed text-muted-foreground">
          When your apps connect seamlessly, the possibilities
          multiply. In Aether, everything works together
          so you can focus on what matters.
        </p>

        {/* Feature cards */}
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-md`}
              >
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">{feature.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
