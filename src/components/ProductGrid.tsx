/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, Heart } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductGrid() {
  const { addItem } = useCart();
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favToast, setFavToast] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});

  const handleAddToCart = (product: any) => {
    addItem({
      ...product,
      price: typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) : product.price
    });
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const toggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isFav = favorites.includes(productId);
    if (isFav) {
      setFavorites(favorites.filter(id => id !== productId));
      setFavToast("Removed from favorites");
    } else {
      setFavorites([...favorites, productId]);
      setFavToast("Added to favorites");
    }
    setTimeout(() => setFavToast(null), 2000);
  };

  const filteredProducts = selectedCategory 
    ? PRODUCTS.filter(p => p.category === selectedCategory)
    : PRODUCTS;

  return (
    <section id="products" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-brand-brown underline decoration-brand-gold/30 underline-offset-8">Innovation in Every Cup</h2>
            <p className="text-slate-600 mt-6">Explore our curated selection of high-performance machines and accessories designed for the modern coffee connoisseur.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 ${!selectedCategory ? 'border-b-2 border-brand-gold text-brand-brown' : 'text-slate-400 hover:text-brand-gold'}`}
            >
              All
            </button>
            <button 
              onClick={() => setSelectedCategory('Vertuo Systems')}
              className={`px-6 py-2 font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 ${selectedCategory === 'Vertuo Systems' ? 'border-b-2 border-brand-gold text-brand-brown' : 'text-slate-400 hover:text-brand-gold'}`}
            >
              Vertuo
            </button>
            <button 
              onClick={() => setSelectedCategory('Original Systems')}
              className={`px-6 py-2 font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 ${selectedCategory === 'Original Systems' ? 'border-b-2 border-brand-gold text-brand-brown' : 'text-slate-400 hover:text-brand-gold'}`}
            >
              Original
            </button>
            <button 
              onClick={() => setSelectedCategory('Accessories')}
              className={`px-6 py-2 font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 ${selectedCategory === 'Accessories' ? 'border-b-2 border-brand-gold text-brand-brown' : 'text-slate-400 hover:text-brand-gold'}`}
            >
              Accessories
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
              >
              <Link to={`/product/${product.id}`}>
              <div className="relative aspect-square overflow-hidden bg-[#F3F4F6] rounded-[32px] mb-8 shadow-sm transition-shadow hover:shadow-xl">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {product.isNew && (
                  <span className="absolute top-6 left-6 bg-brand-gold text-white text-[10px] font-bold px-4 py-1.5 uppercase tracking-[0.2em] rounded-lg shadow-lg">
                    New Release
                  </span>
                )}
                
                <button 
                  onClick={(e) => toggleFavorite(product.id, e)}
                  className={`absolute top-6 right-6 p-3 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg active:scale-90 z-20 ${
                    favorites.includes(product.id) 
                      ? 'bg-brand-gold text-white' 
                      : 'bg-white/80 hover:bg-white text-brand-brown'
                  }`}
                >
                  <Heart size={20} className={favorites.includes(product.id) ? 'fill-current' : ''} />
                </button>

                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="luxury-button w-full"
                  >
                    Quick Add to Cart
                  </button>
                </div>
              </div>

              <div className="space-y-3 px-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">{product.category}</span>
                  <div className="flex items-center gap-1.5">
                    <Star size={14} className="fill-brand-gold text-brand-gold" />
                    <span className="text-sm font-bold text-brand-brown">{product.rating}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-brand-brown leading-tight tracking-tight">{product.name}</h3>
                <p className="text-3xl font-light font-serif text-slate-800">{product.price}</p>
                
                <div className="flex gap-3 pt-3">
                  {product.colorOptions.map((color) => (
                    <button 
                      key={color.name}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedColors(prev => ({ ...prev, [product.id]: color.name }));
                      }}
                      className={`w-7 h-7 rounded-full border-2 transition-all duration-300 relative ${
                        (selectedColors[product.id] || product.colorOptions[0].name) === color.name 
                          ? 'border-brand-gold scale-110 shadow-md ring-2 ring-brand-gold/20' 
                          : 'border-white shadow-sm ring-1 ring-slate-100'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {(selectedColors[product.id] || product.colorOptions[0].name) === color.name && (
                        <motion.div 
                          layoutId={`active-color-${product.id}`}
                          className="absolute inset-[-4px] rounded-full border-2 border-brand-gold"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
        
        {/* Toast Notification */}
        <AnimatePresence>
          {addedItem && (
            <motion.div
              initial={{ opacity: 0, y: 50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 50, x: '-50%' }}
              className="fixed bottom-10 left-1/2 z-[100] bg-brand-brown text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-medium tracking-wide"
            >
              <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
              Item added to your collection
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {favToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 50, x: '-50%' }}
              className="fixed bottom-24 left-1/2 z-[100] bg-brand-gold text-brand-brown px-8 py-3 rounded-full shadow-2xl flex items-center gap-3 font-bold tracking-wide"
            >
              <Heart size={16} className="fill-current" />
              {favToast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
