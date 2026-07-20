"use client"

import { useState } from "react"
import Link from "next/link"
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
  { label: "Hero", href: "#hero" },
  { label: "What is MBPP?", href: "#what-is-mbpp" },
  { label: "Why MBPP?", href: "#why-mbpp" },
  { label: "Learning Journey", href: "#learning-journey" },
  { label: "Featured Modules", href: "#featured-modules" },
  { label: "Research", href: "#research" },
  { label: "Team", href: "#team" },
]

const moduleItems = [
  { label: "Module 1", href: "/modules/1" },
  { label: "Module 2", href: "/modules/2" },
  { label: "Module 3", href: "/modules/3" },
  { label: "Module 4", href: "/modules/4" },
  { label: "Module 5", href: "/modules/5" },
]

const resourceItems = [
  { label: "Articles", href: "/resources/articles" },
  { label: "Research Papers", href: "/resources/research-papers" },
  { label: "Downloads", href: "/resources/downloads" },
]

export function Navbar() {
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
                  <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white/80 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white text-sm font-medium transition-all duration-200 rounded-xl px-3 h-9">
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

                {/* About */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about"
                      className={cn(
                        "inline-flex h-9 w-max items-center justify-center rounded-xl px-3 py-2 text-sm font-medium",
                        "bg-transparent text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                      )}
                    >
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Modules dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white/80 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white text-sm font-medium transition-all duration-200 rounded-xl px-3 h-9">
                    Modules
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-44 p-2">
                      {moduleItems.map((item) => (
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

                {/* Resources dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white/80 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white text-sm font-medium transition-all duration-200 rounded-xl px-3 h-9">
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
              <div>
                <button
                  onClick={() => toggleMobileItem("home")}
                  className="flex w-full items-center justify-between py-2 px-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Home
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileExpandedItem === "home" && "rotate-180")} />
                </button>
                {mobileExpandedItem === "home" && (
                  <div className="mt-1 pl-4 space-y-0.5">
                    {homeSubItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 py-1.5 px-3 rounded-lg text-sm text-white/60 hover:text-white/90 hover:bg-white/10 transition-colors"
                      >
                        <span className="h-1 w-1 rounded-full bg-white/40" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile About */}
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex py-2 px-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                About
              </Link>

              {/* Mobile Modules */}
              <div>
                <button
                  onClick={() => toggleMobileItem("modules")}
                  className="flex w-full items-center justify-between py-2 px-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Modules
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileExpandedItem === "modules" && "rotate-180")} />
                </button>
                {mobileExpandedItem === "modules" && (
                  <div className="mt-1 pl-4 space-y-0.5">
                    {moduleItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 py-1.5 px-3 rounded-lg text-sm text-white/60 hover:text-white/90 hover:bg-white/10 transition-colors"
                      >
                        <span className="h-1 w-1 rounded-full bg-white/40" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Resources */}
              <div>
                <button
                  onClick={() => toggleMobileItem("resources")}
                  className="flex w-full items-center justify-between py-2 px-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Resources
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileExpandedItem === "resources" && "rotate-180")} />
                </button>
                {mobileExpandedItem === "resources" && (
                  <div className="mt-1 pl-4 space-y-0.5">
                    {resourceItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 py-1.5 px-3 rounded-lg text-sm text-white/60 hover:text-white/90 hover:bg-white/10 transition-colors"
                      >
                        <span className="h-1 w-1 rounded-full bg-white/40" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

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
