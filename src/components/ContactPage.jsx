import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Agradecemos o contato. Retornaremos em breve.",
        className: "bg-green-600 text-white border-green-700"
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-[#0C0C0C] min-h-screen pt-20">
      <Helmet>
        <title>Fale Conosco - JF Hydraulic</title>
        <meta name="description" content="Entre em contato com a JF Hydraulic. Unidades em Campinas e Tanabi. Telefone, WhatsApp e E-mail." />
      </Helmet>

      {/* Header */}
      <section className="bg-gradient-to-b from-gray-900 to-[#0C0C0C] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Fale <span className="text-[#FFD700]">Conosco</span>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Estamos à disposição para atender você. Escolha a unidade mais próxima ou envie uma mensagem.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Mail className="text-[#FFD700]" />
              Envie uma Mensagem
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Nome</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="Seu nome completo"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">Telefone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                    placeholder="(00) 00000-0000"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">E-mail</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email"
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="seu@email.com"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-300">Assunto</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                  placeholder="Sobre o que gostaria de falar?"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FFD700] focus:ring-[#FFD700]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-300">Mensagem</Label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4"
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  placeholder="Digite sua mensagem aqui..."
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent min-h-[120px]"
                ></textarea>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-bold text-lg py-6 transition-all hover:scale-[1.02]"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </motion.div>

          {/* Locations Information */}
          <div className="space-y-8">
            {/* Campinas Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:border-[#FFD700]/30 transition-colors"
            >
              <div className="h-48 w-full bg-gray-800">
                <iframe 
                  title="Mapa Campinas"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src="https://maps.google.com/maps?q=R.+Sebasti%C3%A3o+Polo,+210+-+Jardim+Aparecida,+Campinas+-+SP,+13067-844&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-[#FFD700] pl-3">Matriz Campinas - SP</h3>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-start gap-3">
                    <MapPin className="text-[#FFD700] shrink-0 mt-1" size={18} />
                    <span>R. Sebastião Polo, 210 - Jardim Aparecida<br/>Campinas - SP, 13067-844</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="text-[#FFD700] shrink-0" size={18} />
                    <span>(19) 3308-2554 / (19) 97419-4374</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="text-[#FFD700] shrink-0" size={18} />
                    <span>financeiro@jftruck.com.br</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Clock className="text-[#FFD700] shrink-0" size={18} />
                    <span>Seg-Sex: 8h às 18h</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tanabi Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:border-[#FFD700]/30 transition-colors"
            >
              <div className="h-48 w-full bg-gray-800">
                <iframe 
                  title="Mapa Tanabi"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src="https://maps.google.com/maps?q=Rodovia+Euclides+da+Cunha,+Km+474,+Tanabi+-+SP&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 border-l-4 border-[#FFD700] pl-3">Filial Tanabi - SP</h3>
                <div className="space-y-3 text-gray-300">
                  <p className="flex items-start gap-3">
                    <MapPin className="text-[#FFD700] shrink-0 mt-1" size={18} />
                    <span>Rodovia Euclides da Cunha, Km 474<br/>Estancia Celmar - Barracao/02<br/>Tanabi - SP, 15178-899</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="text-[#FFD700] shrink-0" size={18} />
                    <span>(17) 99684-0198</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="text-[#FFD700] shrink-0" size={18} />
                    <span>vendas.tanabi@jfhydraulic.com.br</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Clock className="text-[#FFD700] shrink-0" size={18} />
                    <span>Seg-Sex: 8h às 18h</span>
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;