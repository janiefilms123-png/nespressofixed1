/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} className="text-brand-brown" />
                <h2 className="text-2xl font-serif text-brand-brown">Your Collection</h2>
                <span className="text-sm font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center">
                    <ShoppingBag size={32} className="text-slate-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif mb-2">Collection is empty</h3>
                    <p className="text-slate-500 text-sm max-w-[200px]">Start your coffee journey by selecting your favorite machines.</p>
                  </div>
                  <button 
                    onClick={() => {
                      onClose();
                      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-brand-brown text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px]"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6">
                      <div className="w-24 h-24 bg-brand-cream rounded-2xl overflow-hidden shrink-0 shadow-inner">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-lg leading-tight">{item.name}</h4>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-slate-500">{item.category}</p>
                        <div className="flex justify-between items-end pt-2">
                          <div className="flex items-center border border-slate-200 rounded-lg">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-slate-50"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-slate-50"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="text-lg font-serif">
                            {typeof item.price === 'string' ? item.price : `$${item.price.toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-slate-100 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 text-sm uppercase tracking-widest font-bold">Subtotal</span>
                  <span className="text-3xl font-serif text-brand-brown">${totalPrice.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckoutClick}
                  className="w-full bg-brand-brown text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                >
                  Confirm Collection
                  <ArrowRight size={18} />
                </button>
                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
