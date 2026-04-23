import React, { createContext, useContext, useState, useCallback } from 'react';
import WhatsAppLeadDialog from '@/components/WhatsAppLeadDialog';

const WhatsAppLeadContext = createContext({
  open: () => {},
  close: () => {},
});

export const WhatsAppLeadProvider = ({ children }) => {
  const [state, setState] = useState({ isOpen: false, productMessage: '' });

  const open = useCallback((opts = {}) => {
    setState({ isOpen: true, productMessage: opts.productMessage || '' });
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  return (
    <WhatsAppLeadContext.Provider value={{ open, close }}>
      {children}
      <WhatsAppLeadDialog
        isOpen={state.isOpen}
        onClose={close}
        productMessage={state.productMessage}
      />
    </WhatsAppLeadContext.Provider>
  );
};

export const useWhatsAppLead = () => useContext(WhatsAppLeadContext);
