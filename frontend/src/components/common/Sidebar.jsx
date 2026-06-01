import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Kanban, 
  Calendar, 
  Users, 
  Terminal, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import Logo from './Logo';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Kanban Board', icon: Kanban, to: '/kanban' },
  { label: 'Calendar View', icon: Calendar, to: '/calendar' },
  { label: 'Team Directory', icon: Users, to: '/team' },
  { label: 'Admin Terminal', icon: Terminal, to: '/admin' },
  { label: 'Settings & UI', icon: Settings, to: '/settings' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const setFromMatch = () => setIsOpen(mq.matches);
    setFromMatch();
    mq.addEventListener?.('change', setFromMatch);
    return () => mq.removeEventListener?.('change', setFromMatch);
  }, []);

  const closeMobileSidebar = () => {
    if (!window.matchMedia('(min-width: 1024px)').matches) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg glass glow-border hover:shadow-glow-purple transition-all"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <motion.div
        initial={false}
        animate={{ width: isOpen ? 280 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen overflow-hidden z-40"
      >
        <div className="w-[280px] h-full glass glow-border rounded-none border-l-0 border-t-0 border-b-0 flex flex-col p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-3">
              <Logo className="h-12 w-12 rounded-2xl border border-white/10 shadow-glow-purple" />
              <div>
                <p className="text-lg font-semibold text-text-primary">TaskMaster</p>
                <p className="text-xs text-text-secondary">Premium SaaS dashboard</p>
              </div>
            </div>
          </motion.div>

          <nav className="flex-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const aliasActive = item.to === '/dashboard' && location.pathname === '/overview';

              return (
                <NavLink
                  key={index}
                  to={item.to}
                  onClick={closeMobileSidebar}
                >
                  {({ isActive }) => {
                    const active = isActive || aliasActive;
                    return (
                      <motion.div
                        whileHover={{ x: 8 }}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl mb-2 relative group smooth-transition ${active ? 'glass glow-border shadow-glow-purple bg-white/10' : 'hover:bg-white/5'}`}
                      >
                        <Icon
                          size={20}
                          className={`smooth-transition ${active ? 'text-accent-purple' : 'text-text-secondary group-hover:text-accent-purple'}`}
                        />
                        <span className="text-sm font-medium text-left text-text-primary">{item.label}</span>

                        {active && (
                          <motion.span
                            layoutId="activeIndicator"
                            initial={false}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-purple"
                          />
                        )}
                      </motion.div>
                    );
                  }}
                </NavLink>
              );
            })}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4 border-t border-white/10"
          >
            <p className="text-xs text-text-secondary text-center">
              TaskMaster v1.0
            </p>
          </motion.div>
        </div>
      </motion.div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </>
  );
}
