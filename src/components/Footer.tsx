/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Mail, ArrowRight, X, Shield, FileText, Cookie, Star, RefreshCw, Recycle, Wrench, Ticket, BookOpen, Leaf, CheckCircle, Globe, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MODAL_CONTENT = {
  'Privacy Policy': {
    icon: <Shield size={32} />,
    title: 'Privacy Policy',
    content: 'At Future Café, we take your privacy as seriously as our espresso. We collect minimal data to ensure your machines stay calibrated and your orders arrive on time. Your brewing habits are encrypted and never shared with third-party roasters without your explicit consent.'
  },
  'Terms of Service': {
    icon: <FileText size={32} />,
    title: 'Terms of Service',
    content: 'By using the Future Café platform, you agree to respect the craft of coffee. Our machines are designed for high-performance extraction; any attempts to use third-party "discount" pods may void your warranty and, more importantly, ruin your morning crema.'
  },
  'Cookie settings': {
    icon: <Cookie size={32} />,
    title: 'Cookie Preferences',
    content: 'We use essential cookies to keep your collection secure and your preferences saved. We also use functional cookies to remember if you prefer Intense Ristretto or Smooth Lungo, ensuring your digital experience matches your palate.'
  },
  'Join the Club': {
    icon: <Star size={32} />,
    title: 'The Connoisseur Club',
    content: 'Join our elite circle of coffee enthusiasts. Members enjoy early access to rare single-origin beans, invitation-only tasting events, and a lifetime 15% discount on all machine accessories.'
  },
  'Auto-Delivery': {
    icon: <RefreshCw size={32} />,
    title: 'Effortless Auto-Delivery',
    content: 'Never run out of your favorite blends. Set your frequency, customize your selection at any time, and enjoy free shipping on every recurring order. Your machine can even suggest when to restock based on your consumption.'
  },
  'Recycling Program': {
    icon: <Recycle size={32} />,
    title: 'Sustainable Lifecycle',
    content: 'Our commitment to the planet is absolute. Order a free recycling bag with any purchase, fill it with used capsules, and drop it off at any collection point or hand it to our delivery partners. We turn old capsules into new machines.'
  },
  'Machine Maintenance': {
    icon: <Wrench size={32} />,
    title: 'Certified Care',
    content: 'Protect your investment with our proactive maintenance alerts. From descaling reminders to remote diagnostic support, we ensure your Future Café machine performs at its peak for years to come.'
  },
  'Exclusive Events': {
    icon: <Ticket size={32} />,
    title: 'Masterclass Events',
    content: 'Gain access to digital and in-person events hosted by world-class baristas. Learn the science of roasting, the art of milk steaming, and the secrets behind our most complex flavor profiles.'
  },
  'Instagram': {
    icon: <Instagram size={32} />,
    title: 'Visual Brews',
    content: 'Our Instagram feed is currently brewing. Follow us soon for daily dose of latte art, machine aesthetics, and a behind-the-scenes look at our roastery.'
  },
  'Facebook': {
    icon: <Facebook size={32} />,
    title: 'Future Café Community',
    content: 'Connect with fellow enthusiasts in our upcoming Facebook group to share recipes, troubleshooting tips, and your latest coffee discoveries.'
  },
  'Twitter': {
    icon: <Twitter size={32} />,
    title: 'Quick Roasts',
    content: 'Stay tuned for real-time updates on limited edition drops and flash sales. Our Twitter concierge will be ready to help you in 280 characters or less.'
  },
  'Our Story': {
    icon: <BookOpen size={32} />,
    title: 'Our Heritage',
    content: 'Born from a passion for precision and flavor, Future Café began in a small Swiss laboratory. Today, we are a global leader in coffee technology, dedicated to bringing the specialized craft of a barista into every home through innovation and design.'
  },
  'Sustainability': {
    icon: <Leaf size={32} />,
    title: 'Sustainability Commitment',
    content: 'Our planet is our most precious resource. We are committed to achieving zero-waste at every stage of our supply chain. From carbon-neutral roasting facilities to regenerative farming practices, we brew with the future in mind.'
  },
  'B-Corp Status': {
    icon: <CheckCircle size={32} />,
    title: 'B-Corp Certification',
    content: 'We are proud to be a Certified B Corporation. This means we meet the highest standards of verified social and environmental performance, public transparency, and legal accountability to balance profit and purpose.'
  },
  'Coffee Origins': {
    icon: <Globe size={32} />,
    title: 'World-Class Terroir',
    content: 'We source only the top 1% of the world\'s coffee beans. Our agronomists work directly with farmers in the "Bean Belt"—from the volcanic hills of Ethiopia to the lush mountains of Colombia—to ensure ethical sourcing and incomparable flavor.'
  },
  'Brewing Guides': {
    icon: <Coffee size={32} />,
    title: 'Modern Brewing Mastery',
    content: 'Unlock the full potential of your machine. Our comprehensive guides cover everything from water chemistry for the perfect brew to creative recipe inspiration for seasonal coffee cocktails and specialized milk textures.'
  }
};

