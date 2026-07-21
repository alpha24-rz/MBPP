import Image from "next/image"

export function ExploringSection() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden">
      <div className="relative h-[400px] w-full md:h-[500px]">
        <Image
          src="/images/footer-clouds.jpg"
          alt="A cloud-shaped window revealing a bright blue sky"
          fill
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0a0a0f] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FBF6ED] to-transparent" />
      </div>

      <div className="flex flex-col items-center bg-[#FBF6ED] px-4 py-20 text-center">
        <p className="mb-4 font-script text-2xl text-primary md:text-3xl">The Journey Ahead</p>
        <h2 className="mb-6 max-w-lg font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
          {"We're crafting a space"}<br />
          that grows with you.
        </h2>
        <p className="mb-8 max-w-md text-sm leading-relaxed text-muted-foreground">
          A workspace designed around people, not processes.
          One that evolves with your ambitions, scales with
          your vision, and never gets in the way.
        </p>
      </div>
    </section>
  )
}
