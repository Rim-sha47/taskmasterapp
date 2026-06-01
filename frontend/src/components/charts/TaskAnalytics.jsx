import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from 'recharts';
import GlowCard from '../common/GlowCard';

const data = [
  { name: 'Mon', tasks: 24, completed: 18 },
  { name: 'Tue', tasks: 32, completed: 25 },
  { name: 'Wed', tasks: 28, completed: 22 },
  { name: 'Thu', tasks: 35, completed: 30 },
  { name: 'Fri', tasks: 40, completed: 38 },
  { name: 'Sat', tasks: 22, completed: 20 },
  { name: 'Sun', tasks: 18, completed: 16 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass glow-border p-3 rounded-lg shadow-glow-purple">
        <p className="text-text-primary text-xs font-semibold">{payload[0].payload.name}</p>
        <p className="text-accent-cyan text-xs">Tasks: {payload[0].value}</p>
        {payload[1] && (
          <p className="text-accent-purple text-xs">Completed: {payload[1].value}</p>
        )}
      </div>
    );
  }
  return null;
};

export default function TaskAnalytics() {
  const chartRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        const width = Math.max(0, entry.contentRect.width);
        const height = Math.max(0, entry.contentRect.height);
        setDimensions(prev => {
          if (prev.width === width && prev.height === height) return prev;
          return { width, height };
        });
      }
    });

    observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="col-span-1 md:col-span-2 lg:col-span-2 min-w-0"
    >
      <GlowCard className="p-6" glowColor="cyan">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-text-primary mb-2">Task Analytics</h3>
          <p className="text-text-secondary text-sm">Weekly task distribution and completion</p>
        </div>

        <div
          ref={chartRef}
          className="w-full min-h-[250px] min-w-0"
          style={{ minHeight: 250 }}
        >
          {dimensions.width > 0 && dimensions.height > 0 && (
            <AreaChart
              width={dimensions.width}
              height={dimensions.height}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.1)" vertical={false} />
              <XAxis dataKey="name" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#7C3AED"
                fill="url(#gradientArea)"
                strokeWidth={3}
                dot={false}
                isAnimationActive={true}
                animationDuration={1000}
              />
              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#06B6D4"
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
                animationDuration={1000}
              />
            </AreaChart>
          )}
        </div>
      </GlowCard>
    </motion.div>
  );
}

