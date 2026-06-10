import type { ReactNode } from "react";
import { BriefcaseBusiness, Code2, ExternalLink, Mail, Trophy } from "lucide-react";
import { DATA } from "@/data/portfolio";
import type { Project, SkillCategory } from "@/types/portfolio";
import { collectibles, gameObjects } from "../../config/zones";
import type { GameObjectConfig } from "../../types";
import styles from "./game-zones.module.css";

const categoryOrder: SkillCategory[] = [
  "Frontend",
  "State Management",
  "Styling",
  "Backend",
  "Auth & Security",
  "Tools & Platforms",
];

export function GameZones({
  activeObject,
  collected,
}: {
  activeObject: string;
  collected: string[];
}) {
  const skillsByCategory = categoryOrder.map((category) => ({
    category,
    skills: DATA.skills.filter((skill) => skill.category === category),
  }));

  return (
    <>
      {gameObjects.map((object) => (
        <GameObjectCard key={object.id} object={object} active={activeObject === object.id}>
          {renderObjectContent(object, skillsByCategory)}
        </GameObjectCard>
      ))}
      {collectibles.map((collectible) => {
        const isCollected = collected.includes(collectible.id);
        return (
          <div
            key={collectible.id}
            className={`${styles.trophy} ${isCollected ? styles.collected : ""}`}
            style={{ left: collectible.x, top: collectible.y }}
            aria-label={`${collectible.label}: ${collectible.description}`}
          >
            <Trophy className="h-7 w-7" aria-hidden="true" />
            <span>{collectible.label}</span>
          </div>
        );
      })}
    </>
  );
}

function GameObjectCard({
  object,
  active,
  children,
}: {
  object: GameObjectConfig;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <article
      id={object.id}
      tabIndex={0}
      className={`${styles.card} ${styles[object.kind]} ${active ? styles.active : ""}`}
      style={{ left: object.x, top: object.y, width: object.width }}
      data-active={active ? "true" : "false"}
    >
      {children}
      {!active && object.kind !== "sign" ? (
        <p className={styles.prompt}>Approach to inspect</p>
      ) : null}
    </article>
  );
}

function renderObjectContent(
  object: GameObjectConfig,
  skillsByCategory: { category: SkillCategory; skills: { name: string }[] }[]
) {
  if (object.id === "spawn-panel") {
    return (
      <>
        <p className={styles.kicker}>Press Start</p>
        <h2>{DATA.name}</h2>
        <p>{DATA.description}</p>
        <div className={styles.chips}>
          <span>Jump</span>
          <span>Explore</span>
          <span>Discover</span>
        </div>
      </>
    );
  }

  if (object.id === "about-sign") {
    return (
      <>
        <p className={styles.kicker}>Signal station</p>
        <h2>About Me</h2>
        <p>{DATA.summary}</p>
        <div className={styles.chips}>
          <span>{DATA.location}</span>
          <span>3+ years</span>
        </div>
      </>
    );
  }

  if (object.id === "projects-heading") {
    return (
      <>
        <p className={styles.kicker}>Project platforms</p>
        <h2>Featured Builds</h2>
        <p>Step near each project node to expand the details and open available links.</p>
      </>
    );
  }

  if (object.id === "achievements-heading") {
    return (
      <>
        <p className={styles.kicker}>Milestone vault</p>
        <h2>Achievements</h2>
        <p>Collect trophies by walking near them. Your run progress is saved locally.</p>
      </>
    );
  }

  if (object.kind === "skills") {
    return <SkillsContent groups={skillsByCategory} />;
  }

  if (object.kind === "project") {
    const project = DATA.projects[object.projectIndex ?? 0];
    return <ProjectContent project={project} index={(object.projectIndex ?? 0) + 1} />;
  }

  if (object.kind === "timeline") {
    return <ExperienceContent />;
  }

  if (object.kind === "contact") {
    return <ContactContent />;
  }

  return null;
}

function SkillsContent({
  groups,
}: {
  groups: { category: SkillCategory; skills: { name: string }[] }[];
}) {
  return (
    <>
      <p className={styles.kicker}>Crystal cavern</p>
      <h2>Skills & Technologies</h2>
      <div className={styles.skillGrid}>
        {groups.map(({ category, skills }, index) => (
          <div key={category} className={styles.skillCard}>
            <Code2 className="h-4 w-4" aria-hidden="true" />
            <h3>{category}</h3>
            <div className={styles.meter} aria-hidden="true">
              <span style={{ width: `${76 + index * 3}%` }} />
            </div>
            <p>{skills.map((skill) => skill.name).join(" / ")}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function ProjectContent({ project, index }: { project: Project; index: number }) {
  return (
    <>
      <p className={styles.kicker}>Project {index}</p>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <div className={styles.chips}>
        {project.technologies.slice(0, 4).map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <div className={styles.links}>
        {project.href ? (
          <a href={project.href} target="_blank" rel="noreferrer">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Live
          </a>
        ) : null}
        {project.github ? (
          <a href={project.github} target="_blank" rel="noreferrer">
            <GithubIcon className="h-4 w-4" />
            Code
          </a>
        ) : null}
      </div>
    </>
  );
}

function ExperienceContent() {
  return (
    <>
      <p className={styles.kicker}>Timeline tower</p>
      <h2>Work Experience</h2>
      <div className={styles.timeline}>
        {DATA.experience.map((experience) => (
          <article key={`${experience.company}-${experience.period}`}>
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
            <div>
              <h3>{experience.role}</h3>
              <p>
                {experience.company} - {experience.period}
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function ContactContent() {
  const github = DATA.social.find((item) => item.name === "GitHub");
  const linkedin = DATA.social.find((item) => item.name === "LinkedIn");

  return (
    <>
      <p className={styles.kicker}>Final signal gate</p>
      <h2>Contact</h2>
      <p>Open a channel and start the next quest.</p>
      <div className={styles.contactGrid}>
        <a href={`mailto:${DATA.email}`}>
          <Mail className="h-5 w-5" aria-hidden="true" />
          Email
        </a>
        {github ? (
          <a href={github.url} target="_blank" rel="noreferrer">
            <GithubIcon className="h-5 w-5" />
            GitHub
          </a>
        ) : null}
        {linkedin ? (
          <a href={linkedin.url} target="_blank" rel="noreferrer">
            <LinkedinIcon className="h-5 w-5" />
            LinkedIn
          </a>
        ) : null}
      </div>
    </>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
