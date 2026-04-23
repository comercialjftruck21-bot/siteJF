import React from 'react';
import { Truck, ShieldCheck, CreditCard, Headphones, Award } from 'lucide-react';

const items = [
  {
    icon: Award,
    title: 'Certificação CONTRAN',
    description: 'Produtos em conformidade 589/2021',
  },
  {
    icon: ShieldCheck,
    title: 'Garantia de fábrica',
    description: 'Até 12 meses nos kits hidráulicos',
  },
  {
    icon: CreditCard,
    title: 'Parcele em até 12x',
    description: 'No cartão, com total segurança',
  },
  {
    icon: Truck,
    title: 'Envio para todo Brasil',
    description: 'Logística direta do fabricante',
  },
  {
    icon: Headphones,
    title: 'Suporte especializado',
    description: 'Técnicos por WhatsApp e telefone',
  },
];

const TrustStrip = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#0C0C0C] via-gray-950 to-[#0C0C0C] border-y border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center group-hover:bg-[#FFD700] group-hover:border-[#FFD700] transition-all duration-300">
                  <Icon className="w-5 h-5 text-[#FFD700] group-hover:text-black transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white leading-tight">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-tight">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
