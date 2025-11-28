'use client';

import { motion } from 'motion/react';

interface BrandHeaderProps {
  brandName?: string;
}

export function BrandHeader({ brandName = 'Buggy Cart' }: BrandHeaderProps) {
  return (
    <motion.div
      className="fixed top-8 left-8 z-50"
      initial={{ opacity: 0, x: -30, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
    >
      <h1 className="text-3xl font-black text-purple-400 tracking-tight">
        {brandName}
      </h1>
    </motion.div>
  );
}
