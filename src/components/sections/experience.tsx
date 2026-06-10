"use client";

import { DATA } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { TimelineItem } from "@/components/ui/timeline-item";

export function Experience() {
  return (
    <section id="work" className="py-20 lg:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey"
        />

        <div className="relative">
          {DATA.experience.map((exp, index) => (
            <TimelineItem
              key={`${exp.company}-${exp.period}`}
              company={exp.company}
              role={exp.role}
              period={exp.period}
              description={exp.description}
              technologies={exp.technologies}
              isLast={index === DATA.experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
