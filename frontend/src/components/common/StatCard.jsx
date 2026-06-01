import { motion } from 'framer-motion';
import GlowCard from './GlowCard';

export default function StatCard({ icon: Icon, label, value, subtitle, glowColor = 'purple' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <GlowCard
        className="p-6 h-full stat-card"
        glowColor={glowColor}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`
            p-3 rounded-lg
            ${glowColor === 'purple' 
              ? 'bg-accent-purple/10 text-accent-purple' 
              : 'bg-accent-cyan/10 text-accent-cyan'
            }
          `}>
            {Icon && <Icon size={24} />}
          </div>
        </div>
        
        <div className="text-left">
          <p className="text-text-secondary text-sm mb-2">{label}</p>
          <h3 className="text-4xl font-bold text-text-primary mb-1">{value}</h3>
          {subtitle && (
            <p className="text-text-secondary text-xs">{subtitle}</p>
          )}
        </div>
      </GlowCard>
    </motion.div>
  );
}
