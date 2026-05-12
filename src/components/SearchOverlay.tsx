/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ArrowRight, Info } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [showToast, setShowToast] = useState<string | null>(null);

  const suggestions = ['BrewOne', 'FoamPro', 'Limited Edition Capsules', 'Maintenance Kits'];

  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    setShowToast(link);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-[120] flex flex-col"
        >
          {/* Toast Notification */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-32 left-1/2 -translate-x-1/2 bg-brand-brown text-white px-8 py-4 rounded-full shadow-2xl z-[130] flex items-center gap-3"
              >
                <Info size={18} className="text-brand-gold" />
                <span className="text-sm font-medium tracking-wide">
                  {showToast} feature coming soon to the platform
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="container mx-auto px-8 lg:px-12 py-10">
            <div className="flex justify-between items-center mb-20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-brown rounded-full flex items-center justify-center">
                  <span className="text-white font-serif font-bold italic text-xl">F</span>
                </div>
                <h2 className="text-xl font-serif tracking-[0.05em] uppercase font-bold text-brand-brown">
                  Future Café
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            <div className="max-w-4xl mx-auto w-full">
              <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-gold transition-colors" size={48} />
                <input 
                  autoFocus
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Discover your next brew..."
                  className="w-full bg-transparent border-b-2 border-slate-100 py-6 pl-16 text-4xl md:text-6xl font-serif outline-none focus:border-brand-gold transition-all"
                />
              </div>

              <div className="mt-16 grid md:grid-cols-2 gap-20">
                <div className="space-y-8">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Trending Searches</h3>
                  <div className="flex flex-wrap gap-3">
                    {suggestions.map((tag) => (
                      <button 
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-6 py-3 bg-brand-cream rounded-full text-sm font-medium hover:bg-brand-gold hover:text-white transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Quick Links</h3>
                  <ul className="space-y-4">
                    {['Store Locator', 'Order Tracking', 'Recycling Centers', 'Nespresso® Club'].map((link) => (
                      <li key={link}>
                        <a 
                          href="#" 
                          onClick={(e) => handleLinkClick(e, link)}
                          className="flex items-center justify-between group py-2 border-b border-slate-50"
                        >
                          <span className="text-xl font-serif text-brand-brown transition-colors group-hover:text-brand-gold">{link}</span>
                          <ArrowRight size={20} className="text-brand-gold -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
