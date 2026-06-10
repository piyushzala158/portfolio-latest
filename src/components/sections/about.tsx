"use client";

import { motion } from "framer-motion";
import { DATA } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";

export function About() {
  return (
    <section id="about" className="py-20 lg:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="About Me" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <GlassCard className="p-8 lg:p-12" hover={false}>
            <p className="text-lg leading-relaxed text-text-secondary max-w-3xl mx-auto text-center">
              {DATA.summary}
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
