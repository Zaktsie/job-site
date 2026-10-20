# Zak's Careers (Google Careers Replica)

A full-featured career and job search portal inspired by [Google Careers](https://www.google.com/about/careers), built with **Vue 3** (`<script setup>` Composition API), **Pinia**, **Vue Router 4**, **Tailwind CSS**, and **Vitest**.

---

## 🚀 Features

- **Home & Job Search (`/`):**
  - Dynamic rotating hero headline (`Build`, `Create`, `Design`, `Code` for everyone).
  - Role and location search bar that navigates to and filters job results.
  - Dynamic spotlight cards and "Life at Zak's Careers" culture & benefits showcase.
- **Multi-Faceted Job Filtering & Sorting (`/jobs/results`):**
  - Filter jobs in real time by **Role / Skills**, **Degrees** (`Associate`, `Bachelor's`, `Master's`, `Ph.D.`, `Pursuing Degree`), **Job Types** (`Full-time`, `Part-time`, `Intern`, `Temporary`), **Organizations**, **Locations**, and **Saved Jobs**.
  - Active filter chips with one-click removal and a **Clear Filters** action.
  - Sort job results by **Relevance** or **Date added (Newest)**.
  - Paginated job listings (10 per page) with dynamic matched job count in the sub-navigation bar.
- **Job Detail & Application Flow (`/jobs/results/:id`):**
  - Full job description, minimum and preferred qualifications, metadata badges, and similar roles from the same organization.
  - Interactive **Apply** modal (`<Teleport>`) with application status tracking (`Applied ✓`), **Save / Bookmark** toggle (`Saved ★`), and **Share** link copying.
- **Career Portal Sections:**
  - **Teams (`/teams`):** Browse engineering and product organizations with live open role counts.
  - **Locations (`/locations`):** Searchable global office directory with open job counts per city.
  - **How We Hire (`/hire`):** 6-step hiring process guide and interactive FAQ accordions.
  - **Students (`/students`):** Internships, university graduate tracks, and advanced degree programs with direct filtered job links.

---

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
make install
# or: npm install
```

### 2. Start Development Servers (Frontend + Mock API Backend)

```bash
make dev-full
# or: npm run dev:full
```

- **Frontend (Vite):** `http://localhost:5173`
- **Backend (`json-server`):** `http://localhost:3000` (`jobs`, `degrees`, `spotlights`)

### 3. Run Unit Tests & Linter

```bash
make test
make lint
```
