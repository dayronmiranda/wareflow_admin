import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle, userRole = 'owner', currentUser = null }) => {
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: 'LayoutDashboard',
      roles: ['owner', 'manager'],
      tooltip: 'Panel de control principal'
    },
    { 
      label: 'Usuarios', 
      path: '/user-management', 
      icon: 'Users',
      roles: ['owner', 'manager'],
      tooltip: 'Gestión de usuarios del sistema'
    },
    { 
      label: 'Clientes', 
      path: '/customer-management', 
      icon: 'Building2',
      roles: ['owner', 'manager', 'staff'],
      tooltip: 'Administración de clientes'
    },
    { 
      label: 'Inventario', 
      path: '/inventory', 
      icon: 'Package',
      roles: ['owner', 'manager', 'staff'],
      tooltip: 'Control de inventario'
    },
    { 
      label: 'Reportes', 
      path: '/reports', 
      icon: 'FileText',
      roles: ['owner', 'manager'],
      tooltip: 'Informes y análisis'
    },
    { 
      label: 'Configuración', 
      path: '/settings', 
      icon: 'Settings',
      roles: ['owner'],
      tooltip: 'Configuración del sistema'
    }
  ];

  const visibleItems = navigationItems?.filter(item => 
    item?.roles?.includes(userRole)
  );

  const isActivePath = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path + '/');
  };

  const handleNavClick = (path) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    window.location.href = '/login';
  };

  const getUserRoleLabel = (role) => {
    const roleLabels = {
      owner: 'Propietario',
      manager: 'Gerente',
      staff: 'Personal'
    };
    return roleLabels?.[role] || role;
  };

  return (
    <aside className={`bg-card border-r border-border h-screen fixed left-0 top-0 z-40 sidebar-shadow transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-sidebar'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Warehouse" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">WareFlow</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <Icon name="Warehouse" size={20} color="white" />
            </div>
          )}
          
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="transition-smooth"
            >
              <Icon name="PanelLeftClose" size={18} />
            </Button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {visibleItems?.map((item) => (
            <div key={item?.path} className="relative group">
              <Button
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                onClick={() => handleNavClick(item?.path)}
                className={`w-full justify-start transition-smooth ${
                  isCollapsed ? 'px-3' : 'px-4'
                }`}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={20}
              >
                {!isCollapsed && (
                  <span className="ml-3">{item?.label}</span>
                )}
              </Button>
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-60">
                  {item?.label}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover border-l border-t border-border rotate-45"></div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Expand Button for Collapsed State */}
        {isCollapsed && (
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="w-full transition-smooth"
            >
              <Icon name="PanelLeftOpen" size={18} />
            </Button>
          </div>
        )}

        {/* User Session Info */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-smooth"
              >
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">
                    {currentUser?.name || 'Usuario Admin'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {getUserRoleLabel(userRole)}
                  </p>
                </div>
                <Icon 
                  name={showUserMenu ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground"
                />
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-popover border border-border rounded-lg modal-shadow z-50 py-2">
                    <button
                      onClick={() => {
                        handleNavClick('/user-profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name="User" size={16} className="mr-3" />
                      Mi Perfil
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick('/settings');
                        setShowUserMenu(false);
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
          </div>
        )}

        {/* Collapsed User Info */}
        {isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="relative group">
              <button
                onClick={() => handleNavClick('/user-profile')}
                className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mx-auto hover:bg-secondary/80 transition-smooth"
              >
                <Icon name="User" size={16} color="white" />
              </button>
              
              {/* User Tooltip */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-60">
                {currentUser?.name || 'Usuario Admin'}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover border-l border-t border-border rotate-45"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;