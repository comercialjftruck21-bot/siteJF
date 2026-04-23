import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal, PackageOpen } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { productsData, getUniqueCategories } from '@/data/productData';

const Products = () => {
  const categories = useMemo(() => getUniqueCategories(), []);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Pré-seleção via URL (?category=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) setSelectedCategory(cat);
  }, []);

  // Comunicação com CategoryShowcase
  useEffect(() => {
    const handler = (e) => {
      if (e.detail) setSelectedCategory(e.detail);
    };
    window.addEventListener('jf:selectCategory', handler);
    return () => window.removeEventListener('jf:selectCategory', handler);
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return productsData.filter((p) => {
      const matchCat = selectedCategory === 'Todos' || p.category === selectedCategory;
      const matchQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('Todos');
    setSearchQuery('');
  };

  return (
    <section id="produtos" className="relative bg-[#0C0C0C] py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-[#FFD700] mb-3">
              Catálogo completo
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Encontre o <span className="text-gradient-gold">equipamento ideal</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mt-3 max-w-2xl">
              {productsData.length} produtos hidráulicos em linha — filtre por categoria ou busque pelo nome.
            </p>
          </div>

          {/* Busca */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar produto..."
              className="w-full h-12 pl-11 pr-10 rounded-2xl bg-gray-900/80 border border-gray-800 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#FFD700]/60 focus:ring-2 focus:ring-[#FFD700]/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                aria-label="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Filtros por categoria (chips scrolláveis) */}
        <div className="mb-8 -mx-4 sm:mx-0">
          <div className="flex items-center gap-2 px-4 sm:px-0 overflow-x-auto hide-scrollbar pb-2">
            <CategoryChip
              label="Todos"
              count={productsData.length}
              active={selectedCategory === 'Todos'}
              onClick={() => setSelectedCategory('Todos')}
            />
            {categories.map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                count={productsData.filter((p) => p.category === cat).length}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              />
            ))}
          </div>
        </div>

        {/* Contador + filtros ativos */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <p className="text-gray-400">
            <span className="font-bold text-white">{filteredProducts.length}</span>{' '}
            {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            {selectedCategory !== 'Todos' && (
              <span className="text-gray-500"> em <span className="text-[#FFD700]">{selectedCategory}</span></span>
            )}
          </p>
          {(selectedCategory !== 'Todos' || searchQuery) && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#FFD700] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Limpar filtros
            </button>
          )}
        </div>

        {/* Grid de produtos */}
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mb-4">
                <PackageOpen className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Tente ajustar os filtros ou buscar por outro termo.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 rounded-xl bg-[#FFD700] text-black font-semibold text-sm hover:bg-white transition-colors"
              >
                Ver todos os produtos
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const CategoryChip = ({ label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={[
      'flex-shrink-0 inline-flex items-center gap-2 px-4 h-10 rounded-full border text-sm font-semibold whitespace-nowrap transition-all duration-200',
      active
        ? 'bg-[#FFD700] border-[#FFD700] text-black shadow-[0_8px_24px_-8px_rgba(255,215,0,0.6)]'
        : 'bg-gray-900/60 border-gray-800 text-gray-300 hover:border-[#FFD700]/40 hover:text-white',
    ].join(' ')}
  >
    {label}
    <span
      className={[
        'inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded-full text-[10px] font-bold',
        active ? 'bg-black/20 text-black' : 'bg-gray-800 text-gray-400',
      ].join(' ')}
    >
      {count}
    </span>
  </button>
);

export default Products;
