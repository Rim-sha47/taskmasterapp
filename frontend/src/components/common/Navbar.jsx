import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bell} from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import Logo from './Logo';

const pageMap = {
  '/dashboard': { label: 'Dashboard', subtitle: 'Overview' },
  '/overview': { label: 'Dashboard', subtitle: 'Overview' },
  '/kanban': { label: 'Kanban Board', subtitle: 'Task workflow' },
  '/calendar': { label: 'Calendar View', subtitle: 'Schedule and events' },
  '/team': { label: 'Team Directory', subtitle: 'Team members and roles' },
  '/admin': { label: 'Admin Terminal', subtitle: 'System controls and logs' },
  '/settings': { label: 'Settings & UI', subtitle: 'Personalize your workspace' },
};

const notifications = [
  { id: 1, title: 'Task completed', description: 'Finish homepage review', time: '2m ago', unread: true },
  { id: 2, title: 'New task assigned', description: 'Design system audit', time: '15m ago', unread: true },
  { id: 3, title: 'Team member joined', description: 'Lina joined Marketing', time: '1h ago', unread: false },
  { id: 4, title: 'System update', description: 'New dashboard features available', time: 'Yesterday', unread: false },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const currentPage = useMemo(() => pageMap[location.pathname] || pageMap['/dashboard'], [location.pathname]);
  const unreadCount = notifications.filter((notification) => notification.unread).length;

  const handleLogout = () => {
    localStorage.removeItem('taskmaster_auth');
    navigate('/login', { replace: true });
  };

  const handleOverviewClick = () => {
    navigate('/overview', { replace: true });
  };

  useEffect(() => {
    const onClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 right-0 left-0 lg:left-[280px] z-30 glass glow-border border-t-0 border-l-0 rounded-none border-r-0"
    >
      <div className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="rounded-2xl bg-white/5 px-3 py-1 text-xs text-text-secondary">
            {currentPage.label}
          </div>
          <div className="text-text-secondary text-sm flex items-center gap-2">
            <span> / </span>
            <button
              type="button"
              onClick={handleOverviewClick}
              className="text-text-primary font-medium hover:text-accent-cyan smooth-transition"
            >
              Overview
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3 w-full lg:w-auto">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search tasks, team, calendar..."
              className="w-full rounded-2xl border border-white/10 bg-[#0f172a] py-3 pl-11 pr-4 text-sm text-text-primary outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20"
            />
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative p-2 rounded-lg glass glow-border hover:shadow-glow-cyan smooth-transition"
            >
              <Bell size={18} className="text-text-secondary" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex h-2.5 w-2.5 rounded-full bg-accent-cyan ring-2 ring-black" />
              )}
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 z-40 mt-3 w-[320px] rounded-3xl border border-white/10 bg-[#070B14] p-4 shadow-glow-cyan"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Notifications</p>
                    <p className="text-xs text-text-secondary">Recent activity and updates</p>
                  </div>
                  <span className="text-xs text-accent-cyan">{unreadCount} new</span>
                </div>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="glass border border-white/10 rounded-3xl p-4">
                      <p className="text-sm font-semibold text-text-primary">{notification.title}</p>
                      <p className="text-xs text-text-secondary mt-1">{notification.description}</p>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-text-secondary">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-full glass glow-border border border-accent-purple/30 flex items-center justify-center hover:shadow-glow-purple smooth-transition"
          >
            <Logo className="h-8 w-8 rounded-xl" />
          </motion.button>

          
        </div>
      </div>
    </motion.nav>
  );
}
