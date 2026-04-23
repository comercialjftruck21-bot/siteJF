import React from 'react';
import { motion } from 'framer-motion';
import {
  Wrench, Cog, Settings, Package, Boxes, Zap, ArrowRight,
  ShieldAlert, Gauge, Waves, Filter, Droplet, PlugZap, CircleDot,
} from 'lucide-react';
import { getUniqueCategories, getProductsByCategory } from '@/data/productData';

const categoryMeta = {
  'Kit Hidráulico': {
    icon: Boxes,
    tagline: 'Kits completos para basculamento',
    accent: 'from-[#FFD700]/25 to-[#FFA500]/0',
  },
  'Kit Segurança CONTRAN 859/2021': {
    icon: ShieldAlert,
    tagline: 'Conformidade CONTRAN 859/2021',
    accent: 'from-[#FFD700]/20 to-[#FFD700]/0',
  },
  'Bomba de Engrenagem': {
    icon: Cog,
    tagline: 'SAEB · EURO · de 25L a 109L',
    accent: 'from-[#FFD700]/20 to-[#FFD700]/0',
  },
  'Bomba de Pistão': {
    icon: Settings,
    tagline: 'Alta pressão e vazão variável',
    accent: 'from-[#FFA500]/20 to-[#FFA500]/0',
  },
  'Cilindros Hidráulicos': {
    icon: Gauge,
    tagline: 'Telescópicos, frontais e laterais',
    accent: 'from-[#FF8C00]/20 to-[#FF8C00]/0',
  },
  'Tomada de Força': {
    icon: Zap,
    tagline: 'PTO SAEB, ZF, Mercedes e EURO',
    accent: 'from-[#FFD700]/20 to-[#FFD700]/0',
  },
  'Válvula': {
    icon: CircleDot,
    tagline: 'Distribuidoras, direcionais e limitadoras',
    accent: 'from-[#FFD700]/15 to-[#FFD700]/0',
  },
  'Engate Hidráulico': {
    icon: PlugZap,
    tagline: 'Engates rápidos BSP e NPT',
    accent: 'from-[#FFA500]/15 to-[#FFA500]/0',
  },
  'Mangueira': {
    icon: Waves,
    tagline: 'SAE 100 R1/R2 · alta pressão',
    accent: 'from-[#FFD700]/15 to-[#FFD700]/0',
  },
  'Filtros': {
    icon: Filter,
    tagline: 'Filtragem e cuidado do óleo',
    accent: 'from-[#FF8C00]/15 to-[#FF8C00]/0',
  },
  'Reservatório': {
    icon: Droplet,
    tagline: 'Reservatórios em aço inox',
    accent: 'from-[#FFD700]/15 to-[#FFD700]/0',
  },
  'Reparos e Vedações': {
    icon: Wrench,
    tagline: 'Kits de vedação e reparo',
    accent: 'from-[#FFA500]/15 to-[#FFA500]/0',
  },
  'Acessórios': {
    icon: Package,
    tagline: 'Controles, inclinômetros e mais',
    accent: 'from-[#FFD700]/15 to-[#FFD700]/0',
  },
};

const scrollToProducts = (category) => {
  const el = document.getElementById('produtos');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('jf:selectCategory', { detail: category }));
    }, 400);
  }
};

const CategoryShowcase = () => {
  const categories = getUniqueCategories();

  return (
    <section className="relative bg-[#0C0C0C] py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-[#FFD700] mb-3">
              Navegue pela loja
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-2xl">
              Categorias de <span className="text-gradient-gold">equipamentos hidráulicos</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-base sm:text-lg">
            Clique em qualquer categoria para filtrar o catálogo.
            Cada linha é montada com componentes compatíveis entre si.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((category, idx) => {
            const meta = categoryMeta[category] || { icon: Package, tagline: '', accent: 'from-[#FFD700]/15 to-[#FFD700]/0' };
            const Icon = meta.icon;
            const count = getProductsByCategory(category).length;

            return (
              <motion.button
                key={category}
                onClick={() => scrollToProducts(category)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group relative text-left rounded-3xl overflow-hidden border border-gray-800/80 bg-gradient-to-br from-gray-900 to-[#0C0C0C] p-5 sm:p-7 hover:border-[#FFD700]/40 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${meta.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="relative flex flex-col h-full min-h-[170px]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center group-hover:bg-[#FFD700] group-hover:border-[#FFD700] transition-all duration-300">
                      <Icon className="w-6 h-6 text-[#FFD700] group-hover:text-black transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 bg-black/40 border border-gray-800 px-3 py-1 rounded-full">
                      {count} {count === 1 ? 'item' : 'itens'}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight group-hover:text-[#FFD700] transition-colors">
                    {category}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1.5 hidden sm:block">
                    {meta.tagline}
                  </p>

                  <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-semibold text-[#FFD700] group-hover:gap-3 transition-all">
                    Ver produtos
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
