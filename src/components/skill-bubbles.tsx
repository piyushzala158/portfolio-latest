"use client";

import React from "react";
import { motion } from "framer-motion";

interface SkillBubbleProps {
  skill: string;
  index: number;
}

const skillColors = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-orange-500",
  "from-red-500 to-rose-500",
  "from-indigo-500 to-purple-500",
  "from-teal-500 to-green-500",
  "from-pink-500 to-rose-500",
];

function SkillBubble({ skill, index }: SkillBubbleProps) {
  const colorClass = skillColors[index % skillColors.length];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 },
      }}
      className="group relative"
    >
      <div
        className={`
        relative px-6 py-3 rounded-full glass-card 
        bg-gradient-to-r ${colorClass} bg-opacity-10
        border border-white/20 backdrop-blur-sm
        hover:shadow-lg hover:shadow-purple-500/25
        transition-all duration-300
        cursor-pointer
      `}
      >
        <span className="relative z-10 font-medium text-sm text-foreground group-hover:text-white transition-colors duration-300">
          {skill}
        </span>

        {/* Gradient overlay on hover */}
        <motion.div
          className={`
            absolute inset-0 rounded-full bg-gradient-to-r ${colorClass} opacity-0 
            group-hover:opacity-20 transition-opacity duration-300
          `}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.2 }}
        />

        {/* Glow effect */}
        <motion.div
          className={`
            absolute inset-0 rounded-full bg-gradient-to-r ${colorClass} opacity-0 blur-xl
            group-hover:opacity-30 transition-opacity duration-300 -z-10
          `}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

interface SkillBubblesProps {
  skills: string[];
}

export function SkillBubbles({ skills }: SkillBubblesProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {skills.map((skill, index) => (
        <SkillBubble key={skill} skill={skill} index={index} />
      ))}
    </div>
  );
}
