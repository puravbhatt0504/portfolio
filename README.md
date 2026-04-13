# Neon Rift Portfolio

High-impact portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lenis smooth scrolling.

## Features

- Full-screen storytelling layout with snap sections and hidden native scrollbar
- Framer Motion animations across hero, timeline, project cards, modals, and section reveals
- Route-level transitions across Home, About, Work, and Lab pages with animated nav states
- Custom animated cursor with interactive hover states
- 3D-style tilt cards and depth-based visual effects
- React Three Fiber hero scene with particle tunnel aesthetics
- GitHub API integration (profile, repositories, language breakdown)
- GitHub GraphQL pinned repositories (with REST starred fallback)
- Server-side data fetching with revalidation for caching (ISR)
- Responsive design with desktop-first visual direction

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lenis
- Three.js + React Three Fiber

## Environment

1. Copy `.env.example` to `.env.local`
2. Set your GitHub identity

```bash
GITHUB_USERNAME=your-github-username
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Optional for higher GitHub API limits:

```bash
GITHUB_TOKEN=your-github-personal-access-token
```

Note: real pinned repositories require `GITHUB_TOKEN` (GraphQL). Without a token, the app automatically falls back to most-starred REST repositories.

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Validation

```bash
npm run lint
npm run build
```

## Project Structure

```text
src/
	app/
		globals.css
		layout.tsx
		page.tsx
	components/
		portfolio-shell.tsx
		providers/
			smooth-scroll-provider.tsx
		sections/
			hero-section.tsx
			skills-section.tsx
			projects-section.tsx
			timeline-section.tsx
			contact-section.tsx
		ui/
			custom-cursor.tsx
			magnetic-button.tsx
			reveal.tsx
			tilt-card.tsx
	hooks/
		use-motion-sound.ts
	lib/
		cn.ts
		github.ts
	types/
		github.ts
```
