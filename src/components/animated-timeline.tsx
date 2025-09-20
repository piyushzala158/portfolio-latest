"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface TimelineItem {
  company: string;
  title: string;
  location: string;
  start: string;
  end?: string;
  description: string;
  logoUrl?: string;
  href?: string;
  badges?: string[];
}

interface AnimatedTimelineProps {
  items: TimelineItem[];
}

export function AnimatedTimeline({ items }: AnimatedTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 opacity-30" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={`${item.company}-${item.start}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative pl-20"
          >
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: index * 0.2 + 0.3,
                type: "spring",
                stiffness: 200,
              }}
              className="absolute left-6 top-6 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border-4 border-background shadow-lg"
            />

            {/* Content card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.1 }}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="glass-card p-6 rounded-2xl group hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Company logo */}
                {item.logoUrl && (
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 p-2 backdrop-blur-sm border border-white/20">
                    <img
                      src={item.logoUrl}
                      alt={item.company}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                )}

                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="text-xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
                        {item.company}
                      </h3>
                      {item.href && (
                        <Link
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ExternalLink
                            size={16}
                            className="text-muted-foreground hover:text-primary"
                          />
                        </Link>
                      )}
                    </div>

                    <h4 className="text-lg font-semibold text-primary">
                      {item.title}
                    </h4>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {item.start} - {item.end ?? "Present"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Badges */}
                  {item.badges && item.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.badges.map((badge, badgeIndex) => (
                        <motion.div
                          key={badge}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: index * 0.2 + 0.4 + badgeIndex * 0.1,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          <Badge variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
