'use client';

import { motion } from 'motion/react';
import { Receipt } from '@phosphor-icons/react';

interface LastOrderButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function LastOrderButton({ onClick, disabled = false }: LastOrderButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.1, y: -6, rotate: -2 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, x: -100, rotate: 10 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 0.6, delay: 0.3, type: 'spring', bounce: 0.5 }}
      className="group fixed bottom-24 left-6 z-40 flex items-center gap-3 rounded-3xl bg-slate-900/90 border-2 border-purple-500/40 px-6 py-5 shadow-2xl shadow-purple-500/20 backdrop-blur-xl transition-all hover:border-purple-400/60 hover:shadow-purple-500/40 disabled:opacity-30 disabled:cursor-not-allowed md:bottom-32 md:left-12"
      title={disabled ? 'No orders yet' : 'View last order'}
    >
      <Receipt size={24} weight="bold" className="text-purple-400 group-hover:text-pink-400 transition-colors" />
      <span className="text-sm font-black text-white">View Last Order</span>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </motion.button>
  );
}
