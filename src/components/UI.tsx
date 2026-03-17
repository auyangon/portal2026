import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<CardProps> = ({ children, className, hoverEffect = true }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "bg-white/70 backdrop-blur-xl border border-white/40 rounded-[24px] shadow-sm overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const GradientText: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  return (
    <span className={cn("bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 font-semibold", className)}>
      {children}
    </span>
  );
};
