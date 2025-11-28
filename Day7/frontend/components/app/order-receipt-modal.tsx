'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Download, CheckCircle } from '@phosphor-icons/react';
import type { CartItem } from './cart-drawer';

export interface LastOrder {
  orderId: string;
  timestamp: string;
  items: CartItem[];
  total: number;
}

interface OrderReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: LastOrder | null;
}

export function OrderReceiptModal({ isOpen, onClose, order }: OrderReceiptModalProps) {
  const handleDownloadJSON = () => {
    if (!order) return;

    const dataStr = JSON.stringify(order, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `order-${order.orderId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!order) return null;

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
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 250 }}
              className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950/50 shadow-2xl border-2 border-emerald-500/30 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 rounded-full p-2 text-emerald-400 transition-all hover:bg-emerald-500/20 hover:text-emerald-300 hover:scale-110 z-10"
              >
                <X size={26} weight="bold" />
              </button>

              {/* Content */}
              <div className="p-8">
                {/* Success Icon */}
                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
                >
                  <div className="rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-4 border-2 border-emerald-500/50">
                    <CheckCircle size={56} weight="fill" className="text-emerald-400" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-center text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Order Placed Successfully!
                </motion.h2>

                {/* Order Details */}
                <motion.div
                  className="space-y-5 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="rounded-xl bg-gradient-to-br from-slate-800/80 to-emerald-900/20 p-5 border-2 border-emerald-500/20">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-gray-400 font-medium">Order ID:</div>
                      <div className="text-right font-mono text-emerald-400 font-bold">{order.orderId}</div>
                      <div className="text-gray-400 font-medium">Time:</div>
                      <div className="text-right text-white font-medium">
                        {new Date(order.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <h3 className="text-sm font-bold text-emerald-300 mb-3 uppercase tracking-wider">Items</h3>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-center justify-between text-sm rounded-xl bg-gradient-to-r from-slate-800/50 to-emerald-900/10 px-4 py-3 border border-emerald-500/10 hover:border-emerald-500/30 transition-all"
                        >
                          <span className="text-white font-medium">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-bold text-emerald-400">
                            ₹{(item.quantity * item.price).toFixed(2)}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <motion.div
                    className="rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/50 p-5 shadow-lg shadow-emerald-500/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, type: 'spring' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-white">Total</span>
                      <span className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        ₹{order.total.toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Actions */}
                <motion.div
                  className="mt-8 flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <button
                    onClick={handleDownloadJSON}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 px-5 py-4 font-bold text-white transition-all hover:from-slate-700 hover:to-slate-600 hover:scale-105 shadow-lg hover:shadow-xl border border-slate-600"
                  >
                    <Download size={22} weight="bold" />
                    Download JSON
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 font-bold text-white transition-all hover:from-emerald-700 hover:to-teal-700 hover:scale-105 shadow-lg hover:shadow-emerald-500/50"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
