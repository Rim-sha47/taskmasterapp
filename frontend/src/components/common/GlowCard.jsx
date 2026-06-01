import { motion } from 'framer-motion';

export default function GlowCard({ children, className = '', glowColor = 'purple', ...props }) {
  const glowClasses = {
    purple: 'shadow-glow-purple',
    cyan: 'shadow-glow-cyan',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        glass glow-border
        ${glowClasses[glowColor] || glowClasses.purple}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
