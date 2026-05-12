/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/pw/AP1GczOeFVYXjbi9wfsl4UYLqrOV-hZ6ARWJIu7zA2EnghRIqA-amlQwRBIz_cyj023v9vxeND0YuK8CNFfs247OvDR7mLo9fmNWJcLmtVYBwn6pCfFrj4hxZ4SfO7A-GeYuh_OfKVak9U0O6OjYvx3CZJI=w1024-h1024-s-no-gm?authuser=4" 
          alt="Future Café Brew Experience"
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="container mx-auto px-12 relative z-10 pt-20">
        <div className="max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
              className="inline-block px-5 py-1.5 border border-brand-gold/60 text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] rounded-lg mb-10 overflow-hidden relative group"
            >
              <span className="relative z-10">Future Café Series</span>
              <div className="absolute inset-0 bg-brand-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </motion.div>
            
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 100, skewY: 5 },
                visible: { opacity: 1, y: 0, skewY: 0 }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[140px] font-serif text-white leading-[0.82] mb-12 tracking-tighter"
            >
              Coffee, <br />
              <span className="italic text-brand-gold">Perfected</span> <br />
              by <span className="text-white">Design</span>
            </motion.h1>

            <motion.div 
               variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="flex gap-8 items-start mb-14"
            >
              <div className="w-1 h-32 bg-brand-gold/40 mt-2 shrink-0"></div>
              <p className="text-2xl md:text-4xl text-brand-cream/90 font-light max-w-3xl leading-[1.3] tracking-tight">
                Experience the machine that <span className="italic text-brand-gold font-normal underline decoration-brand-gold/30 underline-offset-4">redefines</span> precision. Centrifusion™ technology meets obsessive craftsmanship.
              </p>
            </motion.div>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="luxury-button min-w-[240px]"
              >
                Explore Machines
              </button>
              <button 
                onClick={() => document.getElementById('innovation')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-6 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-brand-brown transition-all shadow-2xl active:scale-95 min-w-[240px]"
              >
                Discover Blends
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
