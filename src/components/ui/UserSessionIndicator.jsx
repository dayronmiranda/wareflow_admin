import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UserSessionIndicator = ({ 
  currentUser = null, 
  userRole = 'owner', 
  onLogout,
  onProfileClick,
  className = "" 
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getUserRoleLabel = (role) => {
    const roleLabels = {
      owner: 'Propietario',
      manager: 'Gerente', 
      staff: 'Personal'
    };
    return roleLabels?.[role] || role;
  };

  const handleLogout = () => {
    setShowMenu(false);
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/login';
    }
  };

  const handleProfileClick = () => {
    setShowMenu(false);
    if (onProfileClick) {
      onProfileClick();
    } else {
      window.location.href = '/user-profile';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-2 transition-smooth"
      >
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
          <Icon name="User" size={16} color="white" />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-foreground">
            {currentUser?.name || 'Usuario Admin'}
          </p>
          <p className="text-xs text-muted-foreground">
            {getUserRoleLabel(userRole)}
          </p>
        </div>
        <Icon 
          name={showMenu ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground hidden sm:block"
        />
      </Button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg modal-shadow z-50 py-2">
            <div className="px-4 py-2 border-b border-border sm:hidden">
              <p className="text-sm font-medium text-foreground">
                {currentUser?.name || 'Usuario Admin'}
              </p>
              <p className="text-xs text-muted-foreground">
                {getUserRoleLabel(userRole)}
              </p>
            </div>
            
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
            >
              <Icon name="User" size={16} className="mr-3" />
              Mi Perfil
            </button>
            
            <button
              onClick={() => {
                setShowMenu(false);
                window.location.href = '/settings';
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
            >
              <Icon name="Settings" size={16} className="mr-3" />
              Configuración
            </button>
            
            <hr className="my-2 border-border" />
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-error hover:bg-muted transition-smooth"
            >
              <Icon name="LogOut" size={16} className="mr-3" />
              Cerrar Sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSessionIndicator;