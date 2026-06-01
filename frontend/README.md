 TaskMasterApp

TaskMasterApp is a React + Vite frontend for a task management dashboard built with Tailwind CSS, React Router, and Recharts. It includes pages for login, dashboard overview, kanban board, calendar, team management, admin terminal, and settings.

## Key Features
- Dashboard overview with analytics and task insights
- Kanban board for task status tracking
- Calendar view for schedule planning
- Team page for managing collaborators
- Admin terminal / settings pages for app controls
- Protected routing with local authentication state
- Smooth animations via Framer Motion

## Tech Stack
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Recharts
- Framer Motion
- ESLint

## Project Structure
```
frontend/
  public/
  src/
    assets/
    components/
      common/
      dashboard/
      charts/
    context/
    layouts/
    pages/
    routes/
  package.json
  vite.config.js
```

## Getting Started
1. Open a terminal in the repository root.
2. Change into the frontend folder:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL shown in the terminal to view the app.

## Available Scripts
From the `frontend` folder:
- `npm run dev` - start development server
- `npm run build` - build production assets
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint over the project

## Notes
- Authentication is handled locally via `localStorage` and redirects to `/login` when not authenticated.
- This repository currently contains the frontend application only.

## License
This project does not include a license file. Add one if you plan to share or publish the code.
