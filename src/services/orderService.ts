/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderData {
  userId: string;
  customerEmail: string;
  customerName: string;
  shippingAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export async function createOrder(order: OrderData) {
  const ordersRef = collection(db, 'orders');
  return addDoc(ordersRef, {
    ...order,
    createdAt: serverTimestamp(),
  });
}
