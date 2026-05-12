/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  colorOptions: { name: string; hex: string }[];
  isNew?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}
