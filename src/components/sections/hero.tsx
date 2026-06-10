"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Gamepad2 } from "lucide-react";
import { DATA } from "@/data/portfolio";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const floatingEmojis = [
  { emoji: "⚡", className: "-top-4 -right-4", delay: "0s" },
  { emoji: "🚀", className: "-bottom-2 -left-6", delay: "1s" },
  { emoji: "💻", className: "top-1/2 -right-8", delay: "2s" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-12"
    >
      <motion.div
        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column */}
        <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-lg font-medium"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-heading font-bold text-6xl lg:text-8xl leading-none tracking-tight"
          >
            <span className="text-text-primary">{DATA.firstName}</span>
            <br />
            <span className="gradient-text">{DATA.lastName}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-lg max-w-lg mx-auto lg:mx-0"
          >
            {DATA.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 font-medium text-white bg-gradient-to-r from-accent-blue to-accent-violet transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 font-medium text-text-primary border border-border-accent transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/game"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-medium text-text-primary bg-bg-card border border-border-subtle transition-colors hover:border-border-accent"
              >
                <Gamepad2 className="h-5 w-5" aria-hidden="true" />
                Game Mode
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center order-1 lg:order-2"
        >
          <div className="relative w-72 h-72 lg:w-96 lg:h-96">
            {/* Gradient ring */}
            <div className="absolute inset-0 gradient-border rounded-full">
              <div className="absolute inset-[3px] rounded-full overflow-hidden bg-bg-primary">
                <Image
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>
            </div>

            {/* Floating emoji decorations */}
            {floatingEmojis.map(({ emoji, className, delay }) => (
              <span
                key={emoji}
                className={`absolute text-3xl ${className}`}
                style={{
                  animation: `float 3s ease-in-out infinite`,
                  animationDelay: delay,
                }}
                aria-hidden="true"
              >
                {emoji}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll-down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-text-muted hover:text-text-secondary transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown
            className="w-6 h-6"
            style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}
          />
        </a>
      </motion.div>
    </section>
  );
}
