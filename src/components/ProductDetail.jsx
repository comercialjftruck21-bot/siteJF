import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ChevronRight, MessageCircle, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductSpecifications from '@/components/ProductSpecifications';
import RelatedProducts from '@/components/RelatedProducts';
import { getProductById, getRelatedProducts } from '@/data/productData';
import { useWhatsAppLead } from '@/contexts/WhatsAppLeadContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const relatedProducts = getRelatedProducts(id);
  const { open } = useWhatsAppLead();

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Produto não encontrado</h2>
          <Link to="/#produtos">
            <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
              Voltar para Produtos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    open({ productMessage: product.whatsappMessage });
  };

  return (
    <>
      <Helmet>
        <title>{product.name} - JF Hydraulic</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen bg-[#0C0C0C] pt-20">
        {/* Header Navigation */}
        <nav className="bg-gray-900/50 border-b border-gray-800 sticky top-20 z-40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-300 hover:text-[#FFD700] transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Voltar</span>
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Link to="/" className="hover:text-[#FFD700] transition-colors flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Início</span>
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link to="/#produtos" className="hover:text-[#FFD700] transition-colors">
                  Produtos
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white truncate max-w-[150px] sm:max-w-none">{product.name}</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Product Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10"> {/* Adjusted margin-bottom */}
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductImageGallery images={product.images} productName={product.name} />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <span className="inline-block px-4 py-1.5 bg-[#FFD700]/20 border border-[#FFD700]/50 text-[#FFD700] text-sm font-bold rounded-full mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Removed the 'Consulte' price section */}
              
              <Button
                onClick={handleWhatsAppClick}
                className="w-full py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:from-[#128C7E] hover:to-[#25D366] transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3"
                size="lg"
              >
                <MessageCircle className="h-6 w-6" />
                Consultar Preço
              </Button>
            </motion.div>
          </div>

          {/* Full Description Section - Moved to span full width below the two-column grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 border border-gray-700/50 rounded-xl p-6 lg:p-8 mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Sobre este produto</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
              {product.fullDescription}
            </p>
          </motion.div>

          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <ProductSpecifications specifications={product.specifications} />
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <RelatedProducts products={relatedProducts} />
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;