export default function Footer() {
  const [activeModal, setActiveModal] = useState<keyof typeof MODAL_CONTENT | null>(null);

  return (
    <footer className="bg-brand-brown text-white pt-24 pb-12 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
                <span className="text-brand-brown font-serif font-bold italic text-xl">F</span>
              </div>
              <h2 className="text-xl font-serif tracking-tighter uppercase font-bold text-white">
                Future <span className="text-brand-gold">Café</span>
              </h2>
            </div>
            <p className="text-brand-cream/60 leading-relaxed text-sm">
              The world's most innovative coffee ecosystem. Combining Swiss precision with Italian tradition for the perfect brew.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' }
              ].map((social) => (
                <button 
                  key={social.label}
                  onClick={() => setActiveModal(social.label as keyof typeof MODAL_CONTENT)}
                  className="p-2 border border-white/20 rounded-full hover:bg-brand-gold hover:border-brand-gold transition-all cursor-pointer group"
                >
                  <social.icon size={18} className="group-hover:text-brand-brown" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-6 text-brand-gold">The Experience</h3>
            <ul className="space-y-4 text-brand-cream/60 text-sm">
              {[
                'Our Story',
                'Sustainability',
                'B-Corp Status',
                'Coffee Origins',
                'Brewing Guides',
                'Customer Reviews'
              ].map((item) => (
                <li key={item}>
                  {item === 'Customer Reviews' ? (
                    <a 
                      href="#reviews"
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {item}
                    </a>
                  ) : (
                    <button 
                      onClick={() => setActiveModal(item as keyof typeof MODAL_CONTENT)}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {item}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-6 text-brand-gold">Membership</h3>
            <ul className="space-y-4 text-brand-cream/60 text-sm">
              {[
                'Join the Club',
                'Auto-Delivery',
                'Recycling Program',
                'Machine Maintenance',
                'Exclusive Events'
              ].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => setActiveModal(item as keyof typeof MODAL_CONTENT)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-xl text-brand-gold">Newsletter</h3>
            <p className="text-brand-cream/60 text-sm">Join our circle of connoisseurs and receive brewing secrets and early access.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-white/5 border-b border-white/30 py-3 pr-10 focus:border-brand-gold outline-none transition-colors"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-gold">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-brand-cream/40">
            © 2026 Future Café Brew. All rights reserved. Nespresso® is a registered trademark of Société des Produits Nestlé S.A.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-brand-cream/40">
            {[
              'Privacy Policy',
              'Terms of Service',
              'Cookie settings'
            ].map((item) => (
              <button 
                key={item}
                onClick={() => setActiveModal(item as keyof typeof MODAL_CONTENT)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Unified Modal */}
      <AnimatePresence>
        {activeModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-[40px] shadow-2xl z-[201] overflow-hidden text-brand-brown"
            >
              <div className="p-10 md:p-14 space-y-8 relative">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="absolute top-8 right-8 p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-500"
                >
                  <X size={20} />
                </button>

                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold">
                  {MODAL_CONTENT[activeModal].icon}
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl font-serif leading-tight">
                    {MODAL_CONTENT[activeModal].title}
                  </h3>
                  <div className="h-1 w-20 bg-brand-gold rounded-full" />
                </div>

                <p className="text-slate-600 text-lg leading-relaxed font-light">
                  {MODAL_CONTENT[activeModal].content}
                </p>

                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-full bg-brand-brown text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </footer>
  );
}

