import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const UserPermissionsModal = ({ 
  isOpen = false, 
  onClose, 
  onSave, 
  user = null 
}) => {
  const [permissions, setPermissions] = useState({
    inventory: {
      view: false,
      create: false,
      edit: false,
      delete: false,
      export: false
    },
    sales: {
      view: false,
      create: false,
      edit: false,
      delete: false,
      reports: false
    },
    users: {
      view: false,
      create: false,
      edit: false,
      delete: false,
      permissions: false
    },
    customers: {
      view: false,
      create: false,
      edit: false,
      delete: false,
      export: false
    },
    reports: {
      view: false,
      generate: false,
      export: false,
      schedule: false
    },
    settings: {
      view: false,
      edit: false,
      system: false,
      backup: false
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      // Load user's current permissions
      setPermissions(user?.permissions || {
        inventory: { view: false, create: false, edit: false, delete: false, export: false },
        sales: { view: false, create: false, edit: false, delete: false, reports: false },
        users: { view: false, create: false, edit: false, delete: false, permissions: false },
        customers: { view: false, create: false, edit: false, delete: false, export: false },
        reports: { view: false, generate: false, export: false, schedule: false },
        settings: { view: false, edit: false, system: false, backup: false }
      });
    }
  }, [isOpen, user]);

  const permissionSections = [
    {
      key: 'inventory',
      title: 'Inventario',
      icon: 'Package',
      description: 'Gestión de productos y stock',
      permissions: [
        { key: 'view', label: 'Ver inventario', description: 'Consultar productos y stock' },
        { key: 'create', label: 'Crear productos', description: 'Agregar nuevos productos' },
        { key: 'edit', label: 'Editar productos', description: 'Modificar información de productos' },
        { key: 'delete', label: 'Eliminar productos', description: 'Borrar productos del sistema' },
        { key: 'export', label: 'Exportar datos', description: 'Descargar reportes de inventario' }
      ]
    },
    {
      key: 'sales',
      title: 'Ventas',
      icon: 'ShoppingCart',
      description: 'Operaciones de venta',
      permissions: [
        { key: 'view', label: 'Ver ventas', description: 'Consultar historial de ventas' },
        { key: 'create', label: 'Crear ventas', description: 'Registrar nuevas ventas' },
        { key: 'edit', label: 'Editar ventas', description: 'Modificar ventas existentes' },
        { key: 'delete', label: 'Anular ventas', description: 'Cancelar o anular ventas' },
        { key: 'reports', label: 'Reportes de ventas', description: 'Generar informes de ventas' }
      ]
    },
    {
      key: 'users',
      title: 'Usuarios',
      icon: 'Users',
      description: 'Gestión de usuarios del sistema',
      permissions: [
        { key: 'view', label: 'Ver usuarios', description: 'Consultar lista de usuarios' },
        { key: 'create', label: 'Crear usuarios', description: 'Agregar nuevos usuarios' },
        { key: 'edit', label: 'Editar usuarios', description: 'Modificar datos de usuarios' },
        { key: 'delete', label: 'Eliminar usuarios', description: 'Borrar usuarios del sistema' },
        { key: 'permissions', label: 'Gestionar permisos', description: 'Asignar permisos a usuarios' }
      ]
    },
    {
      key: 'customers',
      title: 'Clientes',
      icon: 'Building2',
      description: 'Gestión de clientes',
      permissions: [
        { key: 'view', label: 'Ver clientes', description: 'Consultar información de clientes' },
        { key: 'create', label: 'Crear clientes', description: 'Registrar nuevos clientes' },
        { key: 'edit', label: 'Editar clientes', description: 'Modificar datos de clientes' },
        { key: 'delete', label: 'Eliminar clientes', description: 'Borrar clientes del sistema' },
        { key: 'export', label: 'Exportar clientes', description: 'Descargar base de datos de clientes' }
      ]
    },
    {
      key: 'reports',
      title: 'Reportes',
      icon: 'FileText',
      description: 'Informes y análisis',
      permissions: [
        { key: 'view', label: 'Ver reportes', description: 'Consultar reportes existentes' },
        { key: 'generate', label: 'Generar reportes', description: 'Crear nuevos reportes' },
        { key: 'export', label: 'Exportar reportes', description: 'Descargar reportes en diferentes formatos' },
        { key: 'schedule', label: 'Programar reportes', description: 'Configurar reportes automáticos' }
      ]
    },
    {
      key: 'settings',
      title: 'Configuración',
      icon: 'Settings',
      description: 'Configuración del sistema',
      permissions: [
        { key: 'view', label: 'Ver configuración', description: 'Consultar configuración actual' },
        { key: 'edit', label: 'Editar configuración', description: 'Modificar configuración general' },
        { key: 'system', label: 'Configuración avanzada', description: 'Acceso a configuración del sistema' },
        { key: 'backup', label: 'Respaldos', description: 'Crear y restaurar respaldos' }
      ]
    }
  ];

  const handlePermissionChange = (section, permission, checked) => {
    setPermissions(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [permission]: checked
      }
    }));
  };

  const handleSectionToggle = (section, checked) => {
    const sectionPermissions = permissionSections?.find(s => s?.key === section)?.permissions || [];
    const newSectionPermissions = {};
    
    sectionPermissions?.forEach(perm => {
      newSectionPermissions[perm.key] = checked;
    });

    setPermissions(prev => ({
      ...prev,
      [section]: newSectionPermissions
    }));
  };

  const isSectionFullyChecked = (section) => {
    const sectionPermissions = permissions?.[section] || {};
    return Object.values(sectionPermissions)?.every(value => value === true);
  };

  const isSectionPartiallyChecked = (section) => {
    const sectionPermissions = permissions?.[section] || {};
    const values = Object.values(sectionPermissions);
    return values?.some(value => value === true) && !values?.every(value => value === true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSave({ ...user, permissions });
      onClose();
    } catch (error) {
      console.error('Error saving permissions:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden modal-shadow">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Permisos de Usuario
              </h2>
              <p className="text-sm text-muted-foreground">
                Configurar permisos para {user?.name}
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {permissionSections?.map((section) => (
              <div key={section?.key} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Icon name={section?.icon} size={20} className="text-primary" />
                    <div>
                      <h3 className="font-medium text-foreground">{section?.title}</h3>
                      <p className="text-sm text-muted-foreground">{section?.description}</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={isSectionFullyChecked(section?.key)}
                    indeterminate={isSectionPartiallyChecked(section?.key)}
                    onChange={(e) => handleSectionToggle(section?.key, e?.target?.checked)}
                    label="Seleccionar todo"
                  />
                </div>

                <CheckboxGroup>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section?.permissions?.map((permission) => (
                      <Checkbox
                        key={permission?.key}
                        checked={permissions?.[section?.key]?.[permission?.key] || false}
                        onChange={(e) => handlePermissionChange(section?.key, permission?.key, e?.target?.checked)}
                        label={permission?.label}
                        description={permission?.description}
                      />
                    ))}
                  </div>
                </CheckboxGroup>
              </div>
            ))}
          </div>
        </div>

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
            iconName="Save"
            iconPosition="left"
          >
            Guardar Permisos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserPermissionsModal;