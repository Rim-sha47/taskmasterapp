import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import GlowCard from '../common/GlowCard';
import { getDashboardStats } from '../../services/dashboardService';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass glow-border p-3 rounded-lg shadow-glow-purple">
        <p className="text-text-primary text-xs font-semibold">
          {payload[0].payload.name}
        </p>

        <p className="text-accent-cyan text-xs">
          Count: {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

export default function TaskAnalytics() {
  const chartRef = useRef(null);

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 300,
  });

  const [chartData, setChartData] = useState([]);

  // MOVE THIS ABOVE useEffect
  const loadStats = async () => {
    try {
      const response = await getDashboardStats();

      const stats = response.data.stats;

      setChartData([
        {
          name: 'Todo',
          count: stats.todo || 0,
        },
        {
          name: 'In Progress',
          count: stats.inProgress || 0,
        },
        {
          name: 'Review',
          count: stats.review || 0,
        },
        {
          name: 'Completed',
          count: stats.completed || 0,
        },
      ]);
    } catch (error) {
      console.error('Task Analytics Error:', error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) return;

      setDimensions({
        width: entry.contentRect.width,
        height: 300,
      });
    });

    observer.observe(chartRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-1 md:col-span-2 lg:col-span-2 min-w-0"
    >
      <GlowCard className="p-6" glowColor="cyan">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Task Analytics
          </h3>

          <p className="text-text-secondary text-sm">
            Live task status distribution
          </p>
        </div>

        <div
          ref={chartRef}
          className="w-full min-h-[300px]"
        >
          {dimensions.width > 0 && chartData.length > 0 && (
            <AreaChart
              width={dimensions.width}
              height={300}
              data={chartData}
            >
              <defs>
                <linearGradient
                  id="gradientArea"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#7C3AED"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="95%"
                    stopColor="#7C3AED"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(156,163,175,0.1)"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                stroke="#9CA3AF"
              />

              <YAxis
                stroke="#9CA3AF"
              />

              <Tooltip
                content={<CustomTooltip />}
              />

              <Area
                type="monotone"
                dataKey="count"
                stroke="#7C3AED"
                fill="url(#gradientArea)"
                strokeWidth={3}
              />
            </AreaChart>
          )}
        </div>
      </GlowCard>
    </motion.div>
  );
}