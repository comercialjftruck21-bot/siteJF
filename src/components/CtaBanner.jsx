import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowRight, Zap } from 'lucide-react';
import { useWhatsAppLead } from '@/contexts/WhatsAppLeadContext';

const CtaBanner = () => {
  const { open } = useWhatsAppLead();
  const handleWhatsApp = () => {
    open({ productMessage: 'Olá, vim pelo site da JF Hydraulic e gostaria de solicitar um orçamento.' });
  };

  return (
    <section className="relative bg-[#0C0C0C] py-16 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFD700] via-[#FFC200] to-[#FFA500] p-8 sm:p-14 lg:p-16"
        >
          {/* Grid decorativo */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          ></div>

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/15 border border-black/30 mb-4">
                <Zap className="w-3.5 h-3.5 text-black" />
                <span className="text-xs font-bold text-black uppercase tracking-wider">
                  Atendimento imediato
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black leading-[1.05] tracking-tight">
                Equipe seu caminhão com quem entende.
              </h2>
              <p className="mt-4 text-black/80 text-base sm:text-lg max-w-xl leading-relaxed">
                Consultoria técnica gratuita pelo WhatsApp para escolher o kit hidráulico certo para seu veículo e sua operação.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
              <Button
                onClick={handleWhatsApp}
                className="h-14 px-7 rounded-2xl bg-black text-[#FFD700] hover:bg-gray-900 font-bold text-base group whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Falar no WhatsApp
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a
                href="tel:+551933082554"
                className="h-14 px-7 rounded-2xl bg-black/10 border border-black/30 text-black hover:bg-black/20 font-bold text-base inline-flex items-center justify-center whitespace-nowrap transition-colors"
              >
                (19) 3308-2554
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaBanner;
