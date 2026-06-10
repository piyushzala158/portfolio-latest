"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps extends Project {
  index: number;
}

const gradients = [
  "from-accent-blue/20 via-accent-violet/10 to-transparent",
  "from-accent-violet/20 via-accent-cyan/10 to-transparent",
  "from-accent-cyan/20 via-accent-blue/10 to-transparent",
  "from-accent-blue/15 via-accent-cyan/15 to-transparent",
  "from-accent-violet/20 via-accent-blue/10 to-transparent",
  "from-accent-cyan/15 via-accent-violet/15 to-transparent",
];

/* Inline GitHub SVG since lucide-react v1.17+ removed brand icons */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function ProjectCard({
  title,
  description,
  technologies,
  href,
  github,
  index,
}: ProjectCardProps) {
  const gradient = gradients[index % gradients.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "glass-card group relative flex h-full flex-col overflow-hidden",
        "transition-all duration-500",
        "hover:-translate-y-1 hover:border-accent-blue/40 hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)]"
      )}
    >
      {/* Gradient header area */}
      <div
        className={cn(
          "h-32 bg-gradient-to-br sm:h-36",
          gradient,
          "transition-opacity duration-500 group-hover:opacity-80"
        )}
      >
        {/* Decorative dot pattern */}
        <div className="flex h-full items-center justify-center">
          <div className="grid grid-cols-3 gap-3 opacity-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full bg-text-primary/40"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {/* Title */}
        <h3 className="gradient-text font-heading text-xl font-bold">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>

        {/* Tech badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <span
              key={tech}
              className={cn(
                "rounded-md border border-border-subtle bg-bg-secondary/50 px-2 py-0.5",
                "text-xs font-medium text-text-muted"
              )}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        {(href || github) && (
          <div className="mt-5 flex items-center gap-3 border-t border-border-subtle pt-4">
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium",
                  "bg-accent-blue/10 text-accent-blue",
                  "transition-all duration-300",
                  "hover:bg-accent-blue/20 hover:shadow-[0_0_16px_rgba(59,130,246,0.2)]"
                )}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium",
                  "border border-border-subtle text-text-secondary",
                  "transition-all duration-300",
                  "hover:border-accent-blue/30 hover:text-text-primary"
                )}
              >
                <GithubIcon className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
