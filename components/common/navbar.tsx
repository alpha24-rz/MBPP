"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronDown, User, LogOut, Menu, X, LayoutDashboard } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { motion, AnimatePresence } from "framer-motion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const homeSubItems = [
  { label: "Apa itu MBPP?", href: "/#what-is-mbpp" },
  { label: "Mengapa MBPP?", href: "/#why-mbpp" },
  { label: "Cara Kerja Program", href: "/#how-it-works" },
  { label: "Modul Unggulan", href: "/#featured-modules" },
  { label: "Sorotan Penelitian", href: "/#research-highlights" },
  { label: "Mari Bergabung", href: "/#cta" },
]

const aboutSubItems = [
  { label: "Tentang MBPP", href: "/about#about-mbpp" },
  { label: "Latar Belakang Penelitian", href: "/about#science-behind" },
  { label: "Tujuan Penelitian", href: "/about#science-behind" },
  { label: "Metodologi Penelitian", href: "/about#science-behind" },
  { label: "Tentang Platform Ini", href: "/about#science-behind" },
  { label: "Informasi Penelitian", href: "/about#research-info" },
  { label: "Tim Peneliti", href: "/about#team" },
  { label: "Kontak", href: "/about#contact" },
]

const resourceItems = [
  { label: "Semua Pustaka", href: "/resources" },
  { label: "Artikel", href: "/resources" },
  { label: "Jurnal & Makalah", href: "/resources" },
  { label: "Unduhan", href: "/resources" },
]

