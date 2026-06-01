import { Routes, Route, Navigate } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import DashboardPage from './pages/DashboardPage';
import Kanban from './pages/Kanban';
import CalendarPage from './pages/Calendar';
import Team from './pages/Team';
import AdminTerminal from './pages/AdminTerminal';
import Settings from './pages/Settings';

export default function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/overview" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/team" element={<Team />} />
            <Route path="/admin" element={<AdminTerminal />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </SearchProvider>
  );
}
