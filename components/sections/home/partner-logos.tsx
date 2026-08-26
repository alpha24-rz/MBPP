"use client"

import { motion } from "framer-motion"

export function PartnerLogos() {
    return (
        <div className="relative z-30 flex justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="-mt-8 flex items-center gap-2 rounded-full border border-black/30 bg-white px-4 py-2 shadow-lg"
            >
                <img src="/logo/logo_twh.png" alt="" className="h-12" />
                <img src="/logo/logo_unm.png" alt="" className="h-12" />
                <img src="/logo/logo_belmawa.png" alt="" className="h-10" />
                <img src="/logo/logo_dikti.png" alt="" className="h-10" />
                <img src="/logo/logo_pkm.png" alt="" className="h-11" />
                <img src="/logo/logo_tim.png" alt="" className="h-12" />
            </motion.div>
        </div>
    )
}