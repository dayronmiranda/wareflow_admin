import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomerFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  onExport 
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const segmentOptions = [
    { value: '', label: 'Todos los segmentos' },
    { value: 'frequent', label: 'Frecuente' },
    { value: 'occasional', label: 'Ocasional' },
    { value: 'new', label: 'Nuevo' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'blocked', label: 'Bloqueado' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value !== '' && value !== null && value !== undefined
  );

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      {/* Main Search and Quick Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Buscar por nombre, email, teléfono o cédula..."
            value={filters?.search || ''}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            iconName="Filter"
            iconPosition="left"
            iconSize={16}
          >
            Filtros Avanzados
          </Button>

          <Button
            variant="outline"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Exportar
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Limpiar
            </Button>
          )}
        </div>
      </div>
      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Segmento:</span>
          {segmentOptions?.slice(1)?.map((option) => (
            <Button
              key={option?.value}
              variant={filters?.segment === option?.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange('segment', 
                filters?.segment === option?.value ? '' : option?.value
              )}
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Estado:</span>
          {statusOptions?.slice(1)?.map((option) => (
            <Button
              key={option?.value}
              variant={filters?.status === option?.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange('status', 
                filters?.status === option?.value ? '' : option?.value
              )}
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-lg font-medium text-foreground mb-4">Filtros Avanzados</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Segment Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Segmento de Cliente
              </label>
              <select
                value={filters?.segment || ''}
                onChange={(e) => handleFilterChange('segment', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {segmentOptions?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Estado del Cliente
              </label>
              <select
                value={filters?.status || ''}
                onChange={(e) => handleFilterChange('status', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {statusOptions?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Amount Filter */}
            <div>
              <Input
                type="number"
                label="Gasto Mínimo (CUP)"
                placeholder="0.00"
                value={filters?.minAmount || ''}
                onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
              />
            </div>

            {/* Max Amount Filter */}
            <div>
              <Input
                type="number"
                label="Gasto Máximo (CUP)"
                placeholder="10000.00"
                value={filters?.maxAmount || ''}
                onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
              />
            </div>

            {/* Date Range Filters */}
            <div>
              <Input
                type="date"
                label="Última Compra Desde"
                value={filters?.dateFrom || ''}
                onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
              />
            </div>

            <div>
              <Input
                type="date"
                label="Última Compra Hasta"
                value={filters?.dateTo || ''}
                onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-end space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={onClearFilters}
            >
              Limpiar Filtros
            </Button>
            <Button
              variant="default"
              onClick={() => setShowAdvancedFilters(false)}
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerFilters;