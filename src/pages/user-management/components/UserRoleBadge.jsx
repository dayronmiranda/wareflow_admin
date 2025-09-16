import React from 'react';
import Icon from '../../../components/AppIcon';

const UserRoleBadge = ({ role }) => {
  const getRoleConfig = (role) => {
    switch (role) {
      case 'owner':
        return {
          label: 'Propietario',
          className: 'bg-primary/10 text-primary border-primary/20',
          icon: 'Crown'
        };
      case 'manager':
        return {
          label: 'Gerente',
          className: 'bg-accent/10 text-accent border-accent/20',
          icon: 'Shield'
        };
      case 'staff':
        return {
          label: 'Personal',
          className: 'bg-secondary/10 text-secondary border-secondary/20',
          icon: 'User'
        };
      default:
        return {
          label: 'Sin Rol',
          className: 'bg-muted text-muted-foreground border-border',
          icon: 'HelpCircle'
        };
    }
  };

  const config = getRoleConfig(role);

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config?.className}`}>
      <Icon name={config?.icon} size={12} className="mr-1" />
      {config?.label}
    </span>
  );
};

export default UserRoleBadge;