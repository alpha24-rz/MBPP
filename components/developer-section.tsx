import Image from "next/image"

export function DeveloperSection() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-[#0a0a0f]">
      {/* Developer illustration */}
      <div className="relative h-[400px] w-full md:h-[500px]">
        <Image
          src="/images/developer.jpg"
          alt="Developer working at a desk illuminated by a warm lamp"
          fill
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#FBF6ED] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </div>

      <div className="flex flex-col items-center px-4 py-20 text-center">
        <p className="mb-4 font-script text-2xl text-[#f5c6d0] md:text-3xl">For Builders</p>
        <h2 className="mb-6 max-w-lg font-serif text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
          Build it for yourself,<br />
          share it with the world.
        </h2>
        <p className="mb-8 max-w-md text-sm leading-relaxed text-primary-foreground/70">
          Whether it{"'"}s a personal project, a tool for your team,
          or the next big thing -- Aether gives you the full stack.
          No servers to manage, no configs to wrestle. Just create.
        </p>
        <button className="rounded-full bg-gradient-to-r from-[#d94f7a] to-[#e8738a] px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110">
          Start Building
        </button>
      </div>
    </section>
  )
}
