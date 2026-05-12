/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Zap, Coffee, Star, ArrowRight, Heart } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

const PLANS = [
  {
    id: 'starter',
    name: 'Discovery',
    price: '24',
    capsules: '20',
    description: 'Perfect for light brewers exploring new roasts.',
    features: ['Curated seasonal selection', 'Standard delivery', '10% off accessories'],
    icon: <Coffee className="text-brand-gold" />,
    popular: false
  },
  {
    id: 'aficionado',
    name: 'Aficionado',
    price: '49',
    capsules: '50',
    description: 'Our most popular choice for daily coffee lovers.',
    features: ['Early access to limited editions', 'Free express shipping', '20% off accessories', 'Machine maintenance kit'],
    icon: <Zap className="text-brand-gold" />,
    popular: true
  },
  {
    id: 'connoisseur',
    name: 'Connoisseur',
    price: '89',
    capsules: '100+',
    description: 'The ultimate experience for the true coffee elite.',
    features: ['Custom blend requests', 'Bi-monthly barista masterclasses', 'Concierge support', 'Priority machine service'],
    icon: <Star className="text-brand-gold" />,
    popular: false
  }
];

export default function SubscriptionSection() {
  const [activeCheckout, setActiveCheckout] = useState<{name: string, price: string} | null>(null);

  const handleSubscribe = (plan: typeof PLANS[0]) => {
    setActiveCheckout({ name: plan.name, price: plan.price });
  };

  return (
    <section id="subscriptions" className="py-32 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-cream/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cream rounded-full text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <Heart size={12} className="fill-current" />
            The Coffee Collective
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif text-brand-brown mb-8"
          >
            Your Daily Ritual, <br /> <span className="italic">Perfectly Synced</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg leading-relaxed"
          >
            Join our subscription service and never worry about running out of your favorite roasts. 
            Tailored to your brewing habits, delivered with precision.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className={`relative p-10 rounded-[48px] border-2 transition-all duration-500 group ${
                plan.popular 
                  ? 'bg-brand-brown text-white border-brand-brown shadow-2xl scale-105 z-10' 
                  : 'bg-white border-slate-100 hover:border-brand-gold shadow-sm mt-4'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-brown px-6 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Most Requested
                </div>
              )}

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${plan.popular ? 'bg-white/10' : 'bg-brand-cream'}`}>
                {plan.icon}
              </div>

              <div className="mb-8">
                <h3 className={`text-2xl font-serif mb-2 ${plan.popular ? 'text-white' : 'text-brand-brown'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-brand-gold' : 'text-brand-brown'}`}>${plan.price}</span>
                  <span className={plan.popular ? 'text-white/60' : 'text-slate-400'}>/month</span>
                </div>
                <p className={`mt-4 text-sm leading-relaxed ${plan.popular ? 'text-white/70' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-10">
                <div className={`text-[10px] font-bold uppercase tracking-widest ${plan.popular ? 'text-brand-gold' : 'text-slate-400'}`}>
                  {plan.capsules} Capsules Monthly
                </div>
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <Check size={16} className={plan.popular ? 'text-brand-gold' : 'text-brand-gold'} />
                    <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-slate-600'}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSubscribe(plan)}
                className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  plan.popular 
                    ? 'bg-brand-gold text-brand-brown hover:bg-white shadow-xl shadow-brand-gold/10' 
                    : 'bg-brand-brown text-white hover:bg-black shadow-xl shadow-brand-brown/10'
                }`}
              >
                Join Collective
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-8">
            Flexible commitment: pause or cancel any time
          </p>
          <div className="flex justify-center items-center gap-12 opacity-40 grayscale group-hover:grayscale-0 transition-all">
            {/* Minimal logos or badges could go here */}
          </div>
        </div>
      </div>

      <CheckoutModal 
        isOpen={activeCheckout !== null}
        onClose={() => setActiveCheckout(null)}
        planName={activeCheckout?.name || ''}
        planPrice={activeCheckout?.price || ''}
      />
    </section>
  );
}
