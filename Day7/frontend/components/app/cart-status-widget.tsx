'use client';

import { motion } from 'motion/react';

interface CartStatusWidgetProps {
  itemCount: number;
  total: number;
  onClick: () => void;
}

export function CartStatusWidget({ itemCount, total, onClick }: CartStatusWidgetProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, y: -6, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 100, rotate: -10 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 0.6, delay: 0.3, type: 'spring', bounce: 0.5 }}
      className="group fixed bottom-24 right-6 z-40 rounded-3xl bg-purple-600/90 border-2 border-purple-400/50 px-6 py-5 shadow-2xl shadow-purple-500/40 backdrop-blur-xl transition-all hover:border-purple-300/70 hover:shadow-purple-500/60 md:bottom-32 md:right-12 animate-pulse-glow"
    >
      <div className="text-left">
        <div className="text-xs font-black text-purple-200 mb-3 tracking-widest uppercase flex items-center gap-2">
          🛒 Cart
        </div>
        <div className="text-sm text-white space-y-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-purple-200 font-medium">Items:</span>
            <span className="font-black text-xl text-white bg-white/20 px-3 py-1 rounded-full">{itemCount}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-purple-200 font-medium">Total:</span>
            <span className="font-black text-2xl text-white">₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </motion.button>
  );
}
