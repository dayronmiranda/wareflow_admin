import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const MobileMenuToggle = ({ isOpen = false, onToggle, className = "" }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={`lg:hidden transition-smooth ${className}`}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={isOpen}
    >
      <Icon 
        name={isOpen ? "X" : "Menu"} 
        size={24} 
        className="transition-smooth"
      />
    </Button>
  );
};

export default MobileMenuToggle;