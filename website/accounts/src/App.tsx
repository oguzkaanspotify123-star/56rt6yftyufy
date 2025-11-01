import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedAccounts from './components/FeaturedAccounts';
import Marketplace from './components/Marketplace';
import WhyChooseUs from './components/WhyChooseUs';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedAccounts />
      <Marketplace />
      <WhyChooseUs />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
