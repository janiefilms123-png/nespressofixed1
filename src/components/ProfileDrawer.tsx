/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Settings, Package, Heart, LogIn, ArrowRight, Info, LogOut, Mail, Phone, ShieldCheck, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'selection' | 'email' | 'phone' | 'anonymous';

export default function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const { 
    user, 
    signIn, 
    signInWithEmail, 
    signUpWithEmail, 
    signInAnonymously, 
    signInWithPhone, 
    logOut, 
    loading 
  } = useAuth();
  
  const [showToast, setShowToast] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('selection');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleLinkClick = (label: string, href?: string) => {
    if (href) {
      onClose();
      navigate(href);
    } else {
      setShowToast(label);
    }
  };

  const onSuccess = () => {
    onClose();
    navigate('/profile');
    resetAuth();
  };

  const resetAuth = () => {
    setAuthMode('selection');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setVerificationCode('');
    setConfirmationResult(null);
    setAuthError(null);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn();
      onSuccess();
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') return;
      setAuthError(error.message);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      onSuccess();
    } catch (error: any) {
      setAuthError(error.message);
    }
  };

  const handleAnonymousSignIn = async () => {
    setAuthError(null);
    try {
      await signInAnonymously();
      onSuccess();
    } catch (error: any) {
      setAuthError(error.message);
    }
  };

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });
    }
    return (window as any).recaptchaVerifier;
  };

  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const verifier = setupRecaptcha();
      const result = await signInWithPhone(phoneNumber, verifier);
      setConfirmationResult(result);
    } catch (error: any) {
      setAuthError(error.message);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await confirmationResult?.confirm(verificationCode);
      onSuccess();
    } catch (error: any) {
      setAuthError(error.message);
    }
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
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[101] shadow-2xl flex flex-col pt-10 overflow-y-auto"
          >
            <div className="px-8 flex justify-between items-center">
              {authMode !== 'selection' ? (
                <button 
                  onClick={() => resetAuth()}
                  className="flex items-center gap-2 text-slate-400 hover:text-brand-brown transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
              ) : <div />}
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 px-8 py-8 space-y-10">
              {/* Header */}
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
                    {loading ? '...' : (user ? (user.isAnonymous ? 'Guest Member' : `Hello, ${user.displayName?.split(' ')[0] || 'Member'}`) : 'Join the Club')}
                  </h2>
                  <p className="text-slate-500 text-sm">
                    {user ? (user.isAnonymous ? 'Upgrade your account for permanent access.' : user.email || user.phoneNumber) : 'Select your preferred way to authenticate.'}
                  </p>
                </div>
              </div>

              {authError && (
                <div className="p-4 bg-red-50 text-red-500 text-xs rounded-xl border border-red-100">
                  {authError}
                </div>
              )}

              {/* Recaptcha Container */}
              <div id="recaptcha-container"></div>

              <div className="space-y-4">
                {!user ? (
                  <>
                    {authMode === 'selection' && (
                      <div className="space-y-3">
                        <AuthButton 
                          icon={LogIn} 
                          label="Sign In with Google" 
                          onClick={handleGoogleSignIn} 
                          primary 
                        />
                        <AuthButton 
                          icon={Mail} 
                          label="Email / Password" 
                          onClick={() => setAuthMode('email')} 
                        />
                        <AuthButton 
                          icon={Phone} 
                          label="Phone Number" 
                          onClick={() => setAuthMode('phone')} 
                        />
                        <AuthButton 
                          icon={ShieldCheck} 
                          label="Continue as Guest" 
                          onClick={handleAnonymousSignIn} 
                        />
                      </div>
                    )}

                    {authMode === 'email' && (
                      <form onSubmit={handleEmailAuth} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                          <input 
                            type="email" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                            placeholder="your@email.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Password</label>
                          <input 
                            type="password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                            placeholder="••••••••"
                          />
                        </div>
                        <button 
                          type="submit"
                          className="luxury-button w-full mt-4"
                        >
                          {isSignUp ? 'Create Ritual Account' : 'Sign In to Club'}
                        </button>
                        <button 
                          type="button"
                          onClick={() => setIsSignUp(!isSignUp)}
                          className="w-full text-[10px] font-bold uppercase tracking-widest text-brand-gold mt-2 hover:underline"
                        >
                          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </button>
                      </form>
                    )}

                    {authMode === 'phone' && (
                      <div className="space-y-4">
                        {!confirmationResult ? (
                          <form onSubmit={handlePhoneSignIn} className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Phone Number</label>
                              <input 
                                type="tel" 
                                required 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                                placeholder="+1 123 456 7890"
                              />
                            </div>
                            <button 
                              type="submit"
                              className="luxury-button w-full mt-4"
                            >
                              Send Verification Code
                            </button>
                          </form>
                        ) : (
                          <form onSubmit={handleVerifyCode} className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Verification Code</label>
                              <input 
                                type="text" 
                                required 
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                                placeholder="123456"
                              />
                            </div>
                            <button 
                              type="submit"
                              className="luxury-button w-full mt-4"
                            >
                              Confirm Code
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {[
                      { icon: User, label: 'Personal Details', href: '/profile' },
                      { icon: Package, label: 'Track My Order' },
                      { icon: Heart, label: 'My Favorites Bucket' },
                      { icon: Settings, label: 'Machine Settings' },
                    ].map((item, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleLinkClick(item.label, item.href)}
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

function AuthButton({ icon: Icon, label, onClick, primary = false }: { icon: any, label: string, onClick: () => void, primary?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${primary ? 'bg-brand-cream border border-brand-gold/10' : 'hover:bg-slate-50'}`}
    >
      <div className="flex items-center gap-4">
        <Icon size={20} className="text-brand-gold" />
        <span className={`font-bold ${primary ? 'text-brand-brown' : 'text-slate-600'}`}>{label}</span>
      </div>
      <ArrowRight size={16} className="text-brand-gold" />
    </button>
  );
}
