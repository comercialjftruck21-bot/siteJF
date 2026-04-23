import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWhatsAppLead } from '@/contexts/WhatsAppLeadContext';

const FloatingWhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { open } = useWhatsAppLead();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const utmTerm = searchParams.get('utm_term');
    let productMessage = 'Olá gostaria de solicitar um orçamento.';
    if (utmTerm) productMessage = `Olá, gostaria de saber mais sobre ${utmTerm}.`;
    open({ productMessage });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-transparent border-none outline-none focus:outline-none cursor-pointer group"
          aria-label="Falar no WhatsApp"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-20 animate-ping group-hover:opacity-40 duration-1000"></span>

          <div className="relative rounded-full bg-white/10 backdrop-blur-sm p-0 shadow-xl overflow-hidden">
            <img
              src="https://horizons-cdn.hostinger.com/fe95bbe4-a519-4cdc-bb0a-86d505a66f43/1f67f349f7fa1fde5a213793855ae274.png"
              alt="WhatsApp"
              className="w-14 h-14 md:w-16 md:h-16 object-cover drop-shadow-md"
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsAppButton;
