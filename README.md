# Piyush Zala Portfolio

A modern, animated portfolio site for showcasing my work as a Frontend Software Engineer. It is designed to feel personal and polished while keeping the content easy to scan: experience, skills, projects, education, and a direct path to contact.

## What’s Inside

- A strong hero section with a short intro and social links
- About, Skills, Experience, Education, Projects, and Contact sections
- Smooth scrolling navigation with section awareness
- Glassmorphism-inspired UI, aurora-style background, and subtle motion
- Theme switching with a persistent light/dark experience
- A responsive layout that works well on desktop and mobile

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- next-themes
- lucide-react

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for production

```bash
npm run build
```

### Start the production server

```bash
npm run start
```

### Lint the codebase

```bash
npm run lint
```

## Project Structure

```text
src/
  app/          # App Router entry points, layout, global styles
  components/   # Layout, sections, and reusable UI pieces
  data/         # Portfolio content and navigation data
  hooks/        # Custom hooks such as scroll spying
  lib/          # Utility helpers
  types/        # Shared TypeScript types
```

The homepage is composed in [`src/app/page.tsx`](src/app/page.tsx), which stitches together the portfolio sections in a single landing page experience.

## Customization

Most of the public-facing content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts). Update that file if you want to:

- change the biography or tagline
- swap in new skills or project highlights
- update social links, contact details, or location
- add or remove resume sections

## Deployment

This project is ready to deploy on Vercel or any platform that supports Next.js. Set the usual production environment variables if you add any, then run `npm run build` to verify the app before shipping.

## A Note on the Design

The UI leans into depth, gradients, glass panels, and motion instead of a plain template look. The goal is to make the portfolio feel like a real product, not just a resume page.
