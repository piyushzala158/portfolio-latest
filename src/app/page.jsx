"use client";

import React from "react";
import { motion } from "framer-motion";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { AnimatedBackground } from "@/components/animated-background";
import { FloatingSidebar } from "@/components/floating-sidebar";
import { SkillBubbles } from "@/components/skill-bubbles";
import { ProjectCarousel } from "@/components/project-carousel";
import { AnimatedTimeline } from "@/components/animated-timeline";
import { Icons } from "@/components/icons";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <>
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Floating Sidebar */}
      <FloatingSidebar />

      <main className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center px-6"
        >
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <p className="text-primary font-medium text-lg">Hello, I'm</p>
                  <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="gradient-text">
                      {DATA.name.split(" ")[0]}
                    </span>
                    <br />
                    <span className="text-foreground">
                      {DATA.name.split(" ")[1]}
                    </span>
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                    {DATA.description}
                  </p>

                  <div className="flex gap-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                      onClick={() =>
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Get In Touch
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 glass-card rounded-full font-semibold hover:bg-primary/20 transition-all duration-300"
                      onClick={() =>
                        document
                          .getElementById("projects")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      View Projects
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Avatar and floating elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Main avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="relative z-10"
                >
                  <div className="w-80 h-80 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 p-2 floating-animation">
                    <Avatar className="w-full h-full">
                      <AvatarImage
                        src={DATA.avatarUrl}
                        alt={DATA.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-6xl font-bold">
                        {DATA.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </motion.div>

                {/* Floating decoration elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -top-10 -right-10 w-20 h-20 glass-card rounded-2xl flex items-center justify-center floating-animation"
                  style={{ animationDelay: "1s" }}
                >
                  <span className="text-2xl">⚡</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 }}
                  className="absolute -bottom-10 -left-10 w-16 h-16 glass-card rounded-2xl flex items-center justify-center floating-animation"
                  style={{ animationDelay: "2s" }}
                >
                  <span className="text-xl">🚀</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="absolute top-1/2 -left-20 w-12 h-12 glass-card rounded-full flex items-center justify-center floating-animation"
                  style={{ animationDelay: "0.5s" }}
                >
                  <span className="text-lg">💻</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card p-8 lg:p-12 rounded-3xl"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold gradient-text mb-4">
                  About Me
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
              </div>

              <div className="prose prose-lg max-w-none text-center">
                <Markdown className="text-muted-foreground leading-relaxed">
                  {DATA.summary}
                </Markdown>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold gradient-text mb-4">
                Skills & Technologies
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Technologies and tools I use to bring ideas to life
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <SkillBubbles skills={DATA.skills} />
            </motion.div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="work" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold gradient-text mb-4">
                Work Experience
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                My professional journey and the amazing companies I've worked
                with
              </p>
            </motion.div>

            <AnimatedTimeline items={DATA.work} />
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold gradient-text mb-4">
                Education
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Learning experiences that shaped my development journey
              </p>
            </motion.div>

            <AnimatedTimeline items={DATA.education} />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold gradient-text mb-4">
                Featured Projects
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Showcase of my recent work and personal projects
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ProjectCarousel projects={DATA.projects} />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-card p-12 rounded-3xl"
            >
              <h2 className="text-4xl font-bold gradient-text mb-6">
                Let's Connect
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                I'm always interested in new opportunities and collaborations.
                Feel free to reach out if you'd like to work together!
              </p>

              <div className="flex justify-center gap-6 mb-8">
                {Object.entries(DATA.contact.social)
                  .filter(([_, social]) => social.navbar)
                  .map(([name, social]) => (
                    <motion.a
                      key={name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card p-4 rounded-xl hover:bg-primary/20 transition-all duration-300 group"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.a>
                  ))}
              </div>

              <motion.a
                href={`mailto:${DATA.contact.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icons.email className="w-5 h-5" />
                Send me an email
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-border/50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">
              © 2024 {DATA.name}. Built with Next.js, Tailwind CSS, and Framer
              Motion.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
