import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const UserFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  totalUsers = 0,
  filteredUsers = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const roleOptions = [
    { value: '', label: 'Todos los roles' },
    { value: 'owner', label: 'Propietario' },
    { value: 'manager', label: 'Gerente' },
    { value: 'staff', label: 'Personal' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'suspended', label: 'Suspendido' }
  ];

  const warehouseOptions = [
    { value: '', label: 'Todos los almacenes' },
    { value: 'havana-central', label: 'Almacén Central Habana' },
    { value: 'santiago-norte', label: 'Almacén Norte Santiago' },
    { value: 'matanzas-sur', label: 'Almacén Sur Matanzas' },
    { value: 'villa-clara', label: 'Almacén Villa Clara' },
    { value: 'camaguey-este', label: 'Almacén Este Camagüey' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="w-full"
        >
          Filtros {hasActiveFilters && `(${Object.values(filters)?.filter(v => v !== '')?.length})`}
        </Button>
      </div>
      {/* Filter Content */}
      <div className={`space-y-4 ${!isExpanded ? 'hidden lg:block' : ''}`}>
        {/* Search Bar */}
        <div className="w-full">
          <Input
            type="search"
            placeholder="Buscar por nombre, email, cédula..."
            value={filters?.search || ''}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Rol"
            options={roleOptions}
            value={filters?.role || ''}
            onChange={(value) => handleFilterChange('role', value)}
          />

          <Select
            label="Estado"
            options={statusOptions}
            value={filters?.status || ''}
            onChange={(value) => handleFilterChange('status', value)}
          />

          <Select
            label="Almacén"
            options={warehouseOptions}
            value={filters?.warehouse || ''}
            onChange={(value) => handleFilterChange('warehouse', value)}
            searchable
          />

          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={onClearFilters}
              disabled={!hasActiveFilters}
              iconName="X"
              iconPosition="left"
              className="w-full"
            >
              Limpiar
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
          <span>
            Mostrando {filteredUsers} de {totalUsers} usuarios
          </span>
          {hasActiveFilters && (
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={16} />
              <span>Filtros activos</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFilters;