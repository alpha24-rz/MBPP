"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronDown, User, LogOut, Menu, X, LayoutDashboard } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
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
  { label: "What is MBPP?", href: "/#what-is-mbpp" },
  { label: "Why MBPP?", href: "/#why-mbpp" },
  { label: "How the Programme Works", href: "/#how-it-works" },
  { label: "Featured Modules", href: "/#featured-modules" },
  { label: "Research Highlights", href: "/#research-highlights" },
  { label: "Call to Action", href: "/#cta" },
]

const aboutSubItems = [
  { label: "About MBPP", href: "/about#about-mbpp" },
  { label: "Research Background", href: "/about#science-behind" },
  { label: "Research Objectives", href: "/about#science-behind" },
  { label: "Research Methodology", href: "/about#science-behind" },
  { label: "About This Platform", href: "/about#science-behind" },
  { label: "Research Information", href: "/about#research-info" },
  { label: "Research Team", href: "/about#team" },
  { label: "Contact", href: "/about#contact" },
]



const resourceItems = [
  { label: "All Resources", href: "/resources" },
  { label: "Articles", href: "/resources" },
  { label: "Research Papers", href: "/resources" },
  { label: "Downloads", href: "/resources" },
]

export function Navbar() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const isLoggedIn = !!user
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

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
            Ai Intimacy
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
                  Home
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
                  About the Project
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
                    Modules
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
                  Resources
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
                        Admin Console
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer rounded-lg flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
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
                  Logout
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
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 text-sm font-semibold text-white rounded-xl bg-primary/80 hover:bg-primary border border-white/20 hover:border-white/40 shadow-md shadow-primary/20 transition-all duration-200 hover:scale-105"
              >
                Sign up
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

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className={cn(
          "md:hidden border-t px-5 pb-4 rounded-b-2xl backdrop-blur-lg transition-colors",
          isScrolled
            ? "bg-white/95 border-gray-200/80 text-gray-800"
            : "bg-[#130b24]/90 border-white/10 text-white"
        )}>
          <div className="pt-3 space-y-1">

            {/* Mobile Home */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex py-2 px-3 rounded-xl text-sm font-medium transition-colors",
                isScrolled ? "text-gray-700 hover:text-gray-950 hover:bg-gray-100" : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              Home
            </Link>

            {/* Mobile About the Project */}
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex py-2 px-3 rounded-xl text-sm font-medium transition-colors",
                isScrolled ? "text-gray-700 hover:text-gray-950 hover:bg-gray-100" : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              About the Project
            </Link>

            {/* Mobile Modules */}
            <Link
              href="/modules"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex py-2 px-3 rounded-xl text-sm font-medium transition-colors",
                isScrolled ? "text-gray-700 hover:text-gray-950 hover:bg-gray-100" : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              Modules
            </Link>

            {/* Mobile Resources */}
            <Link
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex py-2 px-3 rounded-xl text-sm font-medium transition-colors",
                isScrolled ? "text-gray-700 hover:text-gray-950 hover:bg-gray-100" : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              Resources
            </Link>

            {/* Mobile Auth */}
            <div className={cn(
              "pt-2 border-t",
              isScrolled ? "border-gray-200" : "border-white/10"
            )}>
              {loading ? (
                <div className="flex justify-center py-2">
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
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 py-2 px-3 rounded-xl text-sm font-semibold text-[#7c4fd4] hover:text-[#5e35b8] hover:bg-gray-100 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Admin Console
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 py-2 px-3 rounded-xl text-sm font-medium transition-colors",
                      isScrolled ? "text-gray-700 hover:text-gray-950 hover:bg-gray-100" : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <button
                    onClick={async () => {
                      await signOut()
                      setMobileMenuOpen(false)
                      router.push("/")
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 py-2 px-3 rounded-xl text-sm font-medium cursor-pointer transition-colors",
                      isScrolled ? "text-red-600 hover:text-red-700 hover:bg-red-50" : "text-red-300 hover:text-red-200 hover:bg-white/10"
                    )}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 pt-1">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex-1 py-2 text-center text-sm font-medium rounded-xl transition-colors",
                      isScrolled ? "text-gray-700 hover:text-gray-950 hover:bg-gray-100" : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2 text-center text-sm font-semibold text-white rounded-xl bg-primary hover:bg-primary/90 transition-all duration-200"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  )
}
