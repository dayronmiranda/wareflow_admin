import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PersonalInfoForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    cubanId: user?.cubanId || '',
    phone: user?.phone || '',
    role: user?.role || 'staff',
    warehouse: user?.warehouse || '',
    status: user?.status || 'active'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: 'owner', label: 'Propietario' },
    { value: 'manager', label: 'Gerente' },
    { value: 'staff', label: 'Personal' }
  ];

  const warehouseOptions = [
    { value: 'Almacén Central Habana', label: 'Almacén Central Habana' },
    { value: 'Almacén Santiago', label: 'Almacén Santiago' },
    { value: 'Almacén Matanzas', label: 'Almacén Matanzas' },
    { value: 'Almacén Holguín', label: 'Almacén Holguín' },
    { value: 'Almacén Camagüey', label: 'Almacén Camagüey' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'suspended', label: 'Suspendido' }
  ];

  const validateCubanId = (id) => {
    const cubanIdRegex = /^\d{11}$/;
    return cubanIdRegex?.test(id);
  };

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
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (!formData?.cubanId?.trim()) {
      newErrors.cubanId = 'El carnet de identidad es requerido';
    } else if (!validateCubanId(formData?.cubanId)) {
      newErrors.cubanId = 'El carnet debe tener 11 dígitos';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!validateCubanPhone(formData?.phone)) {
      newErrors.phone = 'Formato: +53 XXXX-XXXX';
    }

    if (!formData?.warehouse) {
      newErrors.warehouse = 'Debe seleccionar un almacén';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      cubanId: user?.cubanId || '',
      phone: user?.phone || '',
      role: user?.role || 'staff',
      warehouse: user?.warehouse || '',
      status: user?.status || 'active'
    });
    setErrors({});
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Información Personal</h2>
        <Button
          variant="ghost"
          onClick={handleReset}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
          className="text-muted-foreground"
        >
          Restablecer
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nombre Completo"
            type="text"
            placeholder="Ingrese el nombre completo"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />

          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="usuario@ejemplo.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <Input
            label="Carnet de Identidad"
            type="text"
            placeholder="12345678901"
            value={formData?.cubanId}
            onChange={(e) => handleInputChange('cubanId', e?.target?.value)}
            error={errors?.cubanId}
            description="11 dígitos del carnet cubano"
            maxLength={11}
            required
          />

          <Input
            label="Teléfono"
            type="tel"
            placeholder="+53 5555-5555"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            description="Formato: +53 XXXX-XXXX"
            required
          />

          <Select
            label="Rol del Usuario"
            options={roleOptions}
            value={formData?.role}
            onChange={(value) => handleInputChange('role', value)}
            error={errors?.role}
            required
          />

          <Select
            label="Almacén Asignado"
            options={warehouseOptions}
            value={formData?.warehouse}
            onChange={(value) => handleInputChange('warehouse', value)}
            error={errors?.warehouse}
            placeholder="Seleccionar almacén"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Estado del Usuario"
            options={statusOptions}
            value={formData?.status}
            onChange={(value) => handleInputChange('status', value)}
            error={errors?.status}
            required
          />
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;