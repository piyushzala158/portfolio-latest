"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  index: number;
  className?: string;
}

export function SkillBadge({ name, index, className }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "glass-card group relative inline-flex cursor-default items-center overflow-hidden",
        "rounded-full px-4 py-2 text-sm font-medium text-text-primary",
        "border border-glass-border transition-all duration-300",
        "hover:scale-105 hover:border-accent-blue hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
        className
      )}
    >
      {/* Shimmer overlay on hover */}
      <span
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100"
        )}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.08) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2s linear infinite",
        }}
        aria-hidden="true"
      />
      <span className="relative z-10">{name}</span>
    </motion.span>
  );
}
