/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

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
  const path = 'orders';
  const ordersRef = collection(db, path);
  try {
    return await addDoc(ordersRef, {
      ...order,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
