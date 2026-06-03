import { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearch } from '../../context/SearchContext';
import StatCard from '../common/StatCard';
import WeeklyInsights from './WeeklyInsights';
import TaskAnalytics from '../charts/TaskAnalytics';
import PriorityChart from './PriorityChart';
import { CheckCircle, Clock, FileText, Zap } from 'lucide-react';
import { getDashboardStats } from '../../services/dashboardService';

export default function Dashboard() {
  const { searchQuery } = useSearch();

  const [dashboardStats, setDashboardStats] = useState({
    totalTasks: 0,
    inProgress: 0,
    review: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await getDashboardStats();

      setDashboardStats({
        totalTasks: response.data.stats.totalTasks || 0,
        inProgress: response.data.stats.inProgress || 0,
        review: response.data.stats.review || 0,
        completed: response.data.stats.completed || 0,
      });
    } catch (error) {
      console.error("Dashboard API Error:", error);
    }
  };

  const stats = [
    {
      icon: Zap,
      label: 'Total Tasks',
      value: dashboardStats.totalTasks,
      subtitle: 'All tasks',
      glowColor: 'purple',
    },
    {
      icon: Clock,
      label: 'In Progress',
      value: dashboardStats.inProgress,
      subtitle: 'Currently active',
      glowColor: 'cyan',
    },
    {
      icon: FileText,
      label: 'Reviews',
      value: dashboardStats.review,
      subtitle: 'Awaiting approval',
      glowColor: 'purple',
    },
    {
      icon: CheckCircle,
      label: 'Completions',
      value: dashboardStats.completed,
      subtitle: 'Successfully finished',
      glowColor: 'cyan',
    },
  ];

  const filteredStats = useMemo(() => {
    if (!searchQuery.trim()) return stats;

    return stats.filter(
      (stat) =>
        stat.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stat.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, stats]);

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
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * (index + 1),
              }}
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
        <WeeklyInsights />
        <TaskAnalytics />
        <PriorityChart />
      </div>
    </motion.div>
  );
}