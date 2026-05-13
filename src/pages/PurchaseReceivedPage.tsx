/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  CheckCircle2, 
  ExternalLink, 
  ShoppingBag, 
  ArrowRight, 
  Mail, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export default function PurchaseReceivedPage() {
  const location = useLocation();
  const { totalPrice, orderId } = location.state || { totalPrice: 0, orderId: 'N/A' };

  const paypalUrl = `https://paypal.me/janiepastrana/${totalPrice.toFixed(2)}`;

  return (
    <div className="pt-32 min-h-screen bg-white pb-20">
      <div className="container mx-auto px-8 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-12"
        >
          {/* Header Section */}
          <div className="space-y-6">
            <div className="w-24 h-24 bg-brand-cream text-brand-gold rounded-full flex items-center justify-center mx-auto shadow-inner relative">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, delay: 0.3 }}
                className="absolute inset-0 bg-brand-gold/10 rounded-full animate-ping"
              />
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
              <h1 className="text-6xl font-serif text-brand-brown">Order Received</h1>
              <p className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em]">Transaction Initiated & Recorded</p>
            </div>
          </div>

          {/* Main Action Card */}
          <div className="bg-slate-50 rounded-[64px] p-12 border border-slate-100 shadow-sm overflow-hidden relative group">
            <div className="relative z-10 space-y-8">
              <div className="space-y-4 max-w-md mx-auto">
                <h3 className="text-2xl font-serif text-brand-brown">Complete Your Ritual</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Your order information has been successfully logged (Order ID: <span className="font-mono text-brand-brown font-bold">{orderId}</span>). 
                  To finalize your purchase and start the shipment process, please complete the payment via our secure PayPal link.
                </p>
              </div>

              <div className="flex flex-col items-center gap-6">
                <a 
                  href={paypalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#0070ba] text-white px-12 py-6 rounded-3xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#003087] transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 group-hover:scale-105"
                >
                  Confirm Payment on PayPal
                  <ExternalLink size={16} />
                </a>
                
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200">
                    <ShieldCheck size={14} className="text-brand-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-brown">Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200">
                    <CreditCard size={14} className="text-brand-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-brown">Verified</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Decorative Pattern */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-brand-brown/5 rounded-full blur-3xl" />
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <InfoBlock 
              icon={Mail} 
              title="Confirmation Email" 
              desc="A detailed order recap has been sent to your registered address."
              delay={0.4}
            />
            <InfoBlock 
              icon={ShoppingBag} 
              title="Next Steps" 
              desc="Once payment is confirmed, your selection enters the inspection phase."
              delay={0.5}
            />
            <InfoBlock 
              icon={ArrowRight} 
              title="Track Ritual" 
              desc="Monitor your shipment's journey through your personal profile dashboard."
              delay={0.6}
            />
          </div>

          {/* Footer Navigation */}
          <div className="pt-12 border-t border-slate-100">
            <Link 
              to="/"
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-brand-brown transition-colors flex items-center justify-center gap-2 mx-auto w-fit"
            >
              Return to Store Experience
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InfoBlock({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="p-8 bg-white border border-slate-100 rounded-[40px] shadow-sm space-y-4 hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-gold">
        <Icon size={20} />
      </div>
      <div className="space-y-1">
        <h4 className="font-serif text-lg text-brand-brown">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}
