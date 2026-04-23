import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Clock, ShieldCheck, Award, MessageCircle, ArrowRight, Star } from 'lucide-react';
import { useWhatsAppLead } from '@/contexts/WhatsAppLeadContext';

const Hero = () => {
  const { open } = useWhatsAppLead();
  const handleWhatsApp = () => {
    open({ productMessage: 'Olá, vim pelo site da JF Hydraulic e gostaria de solicitar um orçamento.' });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('produtos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 md:py-0">
      {/* Logo superior */}
      <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-30 flex items-center">
        <img
          src="https://horizons-cdn.hostinger.com/fe95bbe4-a519-4cdc-bb0a-86d505a66f43/302c9546999ba72b9cb49378ed020846.png"
          alt="JF Hydraulic Logo"
          className="h-14 sm:h-16 w-auto drop-shadow-[0_4px_20px_rgba(255,215,0,0.3)]"
        />
      </div>

      {/* Background */}
      <div className="absolute inset-0">
        <img
          alt="Caminhão basculante com sistema hidráulico em operação"
          className="w-full h-full object-cover scale-105"
          src="https://horizons-cdn.hostinger.com/fe95bbe4-a519-4cdc-bb0a-86d505a66f43/caminhao-basculante-fA68R.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-grid opacity-40"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-28 md:pt-24 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          {/* Selo de confiança */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 backdrop-blur-sm mb-6">
            <Award className="w-4 h-4 text-[#FFD700]" />
            <span className="text-xs sm:text-sm font-semibold text-[#FFD700] tracking-wider uppercase">
              +20 anos de mercado · Certificação CONTRAN
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
            Potência Hidráulica
            <br />
            <span className="text-gradient-gold">para o seu caminhão.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed">
            Bombas, tomadas de força, cilindros e kits completos.
            Equipamentos que entregam <span className="text-white font-semibold">segurança, durabilidade</span> e <span className="text-white font-semibold">alta performance</span> na estrada.
          </p>

          {/* Avaliação social */}
          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
              ))}
            </div>
            <span className="text-sm text-gray-400">
              <span className="text-white font-semibold">4.9/5</span> · avaliação de clientes
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Button
              onClick={handleWhatsApp}
              className="py-6 px-7 text-base sm:text-lg font-bold rounded-2xl bg-[#FFD700] text-black hover:bg-white transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(255,215,0,0.6)] hover:shadow-[0_15px_50px_-10px_rgba(255,215,0,0.8)] hover:scale-[1.02] group"
              size="lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Solicitar orçamento
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={scrollToCatalog}
              className="py-6 px-7 text-base sm:text-lg font-semibold rounded-2xl bg-white/5 backdrop-blur-md text-white border border-white/20 hover:bg-white/10 hover:border-[#FFD700]/50 transition-all duration-300"
              size="lg"
            >
              Ver catálogo
            </Button>
          </div>

          {/* Info rápida */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
            <div className="flex items-center gap-3 text-gray-200">
              <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
                <Phone className="h-5 w-5 text-[#FFD700]" />
              </div>
              <div className="text-sm leading-tight">
                <p className="text-gray-400">Telefone</p>
                <p className="font-semibold text-white">(19) 3308-2554</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-[#FFD700]" />
              </div>
              <div className="text-sm leading-tight">
                <p className="text-gray-400">Atendimento</p>
                <p className="font-semibold text-white">Seg–Sex · 8h às 18h</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-[#FFD700]" />
              </div>
              <div className="text-sm leading-tight">
                <p className="text-gray-400">Loja física</p>
                <p className="font-semibold text-white">Campinas · SP</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card flutuante com destaques */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 hidden lg:flex flex-col gap-4"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl p-6 glow-gold">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-6 h-6 text-[#FFD700]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700]">Produto em destaque</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white leading-tight">
              Kit Hidráulico Giro 360°
            </h3>
            <p className="text-sm text-gray-300 mt-2">
              Tecnologia patenteada INPI · Certificação CONTRAN 589/2021
            </p>
            <Link
              to="/produto/kit-hidraulico-binotto-carbono-piso1"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#FFD700] hover:text-white transition-colors group"
            >
              Ver especificações
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
              <p className="text-3xl font-extrabold text-[#FFD700]">+20</p>
              <p className="text-xs text-gray-300 mt-1">Anos no mercado</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
              <p className="text-3xl font-extrabold text-[#FFD700]">45+</p>
              <p className="text-xs text-gray-300 mt-1">Produtos em linha</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
              <p className="text-3xl font-extrabold text-[#FFD700]">12x</p>
              <p className="text-xs text-gray-300 mt-1">Parcelamento</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
              <p className="text-3xl font-extrabold text-[#FFD700]">24h</p>
              <p className="text-xs text-gray-300 mt-1">Resposta WhatsApp</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-gray-400">
        <span className="text-[10px] uppercase tracking-[0.3em]">Role para ver o catálogo</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#FFD700] to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
