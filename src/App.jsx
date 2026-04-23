import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import About from '@/components/About';
import Features from '@/components/Features';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ProductDetail from '@/components/ProductDetail';
import AboutPage from '@/components/AboutPage';
import ContactPage from '@/components/ContactPage';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import TrustStrip from '@/components/TrustStrip';
import CategoryShowcase from '@/components/CategoryShowcase';
import Testimonials from '@/components/Testimonials';
import CtaBanner from '@/components/CtaBanner';
import { Toaster } from '@/components/ui/toaster';
import { WhatsAppLeadProvider } from '@/contexts/WhatsAppLeadContext';
import { captureUTMs } from '@/utils/whatsappUtils';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomePage() {
  return (
    <>
      <Helmet>
        <title>JF Hydraulic - Equipamentos Hidráulicos para Caminhões</title>
        <meta name="description" content="JF Hydraulic - Mais de 20 anos de experiência em kits hidráulicos para caçambas e equipamentos. Bombas hidráulicas, tomadas de força e muito mais!" />
      </Helmet>
      <Hero />
      <TrustStrip />
      <CategoryShowcase />
      <Products />
      <Features />
      <About />
      <Testimonials />
      <CtaBanner />
      <Contact />
    </>
  );
}

function App() {
  useEffect(() => {
    captureUTMs();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap" rel="stylesheet" />
      </Helmet>

      <WhatsAppLeadProvider>
        <div className="min-h-screen bg-[#0C0C0C] overflow-hidden flex flex-col">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/produto/:id" element={<ProductDetail />} />
              <Route path="/quem-somos" element={<AboutPage />} />
              <Route path="/fale-conosco" element={<ContactPage />} />
            </Routes>
          </div>
          <Footer />
          <Toaster />
          <FloatingWhatsAppButton />
        </div>
      </WhatsAppLeadProvider>
    </Router>
  );
}

export default App;