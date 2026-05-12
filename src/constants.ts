/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Machines', href: '#products' },
  { label: 'Coffee', href: '#products' },
  { label: 'Collective', href: '#subscriptions' },
  { label: 'Recipes', href: '#innovation' },
  { label: 'Innovation', href: '#innovation' },
  { label: 'Reviews', href: '#reviews' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'BrewOne',
    category: 'Vertuo Systems',
    price: '$249.00',
    rating: 4.8,
    reviews: 1240,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczNzUPum885875RsCDbtSwgdHy4JTQ1uX9IxRQH9QNJOWFBzlAiwyvdkqCCYaTu-dvbqeDCjb6JIs_9FI2gH5dn3h253iJCG84_4Y_oBz52_PvVnOpckA82Hsda1xRH2CcVMQ8DkoAKZaVPBRuMhXSE=w1024-h1024-s-no-gm?authuser=4',
    description: 'The future of espresso. Intelligent extraction technology with one-touch precision.',
    colorOptions: [
      { name: 'Chrome', hex: '#E5E7EB' },
      { name: 'Matte Black', hex: '#111827' },
      { name: 'Titanium', hex: '#6B7280' },
    ],
    isNew: true,
  },
  {
    id: '2',
    name: 'Mini Brew Pro',
    category: 'Original Systems',
    price: '$189.00',
    rating: 4.9,
    reviews: 856,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOoWsYNO-0QrJh0OHjqZAhU3q5zZhX4suAG6u6WEbtAvmuxEpsPXHlOe-56I3wuqL1dnG41GroCpu9-586vSPiSM-qCbSMAI51xnIWYtQGvthq3ZXrRbfgd8RNlytFHYweF1A-ydHTd9HxIz0inEKk=w1024-h1024-s-no-gm?authuser=4',
    description: 'Compact design meets professional performance. Perfect for modern spaces.',
    colorOptions: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Space Gray', hex: '#4B5563' },
    ],
  },
  {
    id: '3',
    name: 'FoamPro 5',
    category: 'Accessories',
    price: '$79.00',
    rating: 4.7,
    reviews: 2103,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczMYw2neaXhEbF2fqCBqOlOnetHar_jIViRSxe67gvW6F8-86Ot49Vdevz9-YTn2x_dLwo00lZ7807mXIGCvTlqaNzr6zfGbjsOaFpSoI5Pm3PcoMF8scVEv97x62vkZZcEIao_v6fID8SuvpLut8wk=w1024-h1024-s-no-gm?authuser=4',
    description: 'The ultimate milk frother. Cold and hot foam at the touch of a button.',
    colorOptions: [
      { name: 'Black', hex: '#000000' },
    ],
  },
  {
    id: '4',
    name: 'Cafe Elite',
    category: 'Original Systems',
    price: '$329.00',
    rating: 4.6,
    reviews: 543,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczMkFdjEGS140UEztlSNzTHFJfnpqprAmID5RIoiLZA5YMAe6hCr7qUWh-EZ9EGX5opFfqzqTp7Awx-oFGUdLTwNZmXNYTFQT-xOI6Z7Ou4G2WR9rzNFmz-wcbGkl_DLDwGZHKXky1ClQJSIqDmGGbQ=w1024-h1024-s-no-gm?authuser=4',
    description: 'Elegant espresso and milk recipes made simple. Premium aesthetic for any kitchen.',
    colorOptions: [
      { name: 'Warm Cream', hex: '#F3F4F6' },
      { name: 'Rose Gold', hex: '#FB7185' },
    ],
  },
  {
    id: '5',
    name: 'Barista Max',
    category: 'Original Systems',
    price: '$399.00',
    rating: 5.0,
    reviews: 320,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczNSuBZ0VjRtkBoHpAyQBuj4zrGAq0G18aDbMPrKnFhFiXiCBlge70hOaR5EOw8D_YzEWCzcu3mnYlvI8fa5C_OI80ReYsZM4mvuZHWmyCT_qaT5o3jeZjZ8obFM2agT0cP0oJnD8Yj9S_yfsNpZFhQ=w1024-h1024-s-no-gm?authuser=4',
    description: 'The ultimate canvas for latte art. Fully automatic steam pipe for professional micro-foam.',
    colorOptions: [
      { name: 'Stainless Steel', hex: '#94a3b8' },
      { name: 'Black Stainless', hex: '#334155' },
    ],
  },
  {
    id: '6',
    name: 'Dual Brew X',
    category: 'Original Systems',
    price: '$279.00',
    rating: 4.8,
    reviews: 612,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczMSSjo2zaw6nnxSdkeUkAbyPQjmABZn7xfdaoT6Gn5WC2KmIdp-HjJFgOJ6TQ9tLh9facPofSMWfVndwN25KVEKHSGWzEIvlO_P7YbsEVhrt_6M_Hn152Kfx8EQvDOK1i5wylZzA5-hzL019VUOcaM=w1024-h1024-s-no-gm?authuser=4',
    description: 'Award-winning design with dedicated americano and hot water functions.',
    colorOptions: [
      { name: 'Brushed Brass', hex: '#a16207' },
      { name: 'Matte Silver', hex: '#cbd5e1' },
    ],
  },
];
