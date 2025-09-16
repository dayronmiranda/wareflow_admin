import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityHistory = ({ user }) => {
  const [activeTab, setActiveTab] = useState('login');

  const loginHistory = [
    {
      id: 1,
      date: '15/09/2024',
      time: '14:32',
      ip: '192.168.1.105',
      device: 'Chrome en Windows',
      location: 'Habana, Cuba',
      status: 'success'
    },
    {
      id: 2,
      date: '14/09/2024',
      time: '09:15',
      ip: '192.168.1.105',
      device: 'Chrome en Windows',
      location: 'Habana, Cuba',
      status: 'success'
    },
    {
      id: 3,
      date: '13/09/2024',
      time: '16:45',
      ip: '192.168.1.105',
      device: 'Chrome en Windows',
      location: 'Habana, Cuba',
      status: 'success'
    },
    {
      id: 4,
      date: '12/09/2024',
      time: '11:20',
      ip: '192.168.1.98',
      device: 'Firefox en Windows',
      location: 'Habana, Cuba',
      status: 'failed'
    },
    {
      id: 5,
      date: '11/09/2024',
      time: '08:30',
      ip: '192.168.1.105',
      device: 'Chrome en Windows',
      location: 'Habana, Cuba',
      status: 'success'
    }
  ];

  const recentActions = [
    {
      id: 1,
      action: 'Actualizó información del cliente',
      target: 'María González Pérez',
      date: '15/09/2024',
      time: '13:45',
      type: 'update',
      details: 'Modificó dirección y teléfono de contacto'
    },
    {
      id: 2,
      action: 'Creó nuevo producto en inventario',
      target: 'Arroz Blanco 1kg',
      date: '15/09/2024',
      time: '11:20',
      type: 'create',
      details: 'Agregó 500 unidades al almacén central'
    },
    {
      id: 3,
      action: 'Procesó venta',
      target: 'Venta #VT-2024-0892',
      date: '14/09/2024',
      time: '16:30',
      type: 'sale',
      details: 'Venta por valor de $2,450.00 CUP'
    },
    {
      id: 4,
      action: 'Actualizó permisos de usuario',
      target: 'Carlos Rodríguez',
      date: '14/09/2024',
      time: '10:15',
      type: 'permission',
      details: 'Habilitó acceso a reportes de ventas'
    },
    {
      id: 5,
      action: 'Generó reporte de inventario',
      target: 'Reporte mensual septiembre',
      date: '13/09/2024',
      time: '14:00',
      type: 'report',
      details: 'Exportó datos de productos con bajo stock'
    }
  ];

  const systemChanges = [
    {
      id: 1,
      change: 'Perfil actualizado',
      description: 'Cambió número de teléfono de contacto',
      date: '15/09/2024',
      time: '12:30',
      changedBy: 'Ana Martínez (Gerente)'
    },
    {
      id: 2,
      change: 'Permisos modificados',
      description: 'Se habilitó acceso a gestión de inventario',
      date: '10/09/2024',
      time: '09:45',
      changedBy: 'Roberto Silva (Propietario)'
    },
    {
      id: 3,
      change: 'Almacén reasignado',
      description: 'Transferido de Almacén Santiago a Almacén Central Habana',
      date: '05/09/2024',
      time: '15:20',
      changedBy: 'Roberto Silva (Propietario)'
    },
    {
      id: 4,
      change: 'Contraseña restablecida',
      description: 'Contraseña restablecida por solicitud del usuario',
      date: '01/09/2024',
      time: '11:00',
      changedBy: 'Sistema automático'
    }
  ];

  const getActionIcon = (type) => {
    switch (type) {
      case 'create':
        return 'Plus';
      case 'update':
        return 'Edit';
      case 'sale':
        return 'ShoppingCart';
      case 'permission':
        return 'Shield';
      case 'report':
        return 'FileText';
      default:
        return 'Activity';
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'create':
        return 'text-success bg-success/10';
      case 'update':
        return 'text-accent bg-accent/10';
      case 'sale':
        return 'text-warning bg-warning/10';
      case 'permission':
        return 'text-primary bg-primary/10';
      case 'report':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    return status === 'success' ? 'CheckCircle' : 'XCircle';
  };

  const getStatusColor = (status) => {
    return status === 'success' ?'text-success bg-success/10' :'text-error bg-error/10';
  };

  const tabs = [
    { key: 'login', label: 'Historial de Acceso', icon: 'LogIn' },
    { key: 'actions', label: 'Acciones Recientes', icon: 'Activity' },
    { key: 'changes', label: 'Cambios del Sistema', icon: 'History' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Actividad del Usuario</h2>
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          iconSize={16}
        >
          Exportar Actividad
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.key}
            onClick={() => setActiveTab(tab?.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
              activeTab === tab?.key
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Login History Tab */}
      {activeTab === 'login' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Últimos {loginHistory?.length} intentos de acceso
            </p>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              Zona horaria: UTC-5 (Habana)
            </span>
          </div>
          
          <div className="space-y-3">
            {loginHistory?.map((login) => (
              <div
                key={login?.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(login?.status)}`}>
                    <Icon name={getStatusIcon(login?.status)} size={16} />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-foreground">
                        {login?.date} a las {login?.time}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        login?.status === 'success' ?'text-success bg-success/10' :'text-error bg-error/10'
                      }`}>
                        {login?.status === 'success' ? 'Exitoso' : 'Fallido'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                      <span>IP: {login?.ip}</span>
                      <span>•</span>
                      <span>{login?.device}</span>
                      <span>•</span>
                      <span>{login?.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Recent Actions Tab */}
      {activeTab === 'actions' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Últimas {recentActions?.length} acciones realizadas por el usuario
          </p>
          
          <div className="space-y-3">
            {recentActions?.map((action) => (
              <div
                key={action?.id}
                className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActionColor(action?.type)}`}>
                  <Icon name={getActionIcon(action?.type)} size={16} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">
                      {action?.action}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {action?.date} • {action?.time}
                    </span>
                  </div>
                  
                  <p className="text-sm text-accent mt-1">{action?.target}</p>
                  <p className="text-xs text-muted-foreground mt-1">{action?.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* System Changes Tab */}
      {activeTab === 'changes' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Cambios realizados en la cuenta del usuario
          </p>
          
          <div className="space-y-3">
            {systemChanges?.map((change) => (
              <div
                key={change?.id}
                className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Settings" size={16} className="text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">
                      {change?.change}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {change?.date} • {change?.time}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">{change?.description}</p>
                  <p className="text-xs text-accent mt-1">Realizado por: {change?.changedBy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityHistory;