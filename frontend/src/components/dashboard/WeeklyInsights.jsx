import { motion } from 'framer-motion';
import GlowCard from '../common/GlowCard';

export default function WeeklyInsights() {
  const progress = 75;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-1 md:col-span-2 lg:col-span-1"
    >
      <GlowCard className="p-8 h-full flex flex-col items-center justify-center" glowColor="purple">
        <h2 className="text-2xl font-bold text-text-primary mb-8">Weekly Progress Insights</h2>

        {/* Circular Progress */}
        <div className="relative w-48 h-48 mb-8">
          <motion.svg
            className="absolute inset-0 w-full h-full transform -rotate-90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Background Circle */}
            <circle
              cx="96"
              cy="96"
              r="45"
              fill="none"
              stroke="rgba(124, 58, 237, 0.1)"
              strokeWidth="8"
            />

            {/* Progress Circle */}
            <motion.circle
              cx="96"
              cy="96"
              r="45"
              fill="none"
              stroke="url(#gradientPurple)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="drop-shadow-lg"
            />

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradientPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-4xl font-bold gradient-text">{progress}%</p>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center w-full"
        >
          <p className="text-accent-cyan text-lg font-semibold mb-2">45 out of 60 tasks</p>
          <p className="text-text-secondary text-sm">
            Great work! Keep the momentum going to finish strong this week.
          </p>
        </motion.div>

        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-accent-purple"
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(124, 58, 237, 0.3)',
              '0 0 40px rgba(124, 58, 237, 0.6)',
              '0 0 20px rgba(124, 58, 237, 0.3)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ pointerEvents: 'none' }}
        />
      </GlowCard>
    </motion.div>
  );
}
