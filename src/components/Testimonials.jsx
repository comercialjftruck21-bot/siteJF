import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Caminhoneiro autônomo',
    role: 'Cliente · Transporte de cargas',
    text: 'Comprei o kit completo e a equipe me orientou em toda a instalação. Caçamba subindo firme, sem vazamento.',
    rating: 5,
  },
  {
    name: 'Frota de agronegócio',
    role: 'Cliente corporativo · Interior de SP',
    text: 'Padronizamos as bombas SAEB na nossa frota. Durabilidade excelente e atendimento técnico muito rápido pelo WhatsApp.',
    rating: 5,
  },
  {
    name: 'Transportadora regional',
    role: 'Cliente · Basculantes 6m³',
    text: 'Relação custo-benefício muito boa. O suporte pós-venda da JF Hydraulic é o diferencial — resolvem tudo na hora.',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#0C0C0C] via-gray-950 to-[#0C0C0C] py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-[#FFD700] mb-3">
            Quem já comprou, aprova
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Confiança de quem vive <span className="text-gradient-gold">o asfalto todos os dias</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl bg-gradient-to-br from-gray-900 to-[#0f0f10] border border-gray-800 p-7 hover:border-[#FFD700]/40 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#FFD700]/15" strokeWidth={1.5} />

              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                ))}
              </div>

              <p className="text-gray-200 leading-relaxed text-base">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="mt-6 pt-5 border-t border-gray-800">
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
