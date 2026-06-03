import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearch } from '../context/SearchContext';

import PageWrapper from '../components/common/PageWrapper';
import GlowCard from '../components/common/GlowCard';

import {
  getDashboardStats,
  getNotifications,
} from '../services/adminService';

export default function AdminTerminal() {
  const { searchQuery } = useSearch();

  const [stats, setStats] = useState({
  totalTasks: 0,
  todo: 0,
  inProgress: 0,
  review: 0,
  completed: 0,

  totalMembers: 0,
  activeMembers: 0,

  totalEvents: 0,

  unreadNotifications: 0,
});
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchLogs();
  }, []);

  const fetchStats = async () => {
    try {
      const response =
        await getDashboardStats();

      setStats(response.data.stats);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response =
        await getNotifications();

      setLogs(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredLogs = useMemo(() => {
    const query =
      searchQuery.toLowerCase();

    if (!query) return logs;

    return logs.filter(
      (log) =>
        (log.title || '')
          .toLowerCase()
          .includes(query) ||
        (log.message || '')
          .toLowerCase()
          .includes(query)
    );
  }, [logs, searchQuery]);

  const systemData = [
  {
    title: 'Total Tasks',
    value: stats.totalTasks,
    detail: 'Tasks in database',
  },
  {
    title: 'Todo Tasks',
    value: stats.todo,
    detail: 'Pending work',
  },
  {
    title: 'In Progress',
    value: stats.inProgress,
    detail: 'Currently active',
  },
  {
    title: 'Completed',
    value: stats.completed,
    detail: 'Finished tasks',
  },
  {
    title: 'Total Members',
    value: stats.totalMembers,
    detail: 'Registered members',
  },
  {
    title: 'Active Members',
    value: stats.activeMembers,
    detail: 'Currently active',
  },
  {
    title: 'Total Events',
    value: stats.totalEvents,
    detail: 'Scheduled events',
  },
  {
    title: 'Unread Notifications',
    value: stats.unreadNotifications,
    detail: 'Pending notifications',
  },
];

  return (
    <PageWrapper
      title="Admin Terminal"
      subtitle="Monitor system health, logs and activity."
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {systemData.map((item) => (
              <GlowCard
                key={item.title}
                className="p-6"
                glowColor="purple"
              >
                <p className="text-sm text-text-secondary">
                  {item.title}
                </p>

                <p className="mt-3 text-3xl font-semibold text-text-primary">
                  {item.value}
                </p>

                <p className="mt-2 text-sm text-text-secondary">
                  {item.detail}
                </p>
              </GlowCard>
            ))}
          </div>

          <GlowCard
            className="p-6"
            glowColor="cyan"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">
                  Command Console
                </h3>

                <p className="text-text-secondary text-sm">
                  Live system status
                </p>
              </div>

              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-text-secondary">
                Online
              </span>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0f172a]/60 p-4 text-sm text-text-secondary font-mono">
              <motion.div
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                }}
              >
                $ dashboard --stats
                <br />
                [INFO] Total Tasks:
                {' '}
                {stats.totalTasks}
                <br />
                [INFO] Todo:
                {' '}
                {stats.todo}
                <br />
                [INFO] In Progress:
                {' '}
                {stats.inProgress}
                <br />
                [INFO] Completed:
                {' '}
                <br />
[INFO] Members:
{' '}
{stats.totalMembers}

<br />
[INFO] Active Members:
{' '}
{stats.activeMembers}

<br />
[INFO] Events:
{' '}
{stats.totalEvents}

<br />
[INFO] Unread Notifications:
{' '}
{stats.unreadNotifications}
                {stats.completed}
              </motion.div>
            </div>
          </GlowCard>
        </div>

        <GlowCard
          className="p-6"
          glowColor="cyan"
        >
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-text-primary">
              Recent Activity
            </h3>

            <p className="text-text-secondary text-sm">
              Notifications from database
            </p>
          </div>

          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="glass border border-white/10 rounded-3xl p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-text-primary">
                    {log.title}
                  </span>
                </div>

                <p className="mt-2 text-sm text-text-secondary">
                  {log.message}
                </p>
              </div>
            ))}

            {!filteredLogs.length && (
              <div className="glass border border-white/10 rounded-3xl p-6 text-center text-text-secondary">
                No activity found.
              </div>
            )}
          </div>
        </GlowCard>
      </div>
    </PageWrapper>
  );
}