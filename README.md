# Nitesh Gupta | AI Portfolio That Talks Back

Most portfolios ask visitors to scroll.
This one invites them to talk.

An interactive portfolio built with `Next.js`, `React`, `Three.js`, and `Gemini`, designed to feel less like a resume page and more like a live conversation with an AI/ML builder.

## Why This Repo Sticks

- `Interactive first`: visitors can chat with an AI assistant instead of hunting through sections.
- `Visual memory`: animated avatar, lamp-based theme switch, and custom cursor effects make the experience feel alive.
- `Builder identity`: the project reflects AI, machine learning, frontend craft, and product thinking in one place.
- `Recruiter friendly`: projects, skills, resume, and contact details are surfaced through guided conversation.

## Core Experience

- AI portfolio assistant powered by `@google/generative-ai`
- Context-aware replies using portfolio, resume, skills, and project data
- Smooth light/dark scene transition with lamp interaction
- Animated avatar and immersive UI
- Custom fluid and canvas cursor effects
- Project showcase, profile, skills, and resume-driven content

## Tech Stack

- `Next.js 16`
- `React 19`
- `Three.js`
- `@react-three/fiber`
- `@react-three/drei`
- `Tailwind CSS 4`
- `Google Gemini API`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Environment Variables

Create a `.env.local` file with:

```env
GEMINI_API_KEY=your_api_key_here
```

Without this key, the portfolio UI will still load, but AI chat responses will not work correctly.

## Project Structure

```text
src/
  app/
    api/chat/        # Gemini-powered portfolio chat route
    page.js          # Main interactive landing experience
  components/        # Avatar, chat, hero, projects, cursor, lamp UI
  data/              # Profile, skills, contacts, projects, resume content
  hooks/             # Theme, chat, and cursor behavior
public/              # Images, icons, resume, 3D assets
```

## What Makes It Different

This is not a static portfolio with a better color palette.
It is a personal brand experience built around interaction, mood, and recall.

Instead of saying "here are my skills," it lets people discover them.
Instead of saying "I work in AI," it demonstrates AI inside the product itself.

That difference is what makes people remember it.

## Featured Themes In The Work

- AI-powered products
- Machine learning projects
- Conversational interfaces
- Responsive frontend development
- Personal branding through product design

## If You Want To Adapt This

Update these files first:

- `src/data/profile.js`
- `src/data/projects.js`
- `src/data/skills.js`
- `src/data/contacts.js`
- `src/data/resumeText.js`

Then replace placeholder links and assets inside `public/` with your own material.

## Suggested GitHub Repo Description

`An interactive AI portfolio built with Next.js, Three.js, and Gemini that lets visitors explore projects, skills, and resume through conversation.`

## Suggested Topics

`portfolio` `nextjs` `react` `threejs` `generative-ai` `gemini-api` `machine-learning` `personal-website` `ai-portfolio`

---

If a normal portfolio gets viewed, this one gets remembered.
