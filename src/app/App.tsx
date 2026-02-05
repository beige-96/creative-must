import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Hero } from '@/app/components/Hero';
import { USP } from '@/app/components/USP';
import { Portfolio } from '@/app/components/Portfolio';
import { CTA } from '@/app/components/CTA';
import { Footer } from '@/app/components/Footer';
import { PromotionPopup } from '@/app/components/PromotionPopup';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <div className="relative font-sans text-white bg-black selection:bg-[#FF7C2B] selection:text-white">
      <Toaster position="top-center" theme="dark" />
      <PromotionPopup />
      <Navbar />
      <Hero />
      <USP />
      <Portfolio />
      <CTA />
      <Footer />
    </div>
  );
}
