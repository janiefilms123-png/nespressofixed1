/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Send, Trash2, User, Quote, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Review, subscribeToReviews, addReview, deleteReview, seedReviews } from '../services/reviewService';

interface ReviewsSectionProps {
  productId?: string;
  title?: string;
  subtitle?: string;
}

export default function ReviewsSection({ productId, title, subtitle }: ReviewsSectionProps) {
  const { user, signIn } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToReviews(setReviews, productId);
    return () => unsubscribe();
  }, [productId]);

  const handleSeed = async () => {
    if (!user) {
      signIn();
      return;
    }
    setIsSeeding(true);
    try {
      await seedReviews(user.uid);
    } catch (error) {
      console.error('Error seeding reviews:', error);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      signIn();
      return;
    }
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      await addReview({
        userId: user.uid,
        productId,
        userName: user.displayName || 'Anonymous User',
        userPhoto: user.photoURL || undefined,
        rating,
        comment: comment.trim(),
      });
      setComment('');
      setRating(5);
    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <section id="reviews" className="py-32 bg-[#fdfaf5] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-cream/40 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-8 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cream rounded-full text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <Star size={12} className="fill-current" />
            Voice of the Community
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif text-brand-brown mb-8"
          >
            {title || 'Real Stories,'} <br /> <span className="italic">{subtitle || 'Real Crema'}</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Review Input */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-white p-8 md:p-10 rounded-[48px] shadow-sm border border-slate-100 h-fit sticky top-24"
          >
            <h3 className="text-2xl font-serif text-brand-brown mb-6">Leave Your Mark</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Your Rating</label>
                <div className="flex gap-2 p-3 bg-slate-50 rounded-2xl w-fit">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform active:scale-90"
                    >
                      <Star 
                        size={24} 
                        className={star <= rating ? 'text-brand-gold fill-brand-gold' : 'text-slate-200'} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Your Feedback</label>
                <textarea
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
                  rows={4}
                  className="w-full bg-slate-50 border-none rounded-3xl py-6 px-6 focus:ring-2 focus:ring-brand-gold/20 text-sm outline-none resize-none placeholder:text-slate-300"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-brand-brown text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Brewing...' : (
                  <>
                    Post Review
                    <Send size={16} />
                  </>
                )}
              </button>
              
              {!user && (
                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest mt-4">
                  Please sign in to share your thoughts
                </p>
              )}

              <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">
                  Developer Tools
                </p>
                <button
                  type="button"
                  onClick={handleSeed}
                  disabled={isSeeding}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-brand-cream text-brand-gold rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all disabled:opacity-50"
                >
                  <Database size={14} />
                  {isSeeding ? 'Seeding...' : 'Seed Sample Reviews'}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Reviews List */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {reviews.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-brand-cream/30 p-12 rounded-[48px] text-center"
                >
                  <MessageSquare size={40} className="text-brand-gold/40 mx-auto mb-4" />
                  <p className="text-brand-brown/60 font-serif text-xl italic">No stories yet. Be the first to share.</p>
                </motion.div>
              ) : (
                reviews.map((review, idx) => (
                  <motion.div
                    key={review.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white p-8 md:p-10 rounded-[48px] shadow-sm border border-slate-100 group relative"
                  >
                    <Quote className="absolute top-8 right-10 text-brand-gold/10" size={60} />
                    
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-cream rounded-full overflow-hidden border-2 border-brand-gold/20">
                          {review.userPhoto ? (
                            <img src={review.userPhoto} alt={review.userName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-brand-cream">
                              <User size={24} className="text-brand-gold" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-brown text-lg">{review.userName}</h4>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                className={i < review.rating ? 'text-brand-gold fill-brand-gold' : 'text-slate-100'} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {user?.uid === review.userId && (
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="p-3 bg-red-50 text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    <p className="text-slate-600 text-lg leading-relaxed font-light italic relative z-10">
                      "{review.comment}"
                    </p>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
