import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function PageWrapper({ title, subtitle, children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 240);
    return () => clearTimeout(timeout);
  }, [title]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="glass glow-border border-accent-purple/20 p-8 rounded-3xl shadow-glow-purple text-center"
        >
          <div className="mb-4 text-xl font-semibold text-text-primary">Loading page...</div>
          <div className="h-2 w-48 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              className="h-full w-24 bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-purple"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="p-4 lg:p-6"
    >
      <div className="mb-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-text-primary">{title}</h1>
            {subtitle && <p className="text-text-secondary mt-1">{subtitle}</p>}
          </div>
        </div>
      </div>
      {children}
    </motion.div>
  );
}
