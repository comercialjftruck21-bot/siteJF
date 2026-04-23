import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ShieldCheck, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-[#0C0C0C] min-h-screen pt-20">
      <Helmet>
        <title>Quem Somos - JF Hydraulic</title>
        <meta name="description" content="Conheça a história e os valores da JF Hydraulic, líder em soluções hidráulicas para caminhões." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-bold text-white mb-6"
            >
              Sobre a <span className="text-[#FFD700]">JF Hydraulic</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 leading-relaxed"
            >
              Há mais de duas décadas transformando o mercado de equipamentos hidráulicos com inovação, qualidade e compromisso.
            </motion.p>
          </div>
        </div>
      </section>

      {/* History & Mission */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-white mb-6">Nossa História</h2>
              <div className="prose prose-invert prose-lg text-gray-400">
                <p className="mb-4">
                  Fundada com o objetivo de oferecer soluções robustas e confiáveis para o setor de transporte, a JF Hydraulic cresceu e se consolidou como uma referência no mercado nacional. Começamos como uma pequena oficina especializada e hoje somos uma das principais fornecedoras de kits hidráulicos do país.
                </p>
                <p>
                  Nossa trajetória é marcada pelo investimento contínuo em tecnologia e na capacitação de nossa equipe. Entendemos que cada caminhão parado representa um prejuízo, por isso desenvolvemos produtos que garantem durabilidade e eficiência operacional máxima.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 bg-[#FFD700] rounded-2xl transform rotate-3 opacity-20 blur-lg"></div>
              <img
                src="/about/fachada-jf-hydraulic.png"
                alt="Fachada da JF Hydraulic em Campinas - vista aérea do galpão com caminhões basculantes"
                className="relative rounded-2xl shadow-2xl border border-gray-800 w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Cards */}
      <section className="py-20 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Nossos Valores</h2>
            <p className="mt-4 text-gray-400">Os pilares que sustentam nosso trabalho</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-lg hover:shadow-[#FFD700]/10 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#FFD700]/10 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Qualidade Garantida</h3>
              <p className="text-gray-400">
                Todos os nossos produtos passam por rigorosos testes de qualidade e possuem certificações que atestam sua durabilidade.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-lg hover:shadow-[#FFD700]/10 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#FFD700]/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Foco no Cliente</h3>
              <p className="text-gray-400">
                Nosso atendimento é personalizado, visando entender e resolver as necessidades específicas de cada parceiro.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-lg hover:shadow-[#FFD700]/10 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#FFD700]/10 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Inovação Constante</h3>
              <p className="text-gray-400">
                Buscamos sempre as tecnologias mais recentes para oferecer soluções modernas e eficientes ao mercado.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-gray-900 to-[#0C0C0C]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Faça parte dessa história</h2>
          <p className="text-xl text-gray-400 mb-8">
            Descubra como podemos ajudar a potencializar o seu negócio com equipamentos de alta performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#produtos">
              <Button className="w-full sm:w-auto bg-[#FFD700] text-black hover:bg-[#FFD700]/90 text-lg px-8 py-6 rounded-full font-bold shadow-lg shadow-[#FFD700]/20">
                Ver Produtos
              </Button>
            </Link>
            <Link to="/fale-conosco">
              <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 rounded-full font-bold">
                Fale Conosco
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;