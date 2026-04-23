import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { useWhatsAppLead } from '@/contexts/WhatsAppLeadContext';

const Contact = () => {
  const { open } = useWhatsAppLead();
  const handleWhatsApp = () => {
    open({ productMessage: 'Olá, vim pelo site da JF Hydraulic e gostaria de solicitar um orçamento.' });
  };

  const contactItems = [
    { icon: Phone, label: 'Telefone', value: '(19) 3308-2554', action: 'tel:+551933082554' },
    { icon: MessageCircle, label: 'WhatsApp', value: '(19) 97419-4374', onClick: handleWhatsApp },
    { icon: Mail, label: 'E-mail Financeiro', value: 'financeiro@jftruck.com.br', action: 'mailto:financeiro@jftruck.com.br' },
    { icon: MapPin, label: 'Endereço', value: 'R. Sebastião Polo, 210 · Jardim Aparecida · Campinas — SP · 13067-844' },
    { icon: Clock, label: 'Horário', value: 'Segunda a Sexta — 8h às 18h' },
  ];

  return (
    <section className="relative bg-[#0C0C0C] py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-[#FFD700] mb-3">
            Fale com a gente
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Pronto para equipar seu <span className="text-gradient-gold">caminhão?</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Fale com um consultor técnico e receba um orçamento sob medida.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Lista de contatos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {contactItems.map((item, idx) => {
              const content = (
                <div className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-[#0f0f10] border border-gray-800 hover:border-[#FFD700]/40 transition-all duration-300 h-full">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-[#FFD700]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                      {item.label}
                    </p>
                    <p className="text-white font-medium break-words">{item.value}</p>
                  </div>
                </div>
              );
              if (item.onClick) {
                return (
                  <button key={idx} type="button" onClick={item.onClick} className="block w-full text-left">
                    {content}
                  </button>
                );
              }
              return item.action ? (
                <a key={idx} href={item.action} target={item.action.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block">
                  {content}
                </a>
              ) : (
                <div key={idx}>{content}</div>
              );
            })}
          </motion.div>

          {/* Card de CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden border border-[#FFD700]/20 bg-gradient-to-br from-gray-900 via-black to-[#0C0C0C] p-8 sm:p-10 flex flex-col"
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#FFD700]/10 rounded-full blur-3xl"></div>

            <div className="relative flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 mb-5">
                <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse"></span>
                <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wider">Online agora</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
                Precisa de um orçamento?
              </h3>
              <p className="text-gray-300 leading-relaxed mb-7 sm:mb-8">
                Fale conosco agora pelo WhatsApp. Nossa equipe técnica vai ajudar você a escolher o kit hidráulico ideal para seu veículo.
              </p>

              <Button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto px-8 py-6 text-lg font-bold rounded-2xl bg-[#25D366] text-white hover:bg-[#1fa855] transition-all duration-300 shadow-[0_10px_30px_-5px_rgba(37,211,102,0.5)] hover:shadow-[0_15px_40px_-5px_rgba(37,211,102,0.7)] group"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Falar no WhatsApp
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-xs text-gray-500 mt-4">
                Resposta média: até 30 minutos em horário comercial.
              </p>
            </div>

            <div className="relative mt-8">
              <div className="rounded-2xl overflow-hidden border border-gray-800">
                <img
                  alt="Atendimento JF Hydraulic"
                  className="w-full h-48 sm:h-56 object-cover"
                  src="https://images.unsplash.com/photo-1678790118729-631da1a112ef"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
