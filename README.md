# CA Monk Blog Application - Frontend Assignment

![Project Badge](https://img.shields.io/badge/Status-Completed-success) ![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Tailwind%20%7C%20TanStack%20Query-blue)

A premium, modern, and responsive Blog Application built for the CA Monk Frontend Interview assignment. This project demonstrates advanced mastery of React, state management, and modern UI/UX design principles.

## 🌟 Key Features

### 🎨 Premium UI/UX
- **Emerald Green Theme**: A carefully curated color palette centered around `emerald-500` and `teal-600` for a fresh, professional look.
- **Deep Dark Mode**: Fully supported dark mode with a pure black (`#000000`) background for OLED screens, togglable via the Navbar.
- **Glassmorphism**: Subtle backdrop blur effects on the Navbar and sticky elements.
- **Smooth Animations**: Transitions, hover effects, and parallax scrolling images powered by Tailwind CSS.

### 🚀 Functionality
- **CRUD Operations**:
  - **Create**: Write new stories with a rich editor experience (Live Preview included).
  - **Read**: Browse blogs with sorting (Latest, Oldest, A-Z) and category filtering.
- **Search & Filter**: Real-time search in Navbar and Mobile Menu.
- **Interactive Reading**:
  - **Text-to-Speech**: Listen to blog posts with a single click.
  - **Reading Progress**: Visual progress bar at the top of the article.

### 🛠 Tech Stack
- **Core**: React 18, TypeScript, Vite
- **State & Data**: TanStack Query (React Query) v5
- **Styling**: Tailwind CSS, Tailwind Animate
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **Backend**: JSON Server (Mock API)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd camonk-interview
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Backend API (JSON Server)
The application relies on a mock backend. Start it in a separate terminal:
```bash
npm run server
```
*Runs on: `http://localhost:3001`*

### 4. Start the Frontend Application
In a new terminal window:
```bash
npm run dev
```
*Runs on: `http://localhost:5173`*

---

## 📂 Project Structure

```bash
src/
├── components/       # Reusable UI components
│   ├── BlogList.tsx     # Grid view of blog cards
│   ├── BlogDetail.tsx   # Single blog view with rich features
│   ├── CreateBlogForm.tsx # Dual-mode (Write/Preview) editor
│   ├── Navbar.tsx       # Responsive navigation with Theme Toggle
│   └── ...
├── lib/
│   ├── api.ts           # Centralized API fetcher functions
│   └── utils.ts         # CN helper for Tailwind class merging
├── App.tsx           # Main routing and layout
├── index.css         # Global styles & Tailwind properties
└── main.tsx          # Entry point
```

---

## ✅ Assignment Checklist

This project successfully fulfills all assignment requirements and adds bonus features:

- [x] **Get All Blogs**: Fetched via TanStack Query with loading skeletons.
- [x] **Get Blog by ID**: Detailed view with dynamic routing.
- [x] **Create Blog**: Form with validation and cache invalidation.
- [x] **Responsive Design**: Mobile-first approach with custom mobile navigation.
- [x] **TanStack Query**: Used for caching, optimistic updates, and background refetching.
- [x] **Tailwind CSS**: Custom configuration, dark mode, and utility-first styling.
- [x] **Bonus**:
    - [x] **Theme Toggle**: Light/Dark/System support.
    - [x] **Accessibility**: Screen reader friendly, accessible form controls.
    - [x] **Validation**: Manual validation for valid URLs and required fields.

---

## 🎨 Design Showcase

### Light Mode
*Clean, crisp typography with Emerald accents.*

### Dark Mode
*High-contrast, eye-friendly dark mode with glowing green highlights.*

---

**Built with 💚 by [Your Name] for CA Monk.**
