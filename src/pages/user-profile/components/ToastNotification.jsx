import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ToastNotification = ({ 
  isVisible, 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: 'CheckCircle',
          bgColor: 'bg-success',
          textColor: 'text-white',
          borderColor: 'border-success'
        };
      case 'error':
        return {
          icon: 'XCircle',
          bgColor: 'bg-error',
          textColor: 'text-white',
          borderColor: 'border-error'
        };
      case 'warning':
        return {
          icon: 'AlertTriangle',
          bgColor: 'bg-warning',
          textColor: 'text-white',
          borderColor: 'border-warning'
        };
      case 'info':
        return {
          icon: 'Info',
          bgColor: 'bg-primary',
          textColor: 'text-white',
          borderColor: 'border-primary'
        };
      default:
        return {
          icon: 'CheckCircle',
          bgColor: 'bg-success',
          textColor: 'text-white',
          borderColor: 'border-success'
        };
    }
  };

  const config = getToastConfig();

  return (
    <div className="fixed top-4 right-4 z-60 animate-in slide-in-from-right duration-300">
      <div className={`
        flex items-center space-x-3 px-4 py-3 rounded-lg border shadow-lg min-w-80 max-w-md
        ${config?.bgColor} ${config?.textColor} ${config?.borderColor}
      `}>
        <Icon name={config?.icon} size={20} />
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="hover:opacity-80 transition-opacity"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;