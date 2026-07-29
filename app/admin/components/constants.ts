import { Variants } from "framer-motion"

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 12 },
  },
}

export const BADGE_COLOR_PRESETS = [
  { name: "Purple / Violet", value: "bg-purple-100 text-purple-700 border border-purple-200" },
  { name: "Emerald / Green", value: "bg-emerald-100 text-emerald-800 border border-emerald-200" },
  { name: "Sky / Blue", value: "bg-sky-100 text-sky-800 border border-sky-200" },
  { name: "Amber / Orange", value: "bg-amber-100 text-amber-800 border border-amber-200" },
  { name: "Rose / Pink", value: "bg-rose-100 text-rose-800 border border-rose-200" },
]
