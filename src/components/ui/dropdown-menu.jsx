import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

const DropdownMenuContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
});

export const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={menuRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuTrigger = ({ children, className }) => {
  const { isOpen, setIsOpen } = useContext(DropdownMenuContext);
  
  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={cn("inline-flex items-center justify-center focus:outline-none", className)}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {children}
    </button>
  );
};

export const DropdownMenuContent = ({ children, className }) => {
  const { isOpen } = useContext(DropdownMenuContext);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "absolute right-0 z-50 mt-2 min-w-[8rem] origin-top-right rounded-md border bg-white p-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none",
        className
      )}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem = ({ children, className, onClick }) => {
  const { setIsOpen } = useContext(DropdownMenuContext);

  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={(e) => {
        setIsOpen(false);
        if (onClick) onClick(e);
      }}
    >
      {children}
    </div>
  );
};