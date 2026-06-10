"use client";

import { DATA } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";

export function Projects() {
  return (
    <section id="projects" className="py-20 lg:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Featured Projects"
          subtitle="Things I've built"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DATA.projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              href={project.href}
              github={project.github}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
