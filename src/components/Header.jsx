import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, Info, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { getUniqueCategories, getProductsByCategory } from '@/data/productData';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setCategories(getUniqueCategories());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // If we are not on the homepage, the header is always visible
      if (location.pathname !== '/') {
        setIsVisible(true);
        return;
      }

      // On homepage, only show after scrolling
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check on mount or route change
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 shadow-xl"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                  <img 
                    src="https://horizons-cdn.hostinger.com/fe95bbe4-a519-4cdc-bb0a-86d505a66f43/5a33214db2cf96b9aac9700d4272b0cd.webp" 
                    alt="JF Hydraulic Logo" 
                    className="h-10 w-auto object-contain hover:opacity-90 transition-opacity"
                  />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                  {/* Products Dropdown */}
                  <div 
                    className="relative group"
                    onMouseEnter={() => setHoveredCategory(true)}
                    onMouseLeave={() => setHoveredCategory(false)}
                  >
                    <button className="flex items-center text-gray-300 hover:text-[#FFD700] transition-colors focus:outline-none font-medium text-sm py-2">
                      <Box className="w-4 h-4 mr-2" />
                      Produtos
                      <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                    </button>
                    
                    {/* Mega Menu Dropdown */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-[min(1100px,calc(100vw-2rem))] bg-gray-900 border border-gray-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top p-4 grid grid-cols-4 gap-4">
                      {categories.map((category) => (
                        <div key={category} className="space-y-2">
                          <Link 
                            to={`/?category=${category}`}
                            className="block font-bold text-[#FFD700] hover:text-white mb-2 pb-1 border-b border-gray-800"
                          >
                            {category}
                          </Link>
                          <ul className="space-y-1">
                            {getProductsByCategory(category).slice(0, 4).map(product => (
                              <li key={product.id}>
                                <Link 
                                  to={`/produto/${product.id}`}
                                  className="text-sm text-gray-400 hover:text-white block py-1 truncate"
                                >
                                  {product.name}
                                </Link>
                              </li>
                            ))}
                            {getProductsByCategory(category).length > 4 && (
                              <li>
                                <Link 
                                  to={`/?category=${category}`}
                                  className="text-xs text-gray-500 hover:text-[#FFD700] block py-1 italic"
                                >
                                  Ver todos...
                                </Link>
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                      <div className="col-span-4 mt-2 pt-2 border-t border-gray-800 text-center">
                        <Link 
                          to="/" 
                          className="text-sm font-bold text-white hover:text-[#FFD700]"
                        >
                          Ver catálogo completo
                        </Link>
                      </div>
                    </div>
                  </div>

                  <Link to="/quem-somos" className="flex items-center text-gray-300 hover:text-[#FFD700] transition-colors font-medium text-sm">
                    <Info className="w-4 h-4 mr-2" />
                    Quem Somos
                  </Link>

                  <Link to="/fale-conosco">
                     <Button 
                      variant="outline" 
                      className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black bg-transparent transition-all duration-300"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Fale Conosco
                    </Button>
                  </Link>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-300 hover:text-white p-2"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden bg-gray-900 border-b border-gray-800 overflow-hidden"
                >
                  <div className="px-4 pt-2 pb-6 space-y-4 max-h-[80vh] overflow-y-auto">
                    <div className="space-y-2">
                      <p className="text-[#FFD700] text-sm font-semibold uppercase tracking-wider pl-2 sticky top-0 bg-gray-900 py-2">Produtos</p>
                      {categories.map((category) => (
                        <div key={category} className="pl-2">
                           <Link
                            to={`/?category=${category}`}
                            className="block px-3 py-2 rounded-md text-base font-bold text-white hover:bg-gray-800"
                          >
                            {category}
                          </Link>
                          <div className="pl-4 border-l border-gray-800 ml-3 my-1">
                            {getProductsByCategory(category).map(product => (
                              <Link
                                key={product.id}
                                to={`/produto/${product.id}`}
                                className="block px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md"
                              >
                                {product.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-800 pt-4">
                       <Link
                        to="/quem-somos"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                      >
                        Quem Somos
                      </Link>
                       <Link
                        to="/fale-conosco"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                      >
                        Fale Conosco
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;