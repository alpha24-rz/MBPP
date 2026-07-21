"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, User, LogOut, Menu, X } from "lucide-react"
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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null)

  const toggleMobileItem = (item: string) => {
    setMobileExpandedItem(mobileExpandedItem === item ? null : item)
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      {/* Glassmorphism floating bar */}
      <div className="mx-4 mt-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10">
        <div className="flex items-center justify-between px-5 py-3 md:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors duration-200">
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
                    className="bg-transparent hover:bg-white/10 text-white/80 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white text-sm font-medium transition-all duration-200 rounded-xl px-3 h-9"
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
                    className="bg-transparent hover:bg-white/10 text-white/80 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white text-sm font-medium transition-all duration-200 rounded-xl px-3 h-9"
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
                      className="bg-transparent hover:bg-white/10 text-white/80 hover:text-white text-sm font-medium transition-all duration-200 rounded-xl px-3 py-2 flex items-center h-9 select-none cursor-pointer"
                    >
                      Modules
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Resources dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    onClick={() => router.push("/resources")}
                    className="bg-transparent hover:bg-white/10 text-white/80 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white text-sm font-medium transition-all duration-200 rounded-xl px-3 h-9"
                  >
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-48 p-2">
                      {resourceItems.map((item) => (
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

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/80 hover:bg-primary border-2 border-white/30 hover:border-white/60 shadow-md shadow-primary/30 transition-all duration-200 hover:scale-110 outline-none">
                    <User className="h-4 w-4 text-white" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44 mt-2 rounded-xl shadow-xl">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer rounded-lg">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setIsLoggedIn(false)}
                    className="cursor-pointer text-destructive focus:text-destructive rounded-lg"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="px-4 py-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="px-4 py-1.5 text-sm font-semibold text-white rounded-xl bg-primary/70 hover:bg-primary border border-white/20 hover:border-white/40 shadow-md shadow-primary/20 transition-all duration-200 hover:scale-105"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center h-8 w-8 text-white/80 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 px-5 pb-4">
            <div className="pt-3 space-y-1">

              {/* Mobile Home */}
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex py-2 px-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Home
              </Link>

              {/* Mobile About the Project */}
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex py-2 px-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                About the Project
              </Link>

              {/* Mobile Modules */}
              <Link
                href="/modules"
                onClick={() => setMobileMenuOpen(false)}
                className="flex py-2 px-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Modules
              </Link>

              {/* Mobile Resources */}
              <Link
                href="/resources"
                onClick={() => setMobileMenuOpen(false)}
                className="flex py-2 px-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                Resources
              </Link>

              {/* Mobile Auth */}
              <div className="pt-2 border-t border-white/10">
                {isLoggedIn ? (
                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 py-2 px-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <button
                      onClick={() => { setIsLoggedIn(false); setMobileMenuOpen(false) }}
                      className="flex w-full items-center gap-2 py-2 px-3 rounded-xl text-sm font-medium text-red-300 hover:text-red-200 hover:bg-white/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => { setIsLoggedIn(true); setMobileMenuOpen(false) }}
                      className="flex-1 py-2 text-sm font-medium text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => { setIsLoggedIn(true); setMobileMenuOpen(false) }}
                      className="flex-1 py-2 text-sm font-semibold text-white rounded-xl bg-primary/70 hover:bg-primary border border-white/20 transition-all duration-200"
                    >
                      Sign up
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