export function Navbar() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const isLoggedIn = !!user
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [closeMobileMenu])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const toggleMobileItem = (item: string) => {
    setMobileExpandedItem(mobileExpandedItem === item ? null : item)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200/80 shadow-sm py-0"
          : "bg-transparent border-b border-transparent shadow-none py-1"
      )}
    >
      <div className="flex items-center justify-between px-5 py-3 md:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.svg"
            alt="Ai Intimacy Logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover shadow-sm transition-transform duration-200 group-hover:scale-105"
          />
          <span
            className={cn(
              "font-serif text-xl font-bold tracking-tight transition-colors duration-200",
              isScrolled
                ? "text-gray-900 group-hover:text-primary"
                : "text-white/95 group-hover:text-purple-200"
            )}
          >
            AI Intimacy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">

              {/* Home dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onClick={() => router.push("/")}
                  className={cn(
                    "bg-transparent text-sm font-medium transition-all duration-200 rounded-xl px-3 h-9",
                    isScrolled
                      ? "text-gray-700 hover:text-gray-950 hover:bg-gray-900/10 data-[state=open]:bg-gray-900/10 data-[state=open]:text-gray-950"
                      : "text-white/80 hover:text-white hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white"
                  )}
                >
                  Beranda
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-52 p-2">
                    {homeSubItems.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent/60 transition-colors duration-150"
                          >
                            <span className="h-1 w-1 rounded-full bg-primary/60" />
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About the Project Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onClick={() => router.push("/about")}
                  className={cn(
                    "bg-transparent text-sm font-medium transition-all duration-200 rounded-xl px-3 h-9",
                    isScrolled
                      ? "text-gray-700 hover:text-gray-950 hover:bg-gray-900/10 data-[state=open]:bg-gray-900/10 data-[state=open]:text-gray-950"
                      : "text-white/80 hover:text-white hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white"
                  )}
                >
                  Tentang Penelitian
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-56 p-2">
                    {aboutSubItems.map((item) => (
                      <li key={item.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent/60 transition-colors duration-150"
                          >
                            <span className="h-1 w-1 rounded-full bg-primary/60" />
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Modules Link */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/modules"
                    className={cn(
                      "bg-transparent text-sm font-medium transition-all duration-200 rounded-xl px-3 py-2 flex items-center h-9 select-none cursor-pointer",
                      isScrolled
                        ? "text-gray-700 hover:text-gray-950 hover:bg-gray-900/10"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    Modul
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Resources dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  onClick={() => router.push("/resources")}
                  className={cn(
                    "bg-transparent text-sm font-medium transition-all duration-200 rounded-xl px-3 h-9",
                    isScrolled
                      ? "text-gray-700 hover:text-gray-950 hover:bg-gray-900/10 data-[state=open]:bg-gray-900/10 data-[state=open]:text-gray-950"
                      : "text-white/80 hover:text-white hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white"
                  )}
                >
                  Pustaka
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-48 p-2">
                    {resourceItems.map((item) => (
                      <li key={item.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-accent/60 transition-colors duration-150"
                          >
                            <span className="h-1 w-1 rounded-full bg-primary/60" />
                            {item.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className={cn(
              "h-8 w-8 rounded-full border-2 animate-spin",
              isScrolled ? "border-gray-300 border-t-gray-800" : "border-white/20 border-t-white"
            )} />
          ) : isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/80 hover:bg-primary border-2 border-white/30 hover:border-white/60 shadow-md shadow-primary/30 transition-all duration-200 hover:scale-110 outline-none cursor-pointer">
                  <User className="h-4 w-4 text-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 mt-2 rounded-xl shadow-xl">
                {user && user.user_metadata?.role === "admin" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer rounded-lg flex items-center font-semibold text-primary">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Konsol Admin
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer rounded-lg flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut()
                    router.push("/")
                  }}
                  className="cursor-pointer text-destructive focus:text-destructive rounded-lg flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className={cn(
                  "px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                  isScrolled
                    ? "text-gray-700 hover:text-gray-950"
                    : "text-white/80 hover:text-white"
                )}
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 text-sm font-semibold text-white rounded-xl bg-primary/80 hover:bg-primary border border-white/20 hover:border-white/40 shadow-md shadow-primary/20 transition-all duration-200 hover:scale-105"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "md:hidden flex items-center justify-center h-8 w-8 transition-colors",
            isScrolled ? "text-gray-700 hover:text-gray-950" : "text-white/80 hover:text-white"
          )}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              key="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
              className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={cn(
                "md:hidden fixed top-0 left-0 right-0 z-50 border-b shadow-2xl overflow-y-auto",
                "max-h-[85vh]",
                isScrolled
                  ? "bg-white/98 border-gray-200/80 text-gray-800"
                  : "bg-[#130b24]/97 border-white/10 text-white"
              )}
            >
              {/* Menu Header with Close button */}
              <div className={cn(
                "flex items-center justify-between px-5 py-4 border-b",
                isScrolled ? "border-gray-100" : "border-white/10"
              )}>
                <span className={cn("text-sm font-bold", isScrolled ? "text-[#2a1845]" : "text-white")}>
                  Menu Navigasi
                </span>
                <button
                  onClick={closeMobileMenu}
                  className={cn(
                    "p-1.5 rounded-full transition-colors",
                    isScrolled ? "text-gray-500 hover:bg-gray-100 hover:text-gray-900" : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-5 pt-4 pb-6 space-y-1">

                {/* Mobile Home */}
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className={cn(
                    "flex py-3 px-3 rounded-xl text-sm font-medium transition-colors",
                    isScrolled ? "text-gray-700 hover:text-gray-950 hover:bg-gray-100" : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  Beranda
                </Link>

                {/* Mobile About the Project */}
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className={cn(
                    "flex py-3 px-3 rounded-xl text-sm font-medium transition-colors",
                    isScrolled ? "text-gray-700 hover:text-gray-950 hover:bg-gray-100" : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  Tentang Penelitian
                </Link>

                {/* Mobile Modules */}
                <Link
                  href="/modules"
                  onClick={closeMobileMenu}
                  className={cn(
                    "flex py-3 px-3 rounded-xl text-sm font-medium transition-colors",
                    isScrolled ? "text-gray-700 hover:text-gray-950 hover:bg-gray-100" : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  Modul Intervensi
                </Link>

                {/* Mobile Resources */}
                <Link
                  href="/resources"
                  onClick={closeMobileMenu}
                  className={cn(
                    "flex py-3 px-3 rounded-xl text-sm font-medium transition-colors",
                    isScrolled ? "text-gray-700 hover:text-gray-950 hover:bg-gray-100" : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  Pustaka
                </Link>

                {/* Mobile Auth */}
                <div className={cn(
                  "pt-3 mt-1 border-t",
                  isScrolled ? "border-gray-200" : "border-white/10"
                )}>
                  {loading ? (
                    <div className="flex justify-center py-3">
                      <div className={cn(
                        "h-6 w-6 rounded-full border-2 animate-spin",
                        isScrolled ? "border-gray-300 border-t-gray-800" : "border-white/20 border-t-white"
                      )} />
                    </div>
                  ) : isLoggedIn ? (
                    <div className="space-y-1">
                      {user && user.user_metadata?.role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={closeMobileMenu}
                          className="flex items-center gap-2.5 py-3 px-3 rounded-xl text-sm font-semibold text-[#7c4fd4] hover:text-[#5e35b8] hover:bg-purple-50 transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Konsol Admin
                        </Link>
                      )}
                      <Link
                        href="/profile"
                        onClick={closeMobileMenu}
                        className={cn(
                          "flex items-center gap-2.5 py-3 px-3 rounded-xl text-sm font-medium transition-colors",
                          isScrolled ? "text-gray-700 hover:text-gray-950 hover:bg-gray-100" : "text-white/80 hover:text-white hover:bg-white/10"
                        )}
                      >
                        <User className="h-4 w-4" />
                        Profil Saya
                      </Link>
                      <button
                        onClick={async () => {
                          await signOut()
                          closeMobileMenu()
                          router.push("/")
                        }}
                        className={cn(
                          "flex w-full items-center gap-2.5 py-3 px-3 rounded-xl text-sm font-medium cursor-pointer transition-colors",
                          isScrolled ? "text-red-600 hover:text-red-700 hover:bg-red-50" : "text-red-300 hover:text-red-200 hover:bg-white/10"
                        )}
                      >
                        <LogOut className="h-4 w-4" />
                        Keluar
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2.5 pt-1">
                      <Link
                        href="/login"
                        onClick={closeMobileMenu}
                        className={cn(
                          "flex-1 py-2.5 text-center text-sm font-medium rounded-xl border transition-colors",
                          isScrolled
                            ? "text-gray-700 hover:text-gray-950 hover:bg-gray-100 border-gray-200"
                            : "text-white/80 hover:text-white hover:bg-white/10 border-white/20"
                        )}
                      >
                        Masuk
                      </Link>
                      <Link
                        href="/register"
                        onClick={closeMobileMenu}
                        className="flex-1 py-2.5 text-center text-sm font-semibold text-white rounded-xl bg-primary hover:bg-primary/90 transition-all duration-200 shadow-md shadow-primary/20"
                      >
                        Daftar
                      </Link>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
