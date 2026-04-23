import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowUpRight, Instagram, Facebook } from 'lucide-react';
import { getUniqueCategories } from '@/data/productData';
import { useWhatsAppLead } from '@/contexts/WhatsAppLeadContext';

const Footer = () => {
  const categories = getUniqueCategories();
  const { open } = useWhatsAppLead();

  const openWhatsApp = () => {
    open({ productMessage: 'Olá, vim pelo site da JF Hydraulic e gostaria de solicitar um orçamento.' });
  };

  const scrollToCategory = (cat) => {
    if (window.location.pathname !== '/') {
      window.location.href = `/?category=${encodeURIComponent(cat)}`;
      return;
    }
    const el = document.getElementById('produtos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('jf:selectCategory', { detail: cat }));
    }, 400);
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0C0C0C] to-black border-t border-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-3">
            <img
              src="https://horizons-cdn.hostinger.com/fe95bbe4-a519-4cdc-bb0a-86d505a66f43/302c9546999ba72b9cb49378ed020846.png"
              alt="JF Hydraulic Logo"
              className="h-14 w-auto mb-5"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Mais de 20 anos de experiência em equipamentos hidráulicos para caminhões basculantes.
              Qualidade, segurança e performance em cada produto.
            </p>

            <button
              onClick={openWhatsApp}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white text-sm font-bold hover:bg-[#1fa855] transition-colors group"
            >
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={openWhatsApp}
                className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#FFD700] hover:border-[#FFD700]/40 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#FFD700] hover:border-[#FFD700]/40 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#FFD700] hover:border-[#FFD700]/40 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categorias */}
          <div className="lg:col-span-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Categorias</h4>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => scrollToCategory(cat)}
                    className="text-gray-400 text-sm hover:text-[#FFD700] transition-colors text-left leading-snug"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links rápidos */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Empresa</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 text-sm hover:text-[#FFD700] transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/quem-somos" className="text-gray-400 text-sm hover:text-[#FFD700] transition-colors">
                  Quem somos
                </Link>
              </li>
              <li>
                <Link to="/fale-conosco" className="text-gray-400 text-sm hover:text-[#FFD700] transition-colors">
                  Fale conosco
                </Link>
              </li>
              <li>
                <Link to="/#produtos" className="text-gray-400 text-sm hover:text-[#FFD700] transition-colors">
                  Catálogo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Contato</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="h-4 w-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
                <a href="tel:+551933082554" className="hover:text-white transition-colors">(19) 3308-2554</a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MessageCircle className="h-4 w-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
                <button type="button" onClick={openWhatsApp} className="hover:text-white transition-colors text-left">(19) 97419-4374</button>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="h-4 w-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
                <a href="mailto:financeiro@jftruck.com.br" className="hover:text-white transition-colors break-all">financeiro@jftruck.com.br</a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="h-4 w-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
                <span>R. Sebastião Polo, 210 · Jardim Aparecida · Campinas — SP</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Clock className="h-4 w-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
                <span>Seg — Sex · 8h às 18h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} JF Hydraulic. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 text-xs">
            Desenvolvido com dedicação para caminhoneiros brasileiros.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
