/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Zap, ArrowRight, X, Cpu } from 'lucide-react';

const TECH_FEATURES = [
  {
    title: 'PRECISION TEMPERATURE CONTROL',
    description: 'Water is heated to the exact degree required for each specific blend, ensuring optimal extraction without bitterness. Our sensors monitor temperature 10 times per second.',
    icon: <Zap size={24} />
  },
  {
    title: 'HIGH-PRESSURE EXTRACTION SYSTEMS',
    description: 'Up to 19 bars of pressure forced through the grounds to release the full aromatic profile and create an incomparable crema that defines the Future Café experience.',
    icon: <Cpu size={24} />
  },
  {
    title: 'ONE-TOUCH SIMPLICITY',
    description: 'Sophisticated technology made effortless. A single button activates a complex sequence of brewing parameters tailored to your choice, from cup size to flow rate.',
    icon: <ArrowRight size={24} />
  },
  {
    title: 'SUSTAINABLE ALUMINUM CAPSULES',
    description: 'Our capsules are made from 80% recycled aluminum, protecting the coffee from light, oxygen, and moisture to preserve freshness while being infinitely recyclable.',
    icon: <Zap size={24} />
  }
];

const CENTRIFUSION_INFO = {
  title: 'Centrifusion™ Technology',
  description: 'Our revolutionary Centrifusion™ technology is the heart of every Future Café machine. It combines centrifugal force (up to 7,000 rotations per minute) with infusion to extract the perfect crema and flavor from every capsule by reading each barcode and adjusting every brewing parameter.'
};

export default function InnovationSection() {
  const [selectedTech, setSelectedTech] = useState<typeof TECH_FEATURES[0] | typeof CENTRIFUSION_INFO | null>(null);

  return (
    <section id="innovation" className="py-24 bg-[#f9f7f2] overflow-hidden">
      <div className="container mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Column: Image with Overlay */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[1.1/1] rounded-[40px] overflow-hidden shadow-2xl relative">
              <img 
                src="https://lh3.googleusercontent.com/pw/AP1GczNtCYP6TPKFW9IvahanCIvaY44QNJSEYnbMo7_JwN8V8MRQd8Lan8uuZdl-OAHOkegx2wyuodNsd_-H7HQWDLsyF7o1XWTA2Lb4o7XHY1rYSiFdjuKt7jKz3KcrOBHJU8Mn4QWzZcqWOunaQUinZbk=w1024-h1024-s-no-gm?authuser=4" 
                alt="Precision Brewing Technology"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Smart Extraction Overlay */}
              <div 
                onClick={() => setSelectedTech(CENTRIFUSION_INFO)}
                className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent cursor-pointer group"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Zap size={20} className="text-brand-brown fill-brand-brown" />
                  </div>
                  <div>
                    <h3 className="text-white text-2xl font-serif mb-2 flex items-center gap-2">
                      Smart Extraction
                      <ArrowRight size={18} className="text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-white/80 text-sm max-w-sm leading-relaxed">
                      Our patented technology analyzes the barcode on every capsule to adjust brewing parameters automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column: Text and List */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-5xl md:text-6xl font-serif text-brand-brown mb-4">The Science of</h2>
              <h2 className="text-5xl md:text-6xl font-serif text-brand-brown italic">Exceptional Flavor</h2>
            </div>
            
            <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
              Every Future Café machine is a masterpiece of precision engineering. We've spent decades perfecting the art of pressure, temperature, and timing to ensure that every cup you brew is as perfect as the last.
            </p>

            <div className="space-y-6">
              {TECH_FEATURES.map((feature, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedTech(feature)}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-10 h-10 bg-[#ebe5d9] rounded-full flex items-center justify-center group-hover:bg-brand-gold transition-colors">
                    <ChevronRight size={18} className="text-brand-brown" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] transform transition-transform group-hover:translate-x-2">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button 
                onClick={() => setSelectedTech(CENTRIFUSION_INFO)}
                className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] hover:text-brand-gold transition-colors group"
              >
                Learn about our technology
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tech Detail Modal */}
      <AnimatePresence>
        {selectedTech && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTech(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-[40px] shadow-2xl z-[201] overflow-hidden"
            >
              <div className="p-10 md:p-14 space-y-8 relative">
                <button 
                  onClick={() => setSelectedTech(null)}
                  className="absolute top-8 right-8 p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold">
                  {'icon' in selectedTech ? selectedTech.icon : <Zap size={32} />}
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-serif text-brand-brown leading-tight">
                    {selectedTech.title}
                  </h3>
                  <div className="h-1 w-20 bg-brand-gold rounded-full" />
                </div>

                <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light">
                  {selectedTech.description}
                </p>

                <button 
                  onClick={() => setSelectedTech(null)}
                  className="w-full bg-brand-brown text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all"
                >
                  Acknowledge Technology
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

