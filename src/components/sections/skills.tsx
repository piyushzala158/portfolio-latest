"use client";

import { motion } from "framer-motion";
import { DATA } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillBadge } from "@/components/ui/skill-badge";
import type { SkillCategory } from "@/types/portfolio";

const categoryOrder: SkillCategory[] = [
  "Frontend",
  "State Management",
  "Styling",
  "Backend",
  "Auth & Security",
  "Tools & Platforms",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const groupVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Skills() {
  const skillsByCategory = categoryOrder.map((category) => ({
    category,
    skills: DATA.skills.filter((skill) => skill.category === category),
  }));

  return (
    <section id="skills" className="py-20 lg:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Technologies I work with"
        />

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillsByCategory.map(({ category, skills }) => (
            <motion.div key={category} variants={groupVariants}>
              <h3 className="text-sm font-medium text-accent-blue uppercase tracking-wider mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <SkillBadge key={skill.name} name={skill.name} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
