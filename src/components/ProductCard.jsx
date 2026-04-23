import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWhatsAppLead } from '@/contexts/WhatsAppLeadContext';

const ProductCard = ({ product, index = 0 }) => {
  const { open } = useWhatsAppLead();
  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const message = product.whatsappMessage || `Olá, tenho interesse no produto ${product.name}.`;
    open({ productMessage: message });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.35) }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col h-full bg-gradient-to-br from-gray-900 to-[#0f0f10] border border-gray-800 rounded-3xl overflow-hidden hover:border-[#FFD700]/50 transition-all duration-300 hover:shadow-[0_20px_60px_-20px_rgba(255,215,0,0.25)]"
    >
      {/* Imagem */}
      <Link
        to={`/produto/${product.id}`}
        className="relative block h-56 sm:h-60 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900"
      >
        <img
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={product.images[0]}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>

        {/* Badge categoria */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] sm:text-xs font-bold rounded-full tracking-wide uppercase">
            {product.category}
          </span>
        </div>

        {/* Selo garantia / certificação quando aplicável */}
        {product.specifications?.some(s => /garantia|certifica|patente/i.test(s.label)) && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFD700] text-black text-[10px] font-bold rounded-full shadow-lg">
              <ShieldCheck className="w-3 h-3" />
              Certificado
            </span>
          </div>
        )}

        {/* Ícone hover "abrir" */}
        <div className="absolute bottom-3 right-3 z-10 w-10 h-10 rounded-full bg-[#FFD700] text-black flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </Link>

      {/* Conteúdo */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <Link to={`/produto/${product.id}`} className="block">
          <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2 line-clamp-2 leading-tight group-hover:text-[#FFD700] transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-grow">
          {product.description}
        </p>

        {/* Especificação destacada */}
        {product.specifications?.[0] && (
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 border-t border-gray-800 pt-4">
            <span className="font-semibold text-gray-300 uppercase tracking-wider text-[10px]">
              {product.specifications[0].label}:
            </span>
            <span className="text-[#FFD700] font-semibold truncate">
              {product.specifications[0].value}
            </span>
          </div>
        )}

        {/* Rodapé preço + CTAs */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500">Valor</p>
            <p className="text-lg font-extrabold text-white">
              {product.price === 'Consulte' || !product.price ? (
                <span className="text-[#FFD700]">Sob consulta</span>
              ) : (
                product.price
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/produto/${product.id}`} tabIndex="-1">
              <Button
                variant="outline"
                className="h-10 px-3 sm:px-4 bg-transparent border-gray-700 text-white hover:bg-white hover:text-black hover:border-white rounded-xl text-xs font-semibold transition-all"
              >
                Detalhes
              </Button>
            </Link>
            <Button
              onClick={handleWhatsAppClick}
              className="h-10 px-3 sm:px-4 bg-[#25D366] text-white hover:bg-[#1fa855] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Cotar</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
