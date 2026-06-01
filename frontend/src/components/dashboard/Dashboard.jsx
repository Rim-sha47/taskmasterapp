import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSearch } from '../../context/SearchContext';
import StatCard from '../common/StatCard';
import WeeklyInsights from './WeeklyInsights';
import TaskAnalytics from '../charts/TaskAnalytics';
import PriorityChart from './PriorityChart';
import { CheckCircle, Clock, FileText, Zap } from 'lucide-react';

const stats = [
  {
    icon: Zap,
    label: 'Total Tasks',
    value: '156',
    subtitle: '+12 this week',
    glowColor: 'purple',
  },
  {
    icon: Clock,
    label: 'In Progress',
    value: '34',
    subtitle: '21.8% of total',
    glowColor: 'cyan',
  },
  {
    icon: FileText,
    label: 'Reviews',
    value: '8',
    subtitle: 'Awaiting approval',
    glowColor: 'purple',
  },
  {
    icon: CheckCircle,
    label: 'Completions',
    value: '89',
    subtitle: '+5 from yesterday',
    glowColor: 'cyan',
  },
];

export default function Dashboard() {
  const { searchQuery } = useSearch();
  const filteredStats = useMemo(() => {
    if (!searchQuery.trim()) return stats;
    return stats.filter((stat) =>
      stat.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stat.subtitle.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 lg:p-6"
    >
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          Welcome to TaskMaster
        </h1>
        <p className="text-text-secondary">
          Here's your dashboard overview for today
        </p>
      </motion.div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {filteredStats.length > 0 ? (
          filteredStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-text-secondary"
          >
            No dashboard results match "{searchQuery}".
          </motion.div>
        )}
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Insights */}
        <WeeklyInsights />

        {/* Task Analytics Chart */}
        <TaskAnalytics />

        {/* Priority Chart */}
        <PriorityChart />
      </div>
    </motion.div>
  );
}
