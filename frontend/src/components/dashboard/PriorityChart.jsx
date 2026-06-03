import { motion } from 'framer-motion';
import GlowCard from '../common/GlowCard';
import {
  AlertCircle,
  Clock,
  FileText,
  CheckCircle,
} from 'lucide-react';

export default function PriorityChart({ stats }) {
  const totalTasks = stats?.totalTasks || 0;

  const items = [
    {
      label: 'Todo',
      count: stats?.todo || 0,
      icon: AlertCircle,
      color: '#EF4444',
      bgColor: '#EF4444',
    },
    {
      label: 'In Progress',
      count: stats?.inProgress || 0,
      icon: Clock,
      color: '#F59E0B',
      bgColor: '#F59E0B',
    },
    {
      label: 'Review',
      count: stats?.review || 0,
      icon: FileText,
      color: '#06B6D4',
      bgColor: '#06B6D4',
    },
    {
      label: 'Completed',
      count: stats?.completed || 0,
      icon: CheckCircle,
      color: '#10B981',
      bgColor: '#10B981',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-1"
    >
      <GlowCard
        className="p-6 h-full"
        glowColor="cyan"
      >
        <div className="mb-6">
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Task Distribution
          </h3>

          <p className="text-text-secondary text-sm">
            Live task status overview
          </p>
        </div>

        <div className="space-y-6">
          {items.map((item, index) => {
            const Icon = item.icon;

            const percentage =
              totalTasks > 0
                ? Math.round(
                    (item.count / totalTasks) * 100
                  )
                : 0;

            return (
              <motion.div
                key={item.label}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: `${item.bgColor}20`,
                      }}
                    >
                      <Icon
                        size={18}
                        style={{
                          color: item.color,
                        }}
                      />
                    </div>

                    <span className="text-sm font-semibold text-text-primary">
                      {item.label}
                    </span>
                  </div>

                  <span className="text-xs text-text-secondary">
                    {item.count} tasks
                  </span>
                </div>

                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: `${percentage}%`,
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                  />
                </div>

                <div className="text-right mt-1">
                  <span className="text-xs text-text-secondary">
                    {percentage}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlowCard>
    </motion.div>
  );
}