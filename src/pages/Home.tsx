/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import VideoShowcase from '../components/VideoShowcase';
import InnovationSection from '../components/InnovationSection';
import SubscriptionSection from '../components/SubscriptionSection';
import ReviewsSection from '../components/ReviewsSection';

export default function Home() {
  return (
    <>
      <Hero />
      <VideoShowcase />
      <ProductGrid />
      <InnovationSection />
      <SubscriptionSection />
      <ReviewsSection />
    </>
  );
}
