import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, Headphones, MapPin, Truck, Award } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Homologação',
    description: 'Produtos com certificação CONTRAN 589/2021 e patente INPI.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantia',
    description: 'Até 12 meses de garantia de fábrica nos kits hidráulicos.',
  },
  {
    icon: CreditCard,
    title: 'Parcelamento',
    description: 'Compre em até 12x no cartão com total segurança.',
  },
  {
    icon: Truck,
    title: 'Envio rápido',
    description: 'Enviamos para todo o Brasil pelas principais transportadoras.',
  },
  {
    icon: Headphones,
    title: 'Suporte técnico',
    description: 'Equipe especializada atendendo por WhatsApp, telefone e e-mail.',
  },
  {
    icon: MapPin,
    title: 'Loja física',
    description: 'Visite nossa oficina em Campinas — SP para conhecer os produtos.',
  },
];

const Features = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#0C0C0C] to-gray-950 py-20 sm:py-28 border-y border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-[#FFD700] mb-3">
            Benefícios exclusivos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Por que escolher a <span className="text-gradient-gold">JF Hydraulic</span>?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-4">
            Qualidade de fábrica, preço justo e atendimento que faz a diferença.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="group relative p-7 rounded-3xl bg-gradient-to-br from-gray-900 to-[#0f0f10] border border-gray-800 hover:border-[#FFD700]/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center mb-5 group-hover:bg-[#FFD700] group-hover:border-[#FFD700] transition-all duration-300">
                <feature.icon className="h-7 w-7 text-[#FFD700] group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
