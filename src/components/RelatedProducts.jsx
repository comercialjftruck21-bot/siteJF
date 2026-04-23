import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

const RelatedProducts = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Produtos <span className="text-[#FFD700]">Relacionados</span>
        </h2>
        <p className="text-gray-400">
          Outros produtos que podem te interessar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/#produtos">
          <Button
            className="py-3 px-8 text-base font-semibold rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFC700] text-black hover:from-[#FFC700] hover:to-[#FFD700] transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
          >
            Ver Mais Produtos
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default RelatedProducts;