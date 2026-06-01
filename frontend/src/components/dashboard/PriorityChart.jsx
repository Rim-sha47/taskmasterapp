import { motion } from 'framer-motion';
import GlowCard from '../common/GlowCard';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

const priorities = [
  {
    label: 'Urgent / High',
    percentage: 35,
    count: 12,
    icon: AlertCircle,
    color: '#EF4444',
    bgColor: '#EF4444',
  },
  {
    label: 'Intermediate / Medium',
    percentage: 55,
    count: 18,
    icon: AlertTriangle,
    color: '#F59E0B',
    bgColor: '#F59E0B',
  },
  {
    label: 'Non-critical / Low',
    percentage: 78,
    count: 25,
    icon: CheckCircle,
    color: '#10B981',
    bgColor: '#10B981',
  },
];

export default function PriorityChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="col-span-1"
    >
      <GlowCard className="p-6 h-full" glowColor="cyan">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-text-primary mb-2">Priority Allocation</h3>
          <p className="text-text-secondary text-sm">Task distribution by priority level</p>
        </div>

        <div className="space-y-6">
          {priorities.map((priority, index) => {
            const Icon = priority.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${priority.bgColor}20` }}
                    >
                      <Icon size={18} style={{ color: priority.color }} />
                    </div>
                    <span className="text-sm font-semibold text-text-primary">
                      {priority.label}
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary">
                    {priority.count} tasks
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: priority.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${priority.percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 * (index + 1) }}
                  />
                </div>

                {/* Percentage */}
                <div className="text-right mt-1">
                  <span className="text-xs text-text-secondary">
                    {priority.percentage}% completed
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
