"use client";

import { DATA } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { TimelineItem } from "@/components/ui/timeline-item";

export function Education() {
  return (
    <section id="education" className="py-20 lg:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading title="Education" />

        <div className="relative">
          {DATA.education.map((edu, index) => (
            <TimelineItem
              key={`${edu.institution}-${edu.period}`}
              company={edu.institution}
              role={edu.degree}
              period={edu.period}
              description={
                edu.description ? [edu.description] : []
              }
              isLast={index === DATA.education.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
