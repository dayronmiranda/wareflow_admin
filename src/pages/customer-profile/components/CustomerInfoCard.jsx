import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CustomerInfoCard = ({ customer, onSave, onCancel, isEditing, onEdit }) => {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    address: customer?.address || '',
    city: customer?.city || '',
    province: customer?.province || '',
    postalCode: customer?.postalCode || '',
    segment: customer?.segment || 'new',
    status: customer?.status || 'active'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const segmentOptions = [
    { value: 'frequent', label: 'Cliente Frecuente' },
    { value: 'occasional', label: 'Cliente Ocasional' },
    { value: 'new', label: 'Cliente Nuevo' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'blocked', label: 'Bloqueado' }
  ];

  const provinceOptions = [
    { value: 'havana', label: 'La Habana' },
    { value: 'artemisa', label: 'Artemisa' },
    { value: 'mayabeque', label: 'Mayabeque' },
    { value: 'matanzas', label: 'Matanzas' },
    { value: 'villa_clara', label: 'Villa Clara' },
    { value: 'cienfuegos', label: 'Cienfuegos' },
    { value: 'sancti_spiritus', label: 'Sancti Spíritus' },
    { value: 'ciego_avila', label: 'Ciego de Ávila' },
    { value: 'camaguey', label: 'Camagüey' },
    { value: 'las_tunas', label: 'Las Tunas' },
    { value: 'granma', label: 'Granma' },
    { value: 'holguin', label: 'Holguín' },
    { value: 'santiago', label: 'Santiago de Cuba' },
    { value: 'guantanamo', label: 'Guantánamo' },
    { value: 'pinar_rio', label: 'Pinar del Río' },
    { value: 'isla_juventud', label: 'Isla de la Juventud' }
  ];

  const validateCubanPhone = (phone) => {
    const cubanPhoneRegex = /^\+53\s?\d{4}-?\d{4}$/;
    return cubanPhoneRegex?.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!validateCubanPhone(formData?.phone)) {
      newErrors.phone = 'Formato debe ser +53 XXXX-XXXX';
    }

    if (!formData?.address?.trim()) {
      newErrors.address = 'La dirección es obligatoria';
    }

    if (!formData?.city?.trim()) {
      newErrors.city = 'La ciudad es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving customer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'inactive': return 'bg-warning text-warning-foreground';
      case 'blocked': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSegmentBadgeColor = (segment) => {
    switch (segment) {
      case 'frequent': return 'bg-primary text-primary-foreground';
      case 'occasional': return 'bg-accent text-accent-foreground';
      case 'new': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg card-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={24} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {isEditing ? 'Editar Cliente' : 'Información del Cliente'}
              </h2>
              <p className="text-sm text-muted-foreground">
                ID: {customer?.id || 'N/A'}
              </p>
            </div>
          </div>
          
          {!isEditing && (
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(customer?.status)}`}>
                {statusOptions?.find(opt => opt?.value === customer?.status)?.label || customer?.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSegmentBadgeColor(customer?.segment)}`}>
                {segmentOptions?.find(opt => opt?.value === customer?.segment)?.label || customer?.segment}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Información Personal</h3>
            
            <Input
              label="Nombre Completo"
              type="text"
              placeholder="Ingrese el nombre completo"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              error={errors?.name}
              disabled={!isEditing}
              required
            />

            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="ejemplo@correo.com"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              disabled={!isEditing}
              required
            />

            <Input
              label="Teléfono"
              type="tel"
              placeholder="+53 XXXX-XXXX"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
              disabled={!isEditing}
              required
              description="Formato: +53 XXXX-XXXX"
            />

            {isEditing && (
              <>
                <Select
                  label="Segmento de Cliente"
                  options={segmentOptions}
                  value={formData?.segment}
                  onChange={(value) => handleInputChange('segment', value)}
                  disabled={!isEditing}
                />

                <Select
                  label="Estado"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                  disabled={!isEditing}
                />
              </>
            )}
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Información de Dirección</h3>
            
            <Input
              label="Dirección"
              type="text"
              placeholder="Calle, número, apartamento"
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              error={errors?.address}
              disabled={!isEditing}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Ciudad"
                type="text"
                placeholder="Ciudad"
                value={formData?.city}
                onChange={(e) => handleInputChange('city', e?.target?.value)}
                error={errors?.city}
                disabled={!isEditing}
                required
              />

              <Input
                label="Código Postal"
                type="text"
                placeholder="Código postal"
                value={formData?.postalCode}
                onChange={(e) => handleInputChange('postalCode', e?.target?.value)}
                disabled={!isEditing}
              />
            </div>

            <Select
              label="Provincia"
              options={provinceOptions}
              value={formData?.province}
              onChange={(value) => handleInputChange('province', value)}
              disabled={!isEditing}
              placeholder="Seleccione una provincia"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-border">
          {isEditing ? (
            <>
              <Button
                variant="default"
                onClick={handleSave}
                loading={isLoading}
                iconName="Save"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Guardar Cambios
              </Button>
              <Button
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                iconName="X"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Cancelar
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              onClick={onEdit}
              iconName="Edit"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Editar Información
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoCard;