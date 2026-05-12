/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Play, Coffee, Sparkles } from 'lucide-react';

export default function VideoShowcase() {
  return (
    <section className="py-16 bg-brand-brown relative overflow-hidden group/showcase">
      {/* Immersive background effects */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-gold blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/20 blur-[140px] rounded-full" />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em]">
                <Sparkles size={12} className="shrink-0" />
                The Cinematic Ritual
              </div>
              <h2 className="text-7xl md:text-8xl font-serif text-white leading-[0.85] tracking-tighter">
                The Art <br />
                <span className="italic text-brand-gold font-light">of Fluid</span> <br />
                Motion
              </h2>
              <p className="text-brand-cream/60 text-xl md:text-2xl leading-relaxed font-light max-w-xl italic">
                "Precision is not just a measurement, it's a feeling. We've engineered every second of the brew cycle to be a performance."
              </p>
            </div>

            <div className="flex items-center gap-12 pt-8 border-t border-white/10">
              <div className="space-y-1">
                <div className="text-5xl font-serif text-white font-bold tracking-tighter">19 Bar</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold/60">Pressure</div>
              </div>
              <div className="w-px h-16 bg-white/10 hidden md:block" />
              <div className="space-y-1">
                <div className="text-5xl font-serif text-white font-bold tracking-tighter">7K RPM</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold/60">Centrifusion</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotateY: 20, x: 50 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="perspective-1000"
          >
            <div className="relative group/video">
              <div className="relative aspect-video rounded-[48px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 bg-black">
                <iframe
                  className="w-full h-full opacity-80 group-hover/video:opacity-100 transition-opacity duration-700"
                  src="https://www.youtube.com/embed/tONOtWWiUXc?autoplay=0&controls=1&rel=0&modestbranding=1"
                  title="Future Café Brand Experience"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                
                {/* Overlay vignette */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -inset-4 border border-brand-gold/20 rounded-[60px] pointer-events-none -z-10 group-hover/video:scale-105 transition-transform duration-700" />
              <div className="absolute -top-12 -right-12 w-24 h-24 border-t-2 border-r-2 border-brand-gold/30 rounded-tr-[40px] pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-24 h-24 border-b-2 border-l-2 border-brand-gold/30 rounded-bl-[40px] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
