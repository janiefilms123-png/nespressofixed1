/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, ShieldCheck, Mail, Phone, MapPin, User, ArrowRight, Loader2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
}

export default function CheckoutModal({ isOpen, onClose, planName, planPrice }: CheckoutModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl bg-white rounded-[48px] shadow-2xl z-[201] overflow-hidden"
          >
            <div className="grid md:grid-cols-[1.2fr_1fr] h-full max-h-[90vh] overflow-y-auto">
              {/* Form Section */}
              <div className="p-8 md:p-12">
                <button 
                  onClick={onClose}
                  className="mb-8 p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>

                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShieldCheck size={40} />
                    </div>
                    <h3 className="text-3xl font-serif text-brand-brown mb-4">You're in!</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                      Your subscription to the <span className="font-bold text-brand-brown">{planName} Collective</span> has been successfully initialized.
                    </p>
                    <button 
                      onClick={onClose}
                      className="w-full bg-brand-brown text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all"
                    >
                      Enter the Collective
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-3xl font-serif text-brand-brown mb-2">Finalize Ritual</h3>
                      <p className="text-slate-400 text-sm">Secure checkout for your {planName} plan.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">First Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                            <input required type="text" placeholder="John" className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand-gold/20 text-sm outline-none" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Last Name</label>
                          <div className="relative">
                            <input required type="text" placeholder="Doe" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 focus:ring-2 focus:ring-brand-gold/20 text-sm outline-none" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                          <input required type="email" placeholder="john@example.com" className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand-gold/20 text-sm outline-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                          <input required type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand-gold/20 text-sm outline-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Shipping Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-4 text-slate-300" size={16} />
                          <textarea required rows={2} placeholder="123 Espresso Lane, Swiss Alps" className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand-gold/20 text-sm outline-none resize-none" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 pt-4">
                        <button 
                          disabled={isSubmitting}
                          type="submit"
                          className="w-full bg-brand-brown text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={20} className="animate-spin" />
                              Authenticating...
                            </>
                          ) : (
                            <>
                              Pay with Credit Card
                              <ArrowRight size={18} />
                            </>
                          )}
                        </button>
                        
                        <div className="relative flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                          </div>
                          <div className="relative px-4 bg-white text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Or
                          </div>
                        </div>

                        <a 
                          href="https://paypal.me/janiepastrana"
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-[#0070ba] text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#003087] transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M20.067 8.478c.492.88.556 2.014.345 3.227l-0.038.216c-0.218 1.258-0.89 2.222-1.996 2.868 -1.107.646-2.5 0.963-3.931 0.963l-0.75 0c-0.457 0-0.852.321-0.938.769l-1.011 5.257c-0.041.213-0.228.366-0.445.366l-3.321 0c-0.347 0-0.6-0.32-0.536-0.662l1.666-8.916c0.041-0.22 0.232-0.378 0.456-0.378l2.915 0c1.077 0 2.213-.15 3.197-.562 .984-.412 1.589-1.042 1.832-1.898 .219-0.771.135-1.554-0.301-2.224 -0.428-.658-1.213-1.015-2.261-1.015l-4.57 0c-0.305 0-0.568.214-0.626.514l-1.637 8.528c-0.083.433-0.459.743-0.899.743l-2.613 0c-0.305 0-0.569.214-0.627.514l-0.842 4.385c-0.041.213-0.228.366-0.445.366l-2.736 0c-0.347 0-0.601-.32-0.536-.662l3.433-17.88c0.084-.433.461-.743.902-.743l10.155 0c1.944 0 3.511.45 4.498 1.348Z" />
                          </svg>
                          Pay with PayPal
                        </a>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Summary Section */}
              <div className="bg-brand-cream p-8 md:p-12 flex flex-col justify-between">
                <div className="space-y-8">
                  <div>
                    <div className="inline-block px-3 py-1 bg-brand-gold text-brand-brown text-[8px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
                      Subscription Summary
                    </div>
                    <h4 className="text-2xl font-serif text-brand-brown">{planName} Plan</h4>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Monthly Capsules</span>
                      <span className="text-brand-brown font-bold">50 Units</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Shipping</span>
                      <span className="text-green-600 font-bold">Free Platinum</span>
                    </div>
                    <div className="h-px bg-slate-200" />
                    <div className="flex justify-between items-end">
                      <span className="text-brand-brown font-bold uppercase tracking-widest text-[10px]">Total Due Today</span>
                      <div className="text-right">
                        <span className="block text-3xl font-bold text-brand-brown">${planPrice}</span>
                        <span className="text-[10px] text-slate-400">plus applicable taxes</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-white/50 rounded-3xl border border-white space-y-4">
                  <div className="flex items-center gap-3 text-xs text-brand-brown font-medium">
                    <CreditCard size={16} className="text-brand-gold" />
                    Billed monthly to your secure vault
                  </div>
                  <div className="flex items-center gap-3 text-xs text-brand-brown font-medium">
                    <ShieldCheck size={16} className="text-brand-gold" />
                    AES-256 Cloud Protection
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
