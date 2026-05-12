/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Settings, Package, Heart, LogIn, ArrowRight, Info, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const { user, signIn, logOut, loading } = useAuth();
  const [showToast, setShowToast] = useState<string | null>(null);

  const handleLinkClick = (label: string) => {
    setShowToast(label);
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
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Toast Notification */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-24 left-1/2 -translate-x-1/2 bg-brand-brown text-white px-8 py-4 rounded-full shadow-2xl z-[130] flex items-center gap-3 w-[90%] max-w-xs"
              >
                <Info size={18} className="text-brand-gold" />
                <span className="text-xs font-medium tracking-wide">
                  {showToast} feature coming soon
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[101] shadow-2xl flex flex-col pt-10"
          >
            <div className="px-8 flex justify-end">
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 px-8 py-10 space-y-12">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center border-2 border-brand-gold/20 overflow-hidden">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} className="text-brand-gold" />
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-serif text-brand-brown mb-1">
                    {loading ? '...' : user ? `Hello, ${user.displayName?.split(' ')[0]}` : 'Welcome back'}
                  </h2>
                  <p className="text-slate-500 text-sm">
                    {user ? user.email : 'Join the Future Café Club for exclusive benefits.'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {!user ? (
                  <button 
                    onClick={() => signIn()}
                    className="w-full flex items-center justify-between p-4 bg-brand-cream rounded-2xl transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <LogIn size={20} className="text-brand-gold" />
                      <span className="font-bold text-brand-brown">Sign In with Google</span>
                    </div>
                    <ArrowRight size={16} className="text-brand-gold" />
                  </button>
                ) : (
                  <>
                    {[
                      { icon: Package, label: 'Track My Order' },
                      { icon: Heart, label: 'My Favorites Bucket' },
                      { icon: Settings, label: 'Machine Settings' },
                    ].map((item, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleLinkClick(item.label)}
                        className="w-full flex items-center justify-between p-4 hover:bg-brand-cream rounded-2xl transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <item.icon size={20} className="text-slate-400 group-hover:text-brand-brown" />
                          <span className="font-medium text-slate-700">{item.label}</span>
                        </div>
                        <ArrowRight size={16} className="text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </button>
                    ))}
                    <button 
                      onClick={() => logOut()}
                      className="w-full flex items-center justify-between p-4 hover:bg-red-50 rounded-2xl transition-all group text-red-500"
                    >
                      <div className="flex items-center gap-4">
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                      </div>
                    </button>
                  </>
                )}
              </div>

              <div className="p-6 bg-brand-brown rounded-[32px] text-white relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <h4 className="font-serif text-xl">The Gold Tier</h4>
                  <p className="text-[10px] text-white/60 uppercase tracking-[0.2em] leading-relaxed">
                    Exclusive early access to limited edition roasts and private machine launches.
                  </p>
                  <button 
                    onClick={() => handleLinkClick('Gold Tier')}
                    className="bg-brand-gold text-brand-brown px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    Unlock Now
                  </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl"></div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
                Need Help? Contact our Concierge
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
