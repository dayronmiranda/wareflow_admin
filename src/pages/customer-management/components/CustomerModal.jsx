import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomerModal = ({ 
  isOpen, 
  onClose, 
  customer = null, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cedula: '',
    address: '',
    segment: 'new',
    status: 'active'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer?.name || '',
        email: customer?.email || '',
        phone: customer?.phone || '',
        cedula: customer?.cedula || '',
        address: customer?.address || '',
        segment: customer?.segment || 'new',
        status: customer?.status || 'active'
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        cedula: '',
        address: '',
        segment: 'new',
        status: 'active'
      });
    }
    setErrors({});
  }, [customer, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData?.name?.trim()?.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email?.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex?.test(formData?.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    // Cuban phone validation (+53 XXXX-XXXX)
    const phoneRegex = /^\+53\s\d{4}-\d{4}$/;
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!phoneRegex?.test(formData?.phone)) {
      newErrors.phone = 'Formato: +53 XXXX-XXXX';
    }

    // Cuban ID validation (11 digits)
    const cedulaRegex = /^\d{11}$/;
    if (!formData?.cedula?.trim()) {
      newErrors.cedula = 'La cédula es requerida';
    } else if (!cedulaRegex?.test(formData?.cedula)) {
      newErrors.cedula = 'La cédula debe tener 11 dígitos';
    }

    // Address validation
    if (!formData?.address?.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePhoneFormat = (value) => {
    // Auto-format phone number
    let cleaned = value?.replace(/\D/g, '');
    
    if (cleaned?.startsWith('53')) {
      cleaned = cleaned?.substring(2);
    }
    
    if (cleaned?.length <= 8) {
      let formatted = '+53 ';
      if (cleaned?.length > 4) {
        formatted += cleaned?.substring(0, 4) + '-' + cleaned?.substring(4);
      } else {
        formatted += cleaned;
      }
      return formatted;
    }
    
    return value;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const customerData = {
        ...formData,
        id: customer?.id || Date.now(),
        createdAt: customer?.createdAt || new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString(),
        totalSpent: customer?.totalSpent || 0,
        lastPurchase: customer?.lastPurchase || null
      };

      await onSave(customerData);
      onClose();
    } catch (error) {
      console.error('Error saving customer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto modal-shadow">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {customer ? 'Editar Cliente' : 'Crear Nuevo Cliente'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Información Básica</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre Completo"
                type="text"
                required
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                placeholder="Ej: Juan Carlos Pérez"
              />

              <Input
                label="Cédula de Identidad"
                type="text"
                required
                value={formData?.cedula}
                onChange={(e) => handleInputChange('cedula', e?.target?.value)}
                error={errors?.cedula}
                placeholder="12345678901"
                maxLength={11}
              />
            </div>

            <Input
              label="Correo Electrónico"
              type="email"
              required
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              placeholder="ejemplo@correo.com"
            />

            <Input
              label="Teléfono"
              type="tel"
              required
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', handlePhoneFormat(e?.target?.value))}
              error={errors?.phone}
              placeholder="+53 5234-5678"
            />

            <Input
              label="Dirección"
              type="text"
              required
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              error={errors?.address}
              placeholder="Calle, número, municipio, provincia"
            />
          </div>

          {/* Classification */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Clasificación</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Segmento de Cliente
                </label>
                <select
                  value={formData?.segment}
                  onChange={(e) => handleInputChange('segment', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="new">Nuevo</option>
                  <option value="occasional">Ocasional</option>
                  <option value="frequent">Frecuente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Estado del Cliente
                </label>
                <select
                  value={formData?.status}
                  onChange={(e) => handleInputChange('status', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                  <option value="blocked">Bloqueado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              {customer ? 'Actualizar Cliente' : 'Crear Cliente'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;