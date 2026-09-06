import * as React from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function Dialog({ isOpen, onClose, title, description, children }: { isOpen: boolean, onClose: () => void, title: string, description?: string, children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-10"
        >
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <div>
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              {description && <p className="text-sm text-zinc-400 mt-1">{description}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
