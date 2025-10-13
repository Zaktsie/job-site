# Job Site Portal

A modern job listing and career portal built with **Vue 3**, **Pinia**, and **Vite**.  
This project features a responsive job results layout, authentication-aware navigation, and a fully tested component suite.

---

## 🚀 Features

- 🧭 **Dynamic Navigation**
    - Conditionally renders user profile and sub-navigation (`TheSubnav`) based on login state.
    - Centralized authentication state management via **Pinia**.

- 💼 **Job Listings**
    - Interactive and responsive job result cards (`JobListing.vue`).
    - Clean layout with consistent spacing and hover states.

- 🧪 **Comprehensive Unit Testing**
    - Built using **@testing-library/vue** and **@pinia/testing**.
    - Tests for navigation, job listings, and shared components ensure reliability and confidence in UI behavior.

- 🧰 **Modern Stack**
    - Vue 3 (Composition + Options API)
    - Vite for fast dev environment
    - Pinia for store management
    - Jest + Vue Testing Library for unit tests

---

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/job-site.git
   cd job-site
