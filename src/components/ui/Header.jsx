import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMobileMenuToggle, userRole = 'owner' }) => {
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const primaryNavItems = [
    { 
      label: 'Usuarios', 
      path: '/user-management', 
      icon: 'Users',
      roles: ['owner', 'manager']
    },
    { 
      label: 'Clientes', 
      path: '/customer-management', 
      icon: 'Building2',
      roles: ['owner', 'manager', 'staff']
    },
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: 'LayoutDashboard',
      roles: ['owner', 'manager']
    },
    { 
      label: 'Inventario', 
      path: '/inventory', 
      icon: 'Package',
      roles: ['owner', 'manager', 'staff']
    }
  ];

  const secondaryNavItems = [
    { 
      label: 'Configuración', 
      path: '/settings', 
      icon: 'Settings',
      roles: ['owner']
    },
    { 
      label: 'Reportes', 
      path: '/reports', 
      icon: 'FileText',
      roles: ['owner', 'manager']
    },
    { 
      label: 'Ayuda', 
      path: '/help', 
      icon: 'HelpCircle',
      roles: ['owner', 'manager', 'staff']
    }
  ];

  const visiblePrimaryItems = primaryNavItems?.filter(item => 
    item?.roles?.includes(userRole)
  );

  const visibleSecondaryItems = secondaryNavItems?.filter(item => 
    item?.roles?.includes(userRole)
  );

  const isActivePath = (path) => {
    return location?.pathname === path || location?.pathname?.startsWith(path + '/');
  };

  const handleNavClick = (path) => {
    window.location.href = path;
  };

  const handleMoreMenuToggle = () => {
    setShowMoreMenu(!showMoreMenu);
  };

  return (
    <header className="bg-card border-b border-border h-16 fixed top-0 left-0 right-0 z-40 sidebar-shadow">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileMenuToggle}
            className="mr-2"
          >
            <Icon name="Menu" size={24} />
          </Button>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Warehouse" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground hidden sm:block">
              WareFlow Admin
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {visiblePrimaryItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? "default" : "ghost"}
              onClick={() => handleNavClick(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={18}
              className="transition-smooth"
            >
              {item?.label}
            </Button>
          ))}

          {/* More Menu */}
          {visibleSecondaryItems?.length > 0 && (
            <div className="relative">
              <Button
                variant="ghost"
                onClick={handleMoreMenuToggle}
                iconName="MoreHorizontal"
                iconPosition="left"
                iconSize={18}
                className="transition-smooth"
              >
                Más
              </Button>

              {showMoreMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowMoreMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg modal-shadow z-50 py-2">
                    {visibleSecondaryItems?.map((item) => (
                      <button
                        key={item?.path}
                        onClick={() => {
                          handleNavClick(item?.path);
                          setShowMoreMenu(false);
                        }}
                        className={`w-full flex items-center px-4 py-2 text-sm transition-smooth hover:bg-muted ${
                          isActivePath(item?.path) 
                            ? 'text-primary bg-muted' :'text-foreground'
                        }`}
                      >
                        <Icon name={item?.icon} size={16} className="mr-3" />
                        {item?.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavClick('/user-profile')}
            className="transition-smooth"
          >
            <Icon name="User" size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;