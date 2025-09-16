import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, onBack, onResetPassword, onChangeStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'inactive':
        return 'text-muted-foreground bg-muted';
      case 'suspended':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'suspended':
        return 'Suspendido';
      default:
        return 'Desconocido';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'owner':
        return 'Propietario';
      case 'manager':
        return 'Gerente';
      case 'staff':
        return 'Personal';
      default:
        return role;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={18}
          className="text-muted-foreground hover:text-foreground"
        >
          Volver a Usuarios
        </Button>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={onResetPassword}
            iconName="Key"
            iconPosition="left"
            iconSize={16}
          >
            Restablecer Contraseña
          </Button>
          
          <Button
            variant={user?.status === 'active' ? 'destructive' : 'default'}
            onClick={onChangeStatus}
            iconName={user?.status === 'active' ? 'UserX' : 'UserCheck'}
            iconPosition="left"
            iconSize={16}
          >
            {user?.status === 'active' ? 'Suspender Usuario' : 'Activar Usuario'}
          </Button>
        </div>
      </div>
      <div className="flex items-start space-x-6">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
          <Icon name="User" size={32} color="white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-semibold text-foreground">{user?.name}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user?.status)}`}>
              {getStatusLabel(user?.status)}
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} />
              <span>{user?.email}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>{getRoleLabel(user?.role)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Warehouse" size={16} />
              <span>{user?.warehouse}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} />
              <span>Último acceso: {user?.lastLogin}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;