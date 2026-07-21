import Image from "next/image"

export function CloudsPanorama() {
  return (
    <div className="relative h-[400px] w-full md:h-[550px]">
      <Image
        src="/images/clouds-panorama.jpg"
        alt="Panoramic view of fluffy pink and white clouds"
        fill
        className="object-cover"
      />
      {/* Top fade from cream */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#FBF6ED] to-transparent" />
      {/* Bottom fade into cream */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FBF6ED] to-transparent" />
    </div>
  )
}
