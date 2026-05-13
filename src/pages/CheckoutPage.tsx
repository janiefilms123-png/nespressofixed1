/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  ShoppingBag,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      await signIn();
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Create order record in Firestore
      const order = await createOrder({
        userId: user.uid,
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}, ${formData.country}`,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: totalPrice,
        status: 'pending'
      });
      
      // 2. Clear cart and move to success page
      clearCart();
      navigate('/purchase-received', { 
        state: { 
          totalPrice, 
          orderId: order?.id || 'RITUAL-' + Math.random().toString(36).substr(2, 9).toUpperCase() 
        } 
      });
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong during checkout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 min-h-screen bg-white flex flex-col items-center justify-center text-center px-8">
        <div className="w-24 h-24 bg-brand-cream rounded-full flex items-center justify-center mb-8">
          <ShoppingBag size={40} className="text-slate-300" />
        </div>
        <h2 className="text-4xl font-serif text-brand-brown mb-4">Your collection is empty</h2>
        <p className="text-slate-500 mb-8 max-w-sm">Add some of our precision instruments to your ritual before checking out.</p>
        <Link 
          to="/"
          className="bg-brand-brown text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl active:scale-95"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-white pb-32">
      <div className="container mx-auto px-8 max-w-6xl">
        <div className="flex items-center justify-between mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-brown transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Store</span>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-serif text-brand-brown">Checkout</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mt-2">Secure Ritual Completion</p>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Form Side */}
          <div className="lg:col-span-7 space-y-12">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
              <section className="space-y-8">
                <div className="flex items-center gap-4 text-brand-brown">
                  <div className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center text-xs font-bold">1</div>
                  <h2 className="text-2xl font-serif">Shipping Details</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">First Name</label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-brand-gold/20 text-sm outline-none shadow-sm"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Last Name</label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-brand-gold/20 text-sm outline-none shadow-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-brand-gold/20 text-sm outline-none shadow-sm"
                    placeholder="ritual@futurecafe.ch"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Street Address</label>
                  <input
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-brand-gold/20 text-sm outline-none shadow-sm"
                    placeholder="123 Espresso Way"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">City</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-brand-gold/20 text-sm outline-none shadow-sm"
                      placeholder="Zurich"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Zip Code</label>
                    <input
                      required
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-brand-gold/20 text-sm outline-none shadow-sm"
                      placeholder="8001"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <div className="flex items-center gap-4 text-brand-brown">
                  <div className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center text-xs font-bold">2</div>
                  <h2 className="text-2xl font-serif">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-[#0070ba]/10 text-[#0070ba] rounded-3xl border border-[#0070ba]/20 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                         <svg className="w-6 h-6 fill-[#0070ba]" viewBox="0 0 24 24">
                           <path d="M20.067 8.478c.492.88.556 2.014.345 3.227l-0.038.216c-0.218 1.258-0.89 2.222-1.996 2.868 -1.107.646-2.5 0.963-3.931 0.963l-0.75 0c-0.457 0-0.852.321-0.938.769l-1.011 5.257c-0.041.213-0.228.366-0.445.366l-3.321 0c-0.347 0-0.6-0.32-0.536-0.662l1.666-8.916c0.041-0.22 0.232-0.378 0.456-0.378l2.915 0c1.077 0 2.213-.15 3.197-.562 .984-.412 1.589-1.042 1.832-1.898 .219-0.771.135-1.554-0.301-2.224 -0.428-.658-1.213-1.015-2.261-1.015l-4.57 0c-0.305 0-0.568.214-0.626.514l-1.637 8.528c-0.083.433-0.459.743-0.899.743l-2.613 0c-0.305 0-0.569.214-0.627.514l-0.842 4.385c-0.041.213-0.228.366-0.445.366l-2.736 0c-0.347 0-0.601-.32-0.536-.662l3.433-17.88c0.084-.433.461-.743.902-.743l10.155 0c1.944 0 3.511.45 4.498 1.348Z" />
                         </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold uppercase tracking-widest leading-none mb-1">PayPal</p>
                        <p className="text-[10px] uppercase tracking-widest opacity-60 italic">Secured by PayPal.Me</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#0070ba]">
                      <div className="w-3 h-3 rounded-full bg-[#0070ba]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-4">
                    <div className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl grayscale opacity-40">
                      <ShieldCheck size={20} className="text-brand-brown" />
                      <span className="text-[8px] font-bold uppercase tracking-widest">RSA 2048-bit</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl grayscale opacity-40">
                      <Truck size={20} className="text-brand-brown" />
                      <span className="text-[8px] font-bold uppercase tracking-widest">Global Express</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl grayscale opacity-40">
                      <CheckCircle2 size={20} className="text-brand-brown" />
                      <span className="text-[8px] font-bold uppercase tracking-widest">Authenticated</span>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>

          {/* Summary Side */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 rounded-[64px] p-10 border border-slate-100 sticky top-32 space-y-10">
              <h3 className="text-2xl font-serif text-brand-brown">Order Summary</h3>
              
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden shrink-0 shadow-sm border border-slate-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-brand-brown text-sm truncate">{item.name}</p>
                      <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-bold text-brand-brown">
                      ${( (typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price) * item.quantity ).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-10 border-t border-slate-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 uppercase tracking-widest font-bold text-[10px]">Subtotal</span>
                  <span className="font-bold text-brand-brown">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 uppercase tracking-widest font-bold text-[10px]">Tax</span>
                  <span className="font-bold text-brand-brown">$0.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 uppercase tracking-widest font-bold text-[10px]">Shipping</span>
                  <span className="font-bold text-brand-gold uppercase tracking-widest text-[10px]">Complimentary</span>
                </div>
                <div className="h-px bg-slate-200 my-4" />
                <div className="flex justify-between items-end">
                  <span className="text-brand-brown uppercase tracking-[0.2em] font-bold text-xs">Total</span>
                  <span className="text-4xl font-serif text-brand-brown">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                form="checkout-form"
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-[#0070ba] text-white py-6 rounded-3xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#003087] transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing Order...
                  </>
                ) : (
                  <>
                    Pay with PayPal
                    <ExternalLink size={16} />
                  </>
                )}
              </button>
              
              <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest leading-relaxed">
                By completing your purchase you agree to our <br />
                <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Ritual Privacy Policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
