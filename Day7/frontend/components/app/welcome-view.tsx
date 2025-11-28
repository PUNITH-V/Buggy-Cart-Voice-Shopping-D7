'use client';

import { Button } from '@/components/livekit/button';
import { motion } from 'motion/react';

function GroceryBasketIcon() {
  return (
    <motion.svg
      width="96"
      height="96"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-8"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', duration: 0.8, bounce: 0.4 }}
    >
      <motion.path
        d="M12 16L16 48H48L52 16H12Z"
        stroke="url(#gradient1)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="url(#gradient2)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <motion.path
        d="M22 16V12C22 9.79086 23.7909 8 26 8H38C40.2091 8 42 9.79086 42 12V16"
        stroke="url(#gradient1)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <motion.circle
        cx="24"
        cy="54"
        r="2.5"
        fill="#10b981"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      />
      <motion.circle
        cx="44"
        cy="54"
        r="2.5"
        fill="#10b981"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1, type: 'spring' }}
      />
      <defs>
        <linearGradient id="gradient1" x1="12" y1="8" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10b981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="gradient2" x1="12" y1="16" x2="52" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d1fae5" stopOpacity="0.6" />
          <stop offset="1" stopColor="#a7f3d0" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

function FloatingOrb({ delay = 0, duration = 20, size = 600, left = '10%', top = '20%', color = 'purple' }) {
  const colors = {
    purple: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(147, 51, 234, 0.2) 40%, transparent 70%)',
    pink: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(219, 39, 119, 0.2) 40%, transparent 70%)',
    blue: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.2) 40%, transparent 70%)',
    orange: 'radial-gradient(circle, rgba(251, 146, 60, 0.4) 0%, rgba(249, 115, 22, 0.2) 40%, transparent 70%)',
  };

  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        width: size,
        height: size,
        left,
        top,
        background: colors[color as keyof typeof colors],
      }}
      animate={{
        x: [0, 150, -100, 0],
        y: [0, -150, 100, 0],
        scale: [1, 1.3, 0.9, 1],
        rotate: [0, 90, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {


  const categories = ['Groceries', 'Snacks', 'Prepared Food', 'Beverages', 'Essentials'];

  const steps = [
    {
      title: 'Speak your order',
      description: "Tell me what you want or say 'ingredients for a sandwich'.",
    },
    {
      title: 'Assistant builds your cart',
      description: "I'll add individual items or recipe ingredients automatically.",
    },
    {
      title: 'Confirm & place order',
      description: "I'll read out your cart and save the order to JSON.",
    },
  ];

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Animated Background Orbs */}
      <FloatingOrb delay={0} duration={25} size={700} left="-10%" top="5%" color="purple" />
      <FloatingOrb delay={3} duration={30} size={600} left="60%" top="-10%" color="pink" />
      <FloatingOrb delay={6} duration={28} size={550} left="70%" top="60%" color="blue" />
      <FloatingOrb delay={9} duration={22} size={500} left="20%" top="70%" color="orange" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
        >
          <GroceryBasketIcon />
        </motion.div>

        <motion.div
          className="inline-block mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold backdrop-blur-sm">
            ✨ AI-Powered Shopping Assistant
          </span>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl font-black mb-6 max-w-5xl leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <span className="text-purple-400">
            Buggy Cart
          </span>
          <br />
          <span className="text-white text-5xl md:text-6xl font-bold">
            Voice Shopping
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12 font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Order groceries, snacks, and ingredients for your favorite meals — 
          <span className="text-purple-400 font-semibold"> just by speaking</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onStartCall}
            className="group relative overflow-hidden bg-purple-600 hover:bg-purple-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
          >
            <span className="relative z-10 flex items-center gap-3">
              🎤 {startButtonText}
            </span>
            <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors duration-300" />
          </Button>
        </motion.div>
      </section>

      {/* Category Chips */}
      <section className="relative z-10 flex flex-wrap items-center justify-center gap-4 px-6 pb-20">
        {categories.map((category, index) => (
          <motion.span
            key={category}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1, type: 'spring', bounce: 0.6 }}
            whileHover={{ scale: 1.15, y: -5, rotate: 2 }}
            className="px-7 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-300 text-sm font-bold rounded-full border-2 border-purple-500/30 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:border-purple-400/50 backdrop-blur-sm transition-all cursor-pointer"
          >
            {category}
          </motion.span>
        ))}
      </section>

      {/* How It Works */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <motion.h2
          className="text-4xl md:text-5xl font-black text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            How It Works
          </span>
        </motion.h2>
        
        <motion.p
          className="text-center text-gray-400 text-lg mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Three simple steps to your perfect order
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2, type: 'spring' }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="group relative bg-gradient-to-br from-slate-900/90 to-purple-900/30 rounded-3xl p-8 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/30 transition-all border-2 border-purple-500/20 hover:border-purple-400/40 backdrop-blur-sm overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-orange-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-orange-500/10 transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-purple-500/50 rotate-3 group-hover:rotate-6 transition-transform">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 mt-6">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 text-center border-t border-purple-500/10">
        <motion.p
          className="text-lg text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Powered by{' '}
          <span className="font-black text-2xl text-purple-400">
            Buggy Cart
          </span>
        </motion.p>
      </footer>
    </div>
  );
};
