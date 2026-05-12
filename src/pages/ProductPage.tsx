/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Minus, ShoppingBag, ShieldCheck, Truck, RefreshCw, Star as StarIcon, User, Quote, Send, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ReviewsSection from '../components/ReviewsSection';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const product = PRODUCTS.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colorOptions[0].name);

  useEffect(() => {
    if (!product) {
      navigate('/');
      return;
    }
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [product, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedColor}`,
      name: `${product.name} (${selectedColor})`,
      price: parseFloat(product.price.replace('$', '')),
      image: product.image,
      quantity: quantity
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Breadcrumb / Back */}
      <div className="container mx-auto px-8 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-brown transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Back to Collection</span>
        </Link>
      </div>

      <div className="container mx-auto px-8 pb-32">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Product Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="aspect-square rounded-[64px] bg-brand-cream overflow-hidden border border-slate-100 p-12">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <Truck size={24} className="text-brand-gold" />
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Shipping</p>
                  <p className="text-xs font-bold text-brand-brown">Complimentary</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <ShieldCheck size={24} className="text-brand-gold" />
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Warranty</p>
                  <p className="text-xs font-bold text-brand-brown">2 Year Swiss</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <RefreshCw size={24} className="text-brand-gold" />
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Returns</p>
                  <p className="text-xs font-bold text-brand-brown">30-Day Ritual</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Info Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-brand-gold text-brand-brown text-[8px] font-bold uppercase tracking-[0.2em] rounded-full">
                {product.category}
              </div>
              <h1 className="text-6xl font-serif text-brand-brown leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size={14} className={i < Math.floor(product.rating) ? 'text-brand-gold fill-brand-gold' : 'text-slate-200'} />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{product.reviews} Global Reviews</span>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-slate-500 leading-relaxed font-light">
                {product.description}
              </p>
              <div className="text-4xl font-bold text-brand-brown">
                {product.price}
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Config options */}
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Select Finish</label>
                <div className="flex gap-4">
                  {product.colorOptions.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`px-6 py-3 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                        selectedColor === color.name ? 'border-brand-brown bg-brand-brown text-white' : 'border-slate-100 hover:border-brand-gold'
                      }`}
                    >
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20" 
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs font-bold">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Quantity</label>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-brand-brown"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-10 text-center font-bold text-brand-brown">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-brand-brown"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-brand-brown text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                  >
                    <ShoppingBag size={18} />
                    Add to Ritual
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section specific to product */}
        <div className="mt-32 pt-32 border-t border-slate-100">
           <ReviewsSection 
            productId={product.id} 
            title="Experience Shared"
            subtitle={`Integrated ${product.name}`}
           />
        </div>
      </div>
    </div>
  );
}
