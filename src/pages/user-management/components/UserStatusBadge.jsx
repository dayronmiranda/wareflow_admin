import React from 'react';
import Icon from '../../../components/AppIcon';

const UserStatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return {
          label: 'Activo',
          className: 'bg-success/10 text-success border-success/20',
          icon: 'CheckCircle'
        };
      case 'inactive':
        return {
          label: 'Inactivo',
          className: 'bg-muted text-muted-foreground border-border',
          icon: 'Circle'
        };
      case 'suspended':
        return {
          label: 'Suspendido',
          className: 'bg-error/10 text-error border-error/20',
          icon: 'XCircle'
        };
      default:
        return {
          label: 'Desconocido',
          className: 'bg-muted text-muted-foreground border-border',
          icon: 'HelpCircle'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config?.className}`}>
      <Icon name={config?.icon} size={12} className="mr-1" />
      {config?.label}
    </span>
  );
};

export default UserStatusBadge;