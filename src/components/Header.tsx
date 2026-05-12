/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ChevronDown, User, Coffee, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NAV_ITEMS } from '../constants';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';
import ProfileDrawer from './ProfileDrawer';

export default function Header() {
  const { user } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLink = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        // We'll just go home, scrolling is handled by browser if we use hash in Link
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isHome = location.pathname === '/';
  const headerTextColor = isHome && !isScrolled ? 'text-white' : 'text-brand-brown';
  const headerBg = isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-8';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
        <div className="container mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-brown rounded-full flex items-center justify-center border border-white/20 group-hover:bg-brand-gold transition-colors duration-500">
              <Coffee size={22} className="text-white" />
            </div>
            <h1 className={`text-2xl font-serif tracking-[0.05em] uppercase font-bold transition-colors ${headerTextColor}`}>
              Future <span className="">Café</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={`/${item.href}`}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    handleNavLink(item.href);
                  }
                }}
                className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:text-brand-gold relative group ${headerTextColor}`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={`flex items-center gap-6 transition-colors ${headerTextColor}`}>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:opacity-70 transition-all cursor-pointer"
            >
              <Search size={22} />
            </button>
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="p-2 hover:opacity-70 transition-all hidden sm:block cursor-pointer"
            >
              {user?.photoURL ? (
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : (
                <User size={22} />
              )}
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:opacity-70 transition-all cursor-pointer"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={totalItems}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-lg"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button 
              className="p-2 hover:opacity-70 transition-all cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Components */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-[65] flex flex-col p-12 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-16">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-brown rounded-full flex items-center justify-center">
                    <span className="text-white font-serif font-bold italic text-xl">F</span>
                  </div>
                  <h2 className="text-xl font-serif font-bold text-brand-brown uppercase">Menu</h2>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-10">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    key={item.label}
                  >
                    <Link
                      to={`/${item.href}`}
                      onClick={() => handleNavLink(item.href)}
                      className="text-4xl font-serif font-medium text-brand-brown hover:text-brand-gold transition-colors flex items-center justify-between group w-full"
                    >
                      {item.label}
                      <ArrowRight size={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-gold" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto space-y-8">
                <div className="h-px bg-slate-100" />
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsSearchOpen(true);
                    }}
                    className="flex flex-col items-center gap-3 p-4 bg-brand-cream rounded-2xl transition-all active:scale-95"
                  >
                    <Search size={20} className="text-brand-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-brown">Search</span>
                  </button>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsProfileOpen(true);
                    }}
                    className="flex flex-col items-center gap-3 p-4 bg-brand-cream rounded-2xl transition-all active:scale-95"
                  >
                    {user?.photoURL ? (
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <User size={20} className="text-brand-gold" />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-brown">Profile</span>
                  </button>
                </div>
                <Link 
                  to="/#products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-brand-brown text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all active:scale-95 shadow-xl flex justify-center"
                >
                  The Experience Shop
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
