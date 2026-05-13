/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAVCHUL6NIfKSOiqhYueo7TzcpTeggb_0c",
  authDomain: "futurecafe2-6b501.firebaseapp.com",
  projectId: "futurecafe2-6b501",
  storageBucket: "futurecafe2-6b501.firebasestorage.app",
  messagingSenderId: "890212866826",
  appId: "1:890212866826:web:24325b02700df9bb4e78f3",
  measurementId: "G-D60GS6N4EB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Connectivity check as per instructions
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();
