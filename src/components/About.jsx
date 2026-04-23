import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, Truck, ArrowRight } from 'lucide-react';

const aboutSlides = [
  { src: '/about/fachada-jf-hydraulic.png', alt: 'Fachada da JF Hydraulic em Campinas - vista aérea do galpão e pátio com caminhões basculantes' },
  { src: '/about/cilindros-binotto.jpg', alt: 'Cilindros hidráulicos Binotto em estoque na JF Hydraulic' },
  { src: '/about/galpao-interno.jpg', alt: 'Interior do galpão da JF Hydraulic com caminhão e vitrine JFTRUCK' },
];

const pillars = [
  { icon: Shield, title: 'Segurança', desc: 'Componentes testados e certificados' },
  { icon: Award, title: 'Qualidade', desc: 'Produtos premium e homologados' },
  { icon: Users, title: 'Atendimento', desc: 'Consultoria técnica personalizada' },
  { icon: Truck, title: 'Experiência', desc: 'Mais de 20 anos de estrada' },
];

const About = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % aboutSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-[#0C0C0C] py-20 sm:py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-[#FFD700] mb-3">
              Sobre a empresa
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Tradição e tecnologia a serviço do <span className="text-gradient-gold">caminhoneiro brasileiro</span>
            </h2>
            <p className="text-lg text-gray-300 mb-5 leading-relaxed">
              Com mais de 20 anos de experiência no mercado, a JF Hydraulic é especializada na venda de kits hidráulicos para caçambas e equipamentos relacionados, com o objetivo de facilitar a vida dos caminhoneiros e garantir a segurança de seus veículos.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Nossa missão é valorizar a potência das estradas brasileiras, oferecendo produtos de qualidade, como bombas hidráulicas e tomadas de força, com um atendimento personalizado.
            </p>

            <div className="grid grid-cols-2 gap-5 mb-8">
              {pillars.map((p, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
                    <p.icon className="h-5 w-5 text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/quem-somos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-all duration-300 group"
            >
              Conheça a nossa história
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
              <div className="relative w-full h-[480px] bg-gray-900">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={slideIndex}
                    alt={aboutSlides[slideIndex].alt}
                    src={aboutSlides[slideIndex].src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#FFD700] font-bold mb-1">
                    Desde 2004
                  </p>
                  <p className="text-white text-xl font-bold">Oficina em Campinas — SP</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {aboutSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      aria-label={`Ir para slide ${i + 1}`}
                      className={`transition-all duration-300 rounded-full ${
                        i === slideIndex ? 'w-6 h-2 bg-[#FFD700]' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Badge flutuante */}
            <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-[#FFD700] text-black p-6 rounded-2xl shadow-2xl rotate-[-3deg] border-4 border-[#0C0C0C]">
              <p className="text-4xl sm:text-5xl font-extrabold leading-none">20+</p>
              <p className="text-[11px] font-bold uppercase tracking-wider mt-1">Anos de experiência</p>
            </div>

            {/* Stat flutuante direita */}
            <div className="absolute -top-4 -right-4 bg-gray-900 border border-[#FFD700]/40 text-white p-4 rounded-2xl shadow-xl hidden sm:block">
              <p className="text-2xl font-extrabold text-[#FFD700] leading-none">45+</p>
              <p className="text-[10px] font-bold uppercase tracking-wider mt-1 text-gray-300">Produtos em linha</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
