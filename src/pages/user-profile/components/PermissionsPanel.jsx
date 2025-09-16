import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const PermissionsPanel = ({ user, onSavePermissions }) => {
  const [permissions, setPermissions] = useState({
    inventoryManagement: user?.permissions?.inventoryManagement || false,
    salesOperations: user?.permissions?.salesOperations || false,
    userCreation: user?.permissions?.userCreation || false,
    customerManagement: user?.permissions?.customerManagement || false,
    reportAccess: user?.permissions?.reportAccess || false,
    systemSettings: user?.permissions?.systemSettings || false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const permissionsList = [
    {
      key: 'inventoryManagement',
      label: 'Gestión de Inventario',
      description: 'Crear, editar y eliminar productos del inventario',
      icon: 'Package',
      category: 'Operaciones'
    },
    {
      key: 'salesOperations',
      label: 'Operaciones de Ventas',
      description: 'Procesar ventas y gestionar transacciones',
      icon: 'ShoppingCart',
      category: 'Operaciones'
    },
    {
      key: 'customerManagement',
      label: 'Gestión de Clientes',
      description: 'Crear, editar y gestionar información de clientes',
      icon: 'Users',
      category: 'Operaciones'
    },
    {
      key: 'userCreation',
      label: 'Creación de Usuarios',
      description: 'Crear y gestionar cuentas de usuarios del sistema',
      icon: 'UserPlus',
      category: 'Administración'
    },
    {
      key: 'reportAccess',
      label: 'Acceso a Reportes',
      description: 'Ver y generar reportes del sistema',
      icon: 'FileText',
      category: 'Administración'
    },
    {
      key: 'systemSettings',
      label: 'Configuración del Sistema',
      description: 'Modificar configuraciones generales del sistema',
      icon: 'Settings',
      category: 'Administración'
    }
  ];

  const handlePermissionChange = (key, checked) => {
    setPermissions(prev => ({
      ...prev,
      [key]: checked
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      await onSavePermissions(permissions);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPermissions({
      inventoryManagement: user?.permissions?.inventoryManagement || false,
      salesOperations: user?.permissions?.salesOperations || false,
      userCreation: user?.permissions?.userCreation || false,
      customerManagement: user?.permissions?.customerManagement || false,
      reportAccess: user?.permissions?.reportAccess || false,
      systemSettings: user?.permissions?.systemSettings || false
    });
    setHasChanges(false);
  };

  const groupedPermissions = permissionsList?.reduce((acc, permission) => {
    if (!acc?.[permission?.category]) {
      acc[permission.category] = [];
    }
    acc?.[permission?.category]?.push(permission);
    return acc;
  }, {});

  const getPermissionCount = (category) => {
    const categoryPermissions = groupedPermissions?.[category] || [];
    const enabledCount = categoryPermissions?.filter(p => permissions?.[p?.key])?.length;
    return `${enabledCount}/${categoryPermissions?.length}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Permisos del Usuario</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure los permisos de acceso para este usuario
          </p>
        </div>
        
        {hasChanges && (
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={handleReset}
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
              className="text-muted-foreground"
            >
              Descartar
            </Button>
            
            <Button
              variant="default"
              onClick={handleSave}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              Guardar Permisos
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {Object.entries(groupedPermissions)?.map(([category, categoryPermissions]) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-foreground">{category}</h3>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                {getPermissionCount(category)} habilitados
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {categoryPermissions?.map((permission) => (
                <div
                  key={permission?.key}
                  className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                    <Icon name={permission?.icon} size={20} className="text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-foreground">
                          {permission?.label}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {permission?.description}
                        </p>
                      </div>
                      
                      <Checkbox
                        checked={permissions?.[permission?.key]}
                        onChange={(e) => handlePermissionChange(permission?.key, e?.target?.checked)}
                        className="ml-4"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {!hasChanges && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Los permisos se guardan automáticamente cuando realiza cambios.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionsPanel;