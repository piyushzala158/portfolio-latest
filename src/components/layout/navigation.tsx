"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { DATA } from "@/data/portfolio";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sectionIds = useMemo(
    () => DATA.navbar.map((item) => item.href.replace("#", "")),
    []
  );

  const activeSection = useScrollSpy(sectionIds);

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <nav
        aria-label="Main navigation"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4 glass-card rounded-2xl py-6 px-3"
      >
        {/* Avatar */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-border-subtle mb-2">
          <Image
            src={DATA.avatarUrl}
            alt={DATA.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>

        {/* Nav links */}
        <div className="flex flex-col items-center gap-1">
          {DATA.navbar.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            const abbr = item.label.slice(0, 2);

            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative w-10 h-10 rounded-xl flex items-center justify-center text-xs font-medium font-heading transition-colors duration-200 group",
                  isActive
                    ? "text-white"
                    : "text-text-muted hover:text-text-primary"
                )}
                aria-label={item.label}
                aria-current={isActive ? "true" : undefined}
              >
                {/* Active indicator pill */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-xl bg-accent-blue"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{abbr}</span>

                {/* Tooltip */}
                <span className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-bg-secondary text-text-primary text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-lg border border-border-subtle">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-6 h-px bg-border-subtle my-1" />

        {/* Theme toggle */}
        <ThemeToggle className="w-10 h-10" />
      </nav>

      {/* ── Mobile Bottom Bar ── */}
      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-4 left-4 right-4 z-50 lg:hidden"
      >
        <div className="glass-card rounded-full px-4 py-2 flex items-center justify-between">
          {/* Nav dots */}
          <div className="flex items-center gap-2">
            {DATA.navbar.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative flex items-center justify-center w-8 h-8"
                  aria-label={item.label}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  <span
                    className={cn(
                      "block rounded-full transition-all duration-300",
                      isActive
                        ? "w-3 h-3 bg-accent-blue shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        : "w-2 h-2 bg-text-muted"
                    )}
                  />
                </a>
              );
            })}
          </div>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile Full Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-bg-primary/80 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Content */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative flex flex-col items-center justify-center h-full gap-3 pb-24"
            >
              {/* Avatar */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-border-subtle mb-6">
                <Image
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              {/* Nav links */}
              {DATA.navbar.map((item, i) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.2 }}
                    className={cn(
                      "px-6 py-3 rounded-xl text-lg font-heading font-medium transition-colors",
                      isActive
                        ? "text-accent-blue bg-accent-blue/10"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {item.label}
                  </motion.a>
                );
              })}

              {/* Divider */}
              <div className="w-16 h-px bg-border-subtle my-4" />

              {/* Social links */}
              <div className="flex items-center gap-4">
                {DATA.social.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-text-primary transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Theme toggle */}
              <div className="mt-4">
                <ThemeToggle />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
