# Premium Online Resume Platform Plan

## 1) Product Vision
Build a premium personal brand platform (not just a static CV) that:
- Presents your profile as a modern, executive-level portfolio.
- Demonstrates technical depth with interactive project showcases.
- Captures leads (recruiters/clients) through high-conversion contact workflows.
- Supports ongoing content updates (projects, skills, testimonials, achievements).

---

## 2) Recommended Architecture (MERN + TypeScript)

### Frontend
- **React + TypeScript + Vite** for speed, type safety, and maintainability.
- **Tailwind CSS** + component system for premium, consistent UI.
- **Framer Motion** for refined animations/micro-interactions.
- **React Router** for clean routing and SEO-friendly page structure.
- **React Query (TanStack Query)** for server-state management.

### Backend
- **Node.js + Express + TypeScript**.
- **MongoDB + Mongoose** for content data and contact submissions.
- **JWT auth** for admin dashboard access.
- **Cloudinary/S3** for media hosting.
- **Rate limiting + validation + logging** for production-grade reliability.

### Deployment
- Frontend: **Vercel** or **Netlify**.
- Backend API: **Render**, **Railway**, or **Fly.io**.
- Database: **MongoDB Atlas**.
- CI/CD: **GitHub Actions** for lint/test/build/deploy checks.

---

## 3) Experience & Design Strategy (Premium Look)

### Visual Language
- Minimal, high-contrast palette (2 neutrals + 1 accent).
- Strong typography pair (display + body) with clear hierarchy.
- Large spacing and glass/soft-shadow cards for premium feel.
- Professional motion: subtle, purposeful, never distracting.

### Key Pages
1. **Home**: Hero, value proposition, top achievements, CTA.
2. **About**: Career story, strengths, timeline, downloadable resume.
3. **Projects**: Case-study style cards with impact metrics.
4. **Skills**: Categorized matrix (frontend/backend/cloud/devops/tools).
5. **Testimonials**: Quotes from managers/clients/peers.
6. **Contact**: Smart form, meeting link, social/professional profiles.
7. **Admin (private)**: Manage projects, skills, testimonials, content blocks.

### Conversion Features
- Sticky “Hire Me / Book a Call” CTA.
- One-click resume download.
- Contact form with inquiry type and intent fields.
- Auto email acknowledgment after submission.

---

## 4) Backend Feature Plan

### Core API Modules
- `auth`: admin login, refresh token, role checks.
- `profile`: bio, headline, location, availability, links.
- `projects`: CRUD + tags + featured ordering.
- `skills`: CRUD + proficiency + category.
- `testimonials`: CRUD + approval status.
- `contact`: submit inquiry + anti-spam + admin read/update status.
- `analytics`: page hit summaries (optional).

### Security & Reliability
- Input validation with Zod/Joi.
- `helmet`, CORS policy, API rate limiting.
- Sanitization against injection/XSS.
- Structured logging and centralized error handling.
- Environment-based configs and secret management.

---

## 5) Data Model (High Level)

- **User/Admin**: email, password hash, role.
- **Profile**: name, title, summary, social links, resume URL.
- **Project**: title, problem, solution, stack, metrics, media, links, featured flag.
- **Skill**: name, category, level, years.
- **Testimonial**: author, role, company, quote, avatar, approved.
- **ContactSubmission**: name, email, company, message, status, createdAt.

---

## 6) 6-Week Delivery Roadmap

### Week 1 — Foundation
- Finalize brand direction and wireframes.
- Initialize monorepo (`client` + `server`) with TypeScript.
- Setup linting/formatting, env strategy, and shared constants.

### Week 2 — Frontend System
- Build layout shell, navigation, and responsive design tokens.
- Implement Home, About, Skills page structures.
- Build reusable components (buttons, cards, badges, sections).

### Week 3 — Backend Core
- Create Express server architecture and MongoDB connection.
- Implement auth, profile, projects, skills endpoints.
- Add validation, error middleware, and security middleware.

### Week 4 — Dynamic Content
- Connect frontend to API using React Query.
- Implement Projects and Testimonials with filtering/sorting.
- Add admin login and protected dashboard routes.

### Week 5 — Polish & Conversion
- Add premium animations and loading/skeleton states.
- Implement contact workflow + email notifications.
- Optimize SEO metadata and social share previews.

### Week 6 — Production Readiness
- Add tests (unit + integration), accessibility pass, performance tuning.
- Setup CI/CD pipelines and deployment environments.
- Final QA, launch checklist, and post-launch monitoring.

---

## 7) Quality Bar (Professional Standard)

### Performance
- Lighthouse targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.
- Lazy load media, optimize images, split routes.

### Accessibility
- Keyboard navigability, semantic HTML, focus states.
- WCAG-friendly contrast and labels/ARIA where required.

### SEO
- Structured metadata (Open Graph, Twitter cards).
- Sitemap + robots + canonical URLs.
- Schema markup for Person/Portfolio.

### Testing
- Frontend: Vitest + React Testing Library.
- Backend: Jest + Supertest.
- End-to-end smoke checks for core flows.

---

## 8) Suggested Folder Structure

```text
SBA_307_Project/
  client/
    src/
      components/
      pages/
      features/
      hooks/
      services/
      styles/
      types/
  server/
    src/
      config/
      modules/
      middleware/
      utils/
      types/
      app.ts
      server.ts
```

---

## 9) Immediate Next Steps (Actionable)
1. Confirm visual direction (dark premium vs light premium).
2. Confirm core sections and content priority.
3. Start with a TypeScript MERN scaffold in this repo (`client` + `server`).
4. Implement MVP pages first (Home, Projects, Contact).
5. Launch v1 quickly, then iterate with analytics data.

---

## 10) Nice-to-Have Enhancements (Phase 2)
- Blog/insights section for thought leadership.
- Recruiter dashboard link with custom resume versions.
- CMS integration (Sanity/Contentful) for non-technical editing.
- AI-assisted project summary generator.
- Multi-language support.

---

## 11) Where to Apply This in Your Current Repo

You should apply this plan directly inside **this repository** (`/workspace/SBA_307_Project`) by evolving it from a static site into a full-stack app:

1. **Keep current static pages as reference only**
   - Existing files in `public/` and `css/` are your baseline content/style reference.

2. **Create two top-level apps in the same repo**
   - `client/` → React + TypeScript + Tailwind frontend (your premium resume UI).
   - `server/` → Node + Express + TypeScript backend (API, auth, contact handling).

3. **Move your current content into structured data**
   - Profile/About text → `server` profile module.
   - Project cards/skills/tags → `projects` and `skills` collections.
   - Contact form → `contact` API + MongoDB submissions.

4. **Deploy split architecture**
   - Frontend (`client`) on Vercel/Netlify.
   - Backend (`server`) on Render/Railway/Fly.io.
   - MongoDB Atlas for data persistence.

5. **Use the roadmap in execution order**
   - Week 1–2: build `client` design system and pages.
   - Week 3–4: build `server` APIs and connect from frontend.
   - Week 5–6: polish, test, optimize, and launch.

In short: apply the plan in **this repo** by introducing `client/` and `server/`, then gradually replacing static HTML with dynamic, production-grade modules.

