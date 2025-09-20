"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  dates: string;
  technologies: string[];
  image?: string;
  video?: string;
  links?: Array<{
    type: string;
    href: string;
    icon: React.ReactNode;
  }>;
  href?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
  };

  if (!projects.length) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main carousel container */}
      <div className="relative h-[500px] overflow-hidden rounded-2xl glass-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 p-8 flex flex-col md:flex-row gap-6"
          >
            {/* Project Image/Video */}
            <div className="flex-1 relative group">
              <div className="w-full h-64 md:h-full rounded-xl overflow-hidden bg-muted/20 border border-white/10">
                {projects[currentIndex].image ? (
                  <motion.img
                    src={projects[currentIndex].image}
                    alt={projects[currentIndex].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                    <span className="text-4xl font-bold text-muted-foreground">
                      {projects[currentIndex].title.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Project Info */}
            <div className="flex-1 space-y-6">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold gradient-text mb-2">
                    {projects[currentIndex].title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {projects[currentIndex].dates}
                  </p>
                </motion.div>

                <motion.p
                  className="text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {projects[currentIndex].description}
                </motion.p>

                {/* Technologies */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="text-sm font-semibold text-foreground">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[currentIndex].technologies?.map((tech, index) => (
                      <motion.div
                        key={tech}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <Badge variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Links */}
                {projects[currentIndex].links && (
                  <motion.div
                    className="flex gap-4 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {projects[currentIndex].links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card hover:bg-primary/20 transition-all duration-300 group"
                      >
                        {link.icon}
                        <span className="text-sm font-medium">{link.type}</span>
                        <ExternalLink
                          size={14}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevProject}
        className="absolute left-4 top-1/2 -translate-y-1/2 glass-card p-3 rounded-full hover:bg-primary/20 transition-all duration-300 group"
        disabled={projects.length <= 1}
      >
        <ChevronLeft
          size={24}
          className="text-foreground group-hover:text-primary transition-colors"
        />
      </button>

      <button
        onClick={nextProject}
        className="absolute right-4 top-1/2 -translate-y-1/2 glass-card p-3 rounded-full hover:bg-primary/20 transition-all duration-300 group"
        disabled={projects.length <= 1}
      >
        <ChevronRight
          size={24}
          className="text-foreground group-hover:text-primary transition-colors"
        />
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToProject(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary scale-125"
                : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
