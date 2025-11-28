'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X } from '@phosphor-icons/react';

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
}

export function CartDrawer({ isOpen, onClose, items }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-slate-950 shadow-2xl backdrop-blur-2xl border-l-2 border-purple-500/30"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-purple-500/30 px-6 py-6 bg-purple-900/20">
                <h2 className="text-3xl font-black text-purple-400">
                  🛒 Current Cart
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-3 text-purple-400 transition-all hover:bg-purple-500/20 hover:text-pink-400 hover:scale-110 hover:rotate-90"
                >
                  <X size={26} weight="bold" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {items.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-gray-400 text-xl font-light">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 30, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: index * 0.1, type: 'spring', bounce: 0.4 }}
                        whileHover={{ scale: 1.02, x: -5 }}
                        className="group rounded-2xl bg-slate-800/90 p-6 border-2 border-purple-500/20 hover:border-purple-400/50 transition-all shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 backdrop-blur-sm"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-black text-white text-xl mb-2">{item.name}</h3>
                            <p className="text-sm text-purple-300 font-bold bg-purple-500/20 px-3 py-1 rounded-full inline-block">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-2xl text-purple-400">
                              ₹{(item.quantity * item.price).toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-400 mt-1 font-medium">₹{item.price} each</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="border-t-2 border-purple-500/30 px-6 py-8 bg-purple-900/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-white">Subtotal</span>
                    <span className="text-4xl font-black text-purple-400">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
