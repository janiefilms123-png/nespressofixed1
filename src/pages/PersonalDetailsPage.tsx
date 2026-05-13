/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, MapPin, Phone, Calendar, Shield, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function PersonalDetailsPage() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-8 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-serif text-brand-brown">Access Denied</h1>
          <p className="text-slate-500">Please sign in to view your personal details.</p>
          <Link to="/" className="luxury-button inline-flex">Back to Home</Link>
        </div>
      </div>
    );
  }

  const handleLogOut = async () => {
    await logOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-32 bg-brand-cream/30">
      <div className="container mx-auto px-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/" className="p-3 bg-white rounded-full hover:bg-slate-100 transition-colors shadow-sm">
            <ArrowLeft size={20} className="text-brand-brown" />
          </Link>
          <h1 className="text-5xl font-serif text-brand-brown">Personal Details</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Left Column: Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-[48px] p-8 shadow-xl border border-slate-100 flex flex-col items-center text-center space-y-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-cream shadow-inner bg-brand-cream flex items-center justify-center">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                ) : (
                  <User size={64} className="text-brand-gold" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-serif text-brand-brown">{user.displayName || 'Club Member'}</h2>
                <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mt-1">
                  {user.isAnonymous ? 'Guest Member' : 'Founding Member'}
                </p>
              </div>
              
              <div className="w-full h-px bg-slate-100" />
              
              <button 
                onClick={handleLogOut}
                className="w-full flex items-center justify-center gap-2 text-red-500 font-bold uppercase tracking-widest text-[10px] hover:bg-red-50 py-4 rounded-2xl transition-all"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </motion.div>

          {/* Right Column: Details Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 space-y-8"
          >
            <div className="bg-white rounded-[48px] p-10 shadow-xl border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 pb-4 border-b border-slate-50">Profile Information</h3>
              
              <div className="space-y-8">
                <DetailRow icon={Mail} label="Email Address" value={user.email || 'Not connected'} isPlaceholder={!user.email} />
                <DetailRow icon={Phone} label="Phone Number" value={user.phoneNumber || 'Not connected'} isPlaceholder={!user.phoneNumber} />
                <DetailRow icon={MapPin} label="Default Shipping" value="123 Luxury Lane, Espresso Valley, CA" isPlaceholder />
                <DetailRow icon={Calendar} label="Member Since" value="May 2026" />
                <DetailRow icon={Shield} label="Account Security" value={user.isAnonymous ? 'Anonymous Session' : 'Secured Account'} />
              </div>
              
              <div className="mt-12 pt-8 border-t border-slate-50">
                <button className="luxury-button w-full sm:w-auto">
                  Edit Profile Ritual
                </button>
              </div>
            </div>

            <div className="bg-brand-brown rounded-[48px] p-10 text-white relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-serif">Future Café Rewards</h3>
                <p className="text-white/60 font-light max-w-md">
                  You've brewed <span className="text-brand-gold font-bold">128 cups</span> this month. You're only 12 cups away from your next complimentary Platinum Reserve selection.
                </p>
                <div className="flex gap-4 pt-4">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-brand-gold"
                    />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase">85%</span>
                </div>
              </div>
              <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                <Shield size={120} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value, isPlaceholder }: { icon: any, label: string, value: string, isPlaceholder?: boolean }) {
  return (
    <div className="flex items-start gap-6">
      <div className="p-3 bg-brand-cream rounded-2xl">
        <Icon size={20} className="text-brand-gold" />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className={`text-lg font-medium text-brand-brown ${isPlaceholder ? 'italic opacity-50' : ''}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
