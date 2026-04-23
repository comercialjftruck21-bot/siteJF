import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, MessageCircle, User, Building2, MapPin, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  buildLeadMessage,
  formatPhoneBR,
  generateProtocol,
  generateWhatsAppLink,
  getUTMs,
  isValidPhoneBR,
  COMPANY_PHONE,
} from '@/utils/whatsappUtils';

const initialForm = {
  name: '',
  entityType: 'pj', // 'pf' | 'pj'
  company: '',
  city: '',
  phone: '',
};

const WhatsAppLeadDialog = ({ isOpen, onClose, productMessage }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const firstFieldRef = useRef(null);

  // Reset ao abrir
  useEffect(() => {
    if (isOpen) {
      setErrors({});
      setSubmitting(false);
      // Mantém os dados anteriores se o usuário tinha começado — UX melhor
      setTimeout(() => firstFieldRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Fecha com Esc + trava scroll
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  const update = (patch) => {
    setForm((f) => ({ ...f, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      Object.keys(patch).forEach((k) => delete next[k]);
      return next;
    });
  };

  const handlePhoneChange = (e) => update({ phone: formatPhoneBR(e.target.value) });

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Informe seu nome completo';
    if (form.entityType === 'pj' && !form.company.trim()) e.company = 'Informe o nome da empresa';
    if (!form.city.trim()) e.city = 'Informe sua cidade';
    if (!isValidPhoneBR(form.phone)) e.phone = 'Informe um telefone válido com DDD';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const protocol = generateProtocol();
      const message = buildLeadMessage({
        name: form.name.trim(),
        entityType: form.entityType,
        company: form.company.trim(),
        city: form.city.trim(),
        productMessage,
        utms: getUTMs(),
        protocol,
      });
      const url = generateWhatsAppLink(COMPANY_PHONE, message);
      window.open(url, '_blank', 'noopener,noreferrer');
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="jf-lead-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="jf-lead-title"
        >
          <motion.div
            key="jf-lead-panel"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-[#0C0C0C] shadow-2xl"
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition-colors z-10"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="p-6 sm:p-8 pb-4 border-b border-gray-800">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                <span className="text-xs font-bold text-[#25D366] uppercase tracking-wider">
                  Atendimento via WhatsApp
                </span>
              </div>
              <h2 id="jf-lead-title" className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Antes de conversarmos,
                <br className="hidden sm:block" /> conte um pouco sobre você
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                Agiliza seu atendimento e gera um protocolo único pra sua solicitação.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 pt-5 space-y-4" noValidate>
              {/* Nome */}
              <Field
                label="Nome completo"
                icon={User}
                error={errors.name}
                required
              >
                <input
                  ref={firstFieldRef}
                  type="text"
                  value={form.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="Ex: João da Silva"
                  autoComplete="name"
                  className={inputClass(errors.name)}
                />
              </Field>

              {/* Tipo PF/PJ */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Você é
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <EntityButton
                    active={form.entityType === 'pj'}
                    onClick={() => update({ entityType: 'pj' })}
                    icon={Building2}
                    label="Empresa"
                  />
                  <EntityButton
                    active={form.entityType === 'pf'}
                    onClick={() => update({ entityType: 'pf', company: '' })}
                    icon={User}
                    label="Pessoa física"
                  />
                </div>
              </div>

              {/* Nome da empresa — só se PJ */}
              {form.entityType === 'pj' && (
                <Field
                  label="Nome da empresa"
                  icon={Building2}
                  error={errors.company}
                  required
                >
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => update({ company: e.target.value })}
                    placeholder="Ex: Transportadora ABC Ltda"
                    autoComplete="organization"
                    className={inputClass(errors.company)}
                  />
                </Field>
              )}

              {/* Cidade */}
              <Field label="Cidade" icon={MapPin} error={errors.city} required>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => update({ city: e.target.value })}
                  placeholder="Ex: Campinas — SP"
                  autoComplete="address-level2"
                  className={inputClass(errors.city)}
                />
              </Field>

              {/* Telefone */}
              <Field label="WhatsApp com DDD" icon={Phone} error={errors.phone} required>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={handlePhoneChange}
                  placeholder="55 (11) 98765-4321"
                  inputMode="tel"
                  autoComplete="tel"
                  className={inputClass(errors.phone)}
                />
                <p className="mt-1 text-[11px] text-gray-500">
                  Formato automático: 55 (DDD) NÚMERO
                </p>
              </Field>

              {/* Privacidade */}
              <div className="flex items-start gap-2 text-xs text-gray-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#FFD700]/60 flex-shrink-0 mt-0.5" />
                <span>
                  Seus dados são usados apenas para identificar seu atendimento. Não enviamos spam.
                </span>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-14 mt-2 rounded-2xl bg-[#25D366] hover:bg-[#1fa855] text-white font-bold text-base shadow-[0_10px_30px_-5px_rgba(37,211,102,0.5)] transition-all group"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {submitting ? 'Abrindo WhatsApp…' : 'Continuar no WhatsApp'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

/* ----- helpers ----- */
const inputClass = (hasError) =>
  [
    'w-full h-11 px-4 rounded-xl bg-gray-900/80 border text-white placeholder:text-gray-600 text-sm',
    'focus:outline-none focus:ring-2 transition-all',
    hasError
      ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
      : 'border-gray-800 focus:border-[#FFD700]/60 focus:ring-[#FFD700]/10',
  ].join(' ');

const Field = ({ label, icon: Icon, error, required, children }) => (
  <div>
    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
      {Icon && <Icon className="w-3.5 h-3.5 text-[#FFD700]" />}
      {label}
      {required && <span className="text-[#FFD700]">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
  </div>
);

const EntityButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      'flex items-center justify-center gap-2 h-11 rounded-xl border text-sm font-semibold transition-all',
      active
        ? 'bg-[#FFD700] border-[#FFD700] text-black shadow-[0_6px_20px_-6px_rgba(255,215,0,0.6)]'
        : 'bg-gray-900/80 border-gray-800 text-gray-300 hover:border-[#FFD700]/40 hover:text-white',
    ].join(' ')}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

export default WhatsAppLeadDialog;
