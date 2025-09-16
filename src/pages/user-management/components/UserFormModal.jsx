import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserFormModal = ({ 
  isOpen = false, 
  onClose, 
  onSave, 
  user = null, 
  mode = 'create' 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cubanId: '',
    phone: '',
    role: 'staff',
    warehouse: '',
    status: 'active',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleOptions = [
    { value: 'staff', label: 'Personal' },
    { value: 'manager', label: 'Gerente' },
    { value: 'owner', label: 'Propietario' }
  ];

  const warehouseOptions = [
    { value: 'havana-central', label: 'Almacén Central Habana' },
    { value: 'santiago-norte', label: 'Almacén Norte Santiago' },
    { value: 'matanzas-sur', label: 'Almacén Sur Matanzas' },
    { value: 'villa-clara', label: 'Almacén Villa Clara' },
    { value: 'camaguey-este', label: 'Almacén Este Camagüey' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'suspended', label: 'Suspendido' }
  ];

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && user) {
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          cubanId: user?.cubanId || '',
          phone: user?.phone || '',
          role: user?.role || 'staff',
          warehouse: user?.warehouseId || '',
          status: user?.status || 'active',
          password: '',
          confirmPassword: ''
        });
      } else {
        setFormData({
          name: '',
          email: '',
          cubanId: '',
          phone: '',
          role: 'staff',
          warehouse: '',
          status: 'active',
          password: '',
          confirmPassword: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, user]);

  const validateCubanId = (id) => {
    return /^\d{11}$/?.test(id);
  };

  const validateCubanPhone = (phone) => {
    return /^\+53\s?\d{4}-?\d{4}$/?.test(phone);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(email);
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
      newErrors.cubanId = 'La cédula de identidad es requerida';
    } else if (!validateCubanId(formData?.cubanId)) {
      newErrors.cubanId = 'La cédula debe tener 11 dígitos';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!validateCubanPhone(formData?.phone)) {
      newErrors.phone = 'Formato: +53 XXXX-XXXX';
    }

    if (!formData?.warehouse) {
      newErrors.warehouse = 'Debe seleccionar un almacén';
    }

    if (mode === 'create') {
      if (!formData?.password) {
        newErrors.password = 'La contraseña es requerida';
      } else if (formData?.password?.length < 6) {
        newErrors.password = 'Mínimo 6 caracteres';
      }

      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
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

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden modal-shadow">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name={mode === 'create' ? 'UserPlus' : 'UserCog'} size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {mode === 'create' ? 'Crear Usuario' : 'Editar Usuario'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {mode === 'create' ?'Ingrese los datos del nuevo usuario' :'Modifique los datos del usuario'
                }
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre Completo"
                  type="text"
                  placeholder="Ej: Juan Carlos Pérez"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  error={errors?.name}
                  required
                />

                <Input
                  label="Cédula de Identidad"
                  type="text"
                  placeholder="12345678901"
                  value={formData?.cubanId}
                  onChange={(e) => handleInputChange('cubanId', e?.target?.value)}
                  error={errors?.cubanId}
                  maxLength={11}
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="usuario@ejemplo.cu"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                  required
                />

                <Input
                  label="Teléfono"
                  type="tel"
                  placeholder="+53 5555-5555"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  error={errors?.phone}
                  required
                />
              </div>
            </div>

            {/* System Configuration */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Configuración del Sistema</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Rol"
                  options={roleOptions}
                  value={formData?.role}
                  onChange={(value) => handleInputChange('role', value)}
                  required
                />

                <Select
                  label="Almacén Asignado"
                  options={warehouseOptions}
                  value={formData?.warehouse}
                  onChange={(value) => handleInputChange('warehouse', value)}
                  error={errors?.warehouse}
                  searchable
                  required
                />

                <Select
                  label="Estado"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                  required
                />
              </div>
            </div>

            {/* Password Section */}
            {mode === 'create' && (
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Credenciales de Acceso</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Contraseña"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData?.password}
                    onChange={(e) => handleInputChange('password', e?.target?.value)}
                    error={errors?.password}
                    required
                  />

                  <Input
                    label="Confirmar Contraseña"
                    type="password"
                    placeholder="Repita la contraseña"
                    value={formData?.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                    error={errors?.confirmPassword}
                    required
                  />
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            loading={isSubmitting}
            iconName={mode === 'create' ? 'UserPlus' : 'Save'}
            iconPosition="left"
          >
            {mode === 'create' ? 'Crear Usuario' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;