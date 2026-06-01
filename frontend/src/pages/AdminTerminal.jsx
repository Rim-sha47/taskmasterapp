import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSearch } from '../context/SearchContext';
import PageWrapper from '../components/common/PageWrapper';
import GlowCard from '../components/common/GlowCard';

const systemData = [
  { title: 'Server Uptime', value: '18 days', detail: 'Stable performance' },
  { title: 'Active Users', value: '2,132', detail: 'Peak traffic hours' },
  { title: 'Open Tickets', value: '12', detail: 'Awaiting triage' },
  { title: 'Errors Today', value: '3', detail: 'Low priority' },
];

const logs = [
  { time: '09:12', event: 'User session created', details: 'Ava logged in from IP 198.51.100.23' },
  { time: '09:42', event: 'Workflow updated', details: 'Kanban task moved to Review' },
  { time: '10:05', event: 'Calendar event added', details: 'Release planning scheduled for April 3' },
  { time: '10:30', event: 'System scan complete', details: 'All services passed health check' },
];

export default function AdminTerminal() {
  const { searchQuery } = useSearch();
  const filteredLogs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return logs;
    return logs.filter((log) =>
      log.time.toLowerCase().includes(query) ||
      log.event.toLowerCase().includes(query) ||
      log.details.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return (
    <PageWrapper title="Admin Terminal" subtitle="Monitor system health, logs, and user activity.">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {systemData.map((item) => (
              <GlowCard key={item.title} className="p-6" glowColor="purple">
                <p className="text-sm text-text-secondary">{item.title}</p>
                <p className="mt-3 text-3xl font-semibold text-text-primary">{item.value}</p>
                <p className="mt-2 text-sm text-text-secondary">{item.detail}</p>
              </GlowCard>
            ))}
          </div>

          <GlowCard className="p-6" glowColor="cyan">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Command Console</h3>
                <p className="text-text-secondary text-sm">Live terminal output with system summaries.</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-text-secondary">Stable</span>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#0f172a]/60 p-4 text-sm text-text-secondary font-mono">
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                $ system-check --status
                <br />
                [INFO] All services healthy.
                <br />
                $ auth-scan --active
                <br />
                [INFO] 2,132 active sessions.
              </motion.div>
            </div>
          </GlowCard>
        </div>

        <GlowCard className="p-6" glowColor="cyan">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-text-primary">Recent Logs</h3>
              <p className="text-text-secondary text-sm">Latest system events and activity.</p>
            </div>
          </div>

          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.time} className="glass border border-white/10 rounded-3xl p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-text-secondary">{log.time}</span>
                  <span className="text-sm font-semibold text-text-primary">{log.event}</span>
                </div>
                <p className="mt-2 text-sm text-text-secondary">{log.details}</p>
              </div>
            ))}
            {!filteredLogs.length && (
              <div className="glass border border-white/10 rounded-3xl p-6 text-center text-text-secondary">
                No logs match "{searchQuery}".
              </div>
            )}
          </div>
        </GlowCard>
      </div>
    </PageWrapper>
  );
}
