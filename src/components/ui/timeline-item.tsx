"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies?: string[];
  isLast: boolean;
}

export function TimelineItem({
  company,
  role,
  period,
  description,
  technologies,
  isLast,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-6 pb-10 last:pb-0 md:gap-8"
    >
      {/* Timeline spine — dot + line */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <div
          className={cn(
            "relative z-10 h-3.5 w-3.5 shrink-0 rounded-full bg-accent-blue",
            "shadow-[0_0_12px_rgba(59,130,246,0.5)]",
            "ring-4 ring-bg-primary"
          )}
        />
        {/* Connecting line */}
        {!isLast && (
          <div className="absolute top-3.5 h-full w-px bg-gradient-to-b from-accent-blue/40 to-transparent" />
        )}
      </div>

      {/* Content card */}
      <div className="glass-card glass-card-hover -mt-1 flex-1 p-5 md:p-6">
        {/* Header */}
        <div className="mb-3 flex flex-col gap-1">
          <h3 className="text-lg font-bold text-text-primary">{company}</h3>
          <p className="gradient-text font-heading text-base font-semibold">
            {role}
          </p>
          <span className="text-sm text-text-muted">{period}</span>
        </div>

        {/* Description bullets */}
        <ul className="mb-4 space-y-2">
          {description.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue/60" />
              {item}
            </li>
          ))}
        </ul>

        {/* Tech badges */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className={cn(
                  "rounded-md border border-border-subtle bg-bg-secondary/50 px-2.5 py-1",
                  "text-xs font-medium text-text-muted transition-colors",
                  "hover:border-accent-blue/30 hover:text-accent-blue"
                )}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
