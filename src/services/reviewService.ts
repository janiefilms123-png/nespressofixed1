/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp, 
  deleteDoc, 
  doc,
  where
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Review {
  id: string;
  userId: string;
  productId?: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  createdAt: any;
}

export function subscribeToReviews(callback: (reviews: Review[]) => void, productId?: string) {
  let reviewsQuery = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
  
  if (productId) {
    reviewsQuery = query(
      collection(db, 'reviews'), 
      where('productId', '==', productId),
      orderBy('createdAt', 'desc')
    );
  }
  
  return onSnapshot(reviewsQuery, (snapshot) => {
    const reviews = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Review[];
    callback(reviews);
  });
}

export async function addReview(review: Omit<Review, 'id' | 'createdAt'>) {
  return addDoc(collection(db, 'reviews'), {
    ...review,
    createdAt: serverTimestamp()
  });
}

export async function deleteReview(reviewId: string) {
  return deleteDoc(doc(db, 'reviews', reviewId));
}

export async function seedReviews(currentUserId: string) {
  const sampleReviews = [
    {
      userId: currentUserId,
      productId: '1',
      userName: 'Alexander Vance',
      userPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      rating: 5,
      comment: "The BrewOne has completely elevated my morning ritual. The crema is consistently rich and the interface is intuitive as it gets.",
    },
    {
      userId: currentUserId,
      productId: '1',
      userName: 'Elena Rodriguez',
      userPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 4,
      comment: "A beautiful addition to my kitchen. The Chrome finish is stunning. Docked one star only because I wish it held more water.",
    },
    {
      userId: currentUserId,
      productId: '2',
      userName: 'Julian Chen',
      userPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      rating: 5,
      comment: "Despite its small footprint, the Mini Brew Pro punches way above its weight. Perfect temperature extraction every time.",
    },
    {
      userId: currentUserId,
      productId: '3',
      userName: 'Sophia Thorne',
      userPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      rating: 5,
      comment: "The FoamPro 5 is the secret to my morning bliss. The cold foam setting is a game-changer for iced lattes.",
    },
    {
      userId: currentUserId,
      productId: '4',
      userName: 'Marcus Sterling',
      userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 4,
      comment: "Cafe Elite lives up to its name. The Rose Gold finish is exquisite and the espresso quality is professional-grade.",
    },
    {
      userId: currentUserId,
      productId: '5',
      userName: 'Isabella Rossi',
      userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 5,
      comment: "Finally, a machine that gives me total control over micro-foam. The Barista Max is an absolute joy for any latte art enthusiast.",
    },
    {
      userId: currentUserId,
      productId: '6',
      userName: 'David Okoro',
      userPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
      rating: 5,
      comment: "The Dual Brew X is pure efficiency. Having a dedicated hot water function for my afternoon Americano is exactly what I needed.",
    },
  ];

  for (const review of sampleReviews) {
    await addReview(review);
  }
}
