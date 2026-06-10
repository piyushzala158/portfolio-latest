"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { DATA } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { SocialLink } from "@/components/ui/social-link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <SectionHeading title="Contact" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <GlassCard className="p-12 text-center" hover={false}>
            <motion.h3
              variants={itemVariants}
              className="gradient-text text-4xl font-heading font-bold mb-4"
            >
              Let&apos;s Work Together
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-lg mb-8 max-w-md mx-auto"
            >
              I&apos;m always open to new opportunities and collaborations
            </motion.p>

            <motion.div variants={itemVariants} className="mb-8">
              <motion.a
                href={`mailto:${DATA.email}`}
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium text-white bg-gradient-to-r from-accent-blue to-accent-violet transition-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                {DATA.email}
              </motion.a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-4"
            >
              {DATA.social.map((social) => (
                <SocialLink
                  key={social.name}
                  name={social.name}
                  url={social.url}
                  icon={social.icon}
                />
              ))}
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
