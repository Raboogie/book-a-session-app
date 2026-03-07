
## Book-a-Session — Full-Stack React Web Application

---

### Overview
A full-stack session-booking platform that enables users to discover, book, and manage learning sessions with subject-matter experts. The application features a complete authentication system, role-protected routes, and persistent client-side state, delivering a seamless, production-ready user experience.

---

### Core Features

- **Secure Authentication System** — Implemented a JWT-based auth flow with short-lived access tokens stored in memory and long-lived refresh tokens delivered via HttpOnly cookies, protecting against XSS and CSRF attack vectors.
- **Automatic Token Refresh** — Engineered Axios request/response interceptors that silently renew expired access tokens in the background, maintaining an uninterrupted user session without manual re-login.
- **Protected Routing** — Built a `ProtectedRoute` component using React Router v7 that guards privileged pages (Profile, Create Session), redirecting unauthenticated users to the login page while preserving a loading state during token validation on mount.
- **Session Booking Flow** — Users can browse all available sessions, view detailed session pages, and book sessions through a modal-driven confirmation interface.
- **Create-a-Session (Instructor View)** — Authenticated instructors can create new sessions via a validated multi-field form backed by Zod schemas and React Hook Form, with real-time inline error feedback.
- **Persistent State Management** — Leveraged Zustand with the `persist` middleware to synchronize booked session state to `localStorage`, ensuring bookings survive page refreshes.
- **Global State with Context API** — Managed user authentication state and booked session data using React Context, providing clean, prop-drilling-free access throughout the component tree.
- **Server State & Caching** — Integrated TanStack Query (React Query) for declarative data fetching, automatic caching, background refetching, and loading/error state handling.
- **Form Validation** — Applied schema-driven validation with Zod and `@hookform/resolvers`, providing type-safe form data and descriptive user-facing error messages.
- **Component Testing** — Achieved test coverage across key components (NavBar, BookSession, SessionItem, UpcomingSession) using Jest and React Testing Library, with coverage reporting via Istanbul.

---

### Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | React 18, TypeScript 5.7 |
| **Routing** | React Router v7 |
| **Server State** | TanStack React Query v5 |
| **Client State** | Zustand v5 (with persistence middleware), React Context API |
| **HTTP Client** | Axios (with request/response interceptors) |
| **Forms & Validation** | React Hook Form v7, Zod v4 |
| **Styling** | Tailwind CSS v3, Chakra UI v3, CSS Modules |
| **Build Tool** | Vite v6 |
| **Testing** | Jest v29, React Testing Library v16 |
| **Linting** | ESLint 9, TypeScript-ESLint, TanStack Query ESLint Plugin |


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
