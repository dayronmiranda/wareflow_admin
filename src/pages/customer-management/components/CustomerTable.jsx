import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerTable = ({ 
  customers, 
  selectedCustomers, 
  onSelectCustomer, 
  onSelectAll, 
  onSort, 
  sortConfig, 
  onEdit, 
  onViewHistory, 
  onStatusChange 
}) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (customerId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(customerId)) {
      newExpanded?.delete(customerId);
    } else {
      newExpanded?.add(customerId);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'inactive': return 'bg-warning text-warning-foreground';
      case 'blocked': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSegmentBadgeColor = (segment) => {
    switch (segment) {
      case 'frequent': return 'bg-primary text-primary-foreground';
      case 'occasional': return 'bg-accent text-accent-foreground';
      case 'new': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CU', {
      style: 'currency',
      currency: 'CUP',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-CU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="text-primary" />
      : <Icon name="ArrowDown" size={16} className="text-primary" />;
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedCustomers?.length === customers?.length && customers?.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th 
                className="text-left p-4 font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => onSort('name')}
              >
                <div className="flex items-center space-x-2">
                  <span>Nombre</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th 
                className="text-left p-4 font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => onSort('email')}
              >
                <div className="flex items-center space-x-2">
                  <span>Email</span>
                  {getSortIcon('email')}
                </div>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Teléfono</th>
              <th 
                className="text-left p-4 font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => onSort('segment')}
              >
                <div className="flex items-center space-x-2">
                  <span>Segmento</span>
                  {getSortIcon('segment')}
                </div>
              </th>
              <th 
                className="text-left p-4 font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => onSort('status')}
              >
                <div className="flex items-center space-x-2">
                  <span>Estado</span>
                  {getSortIcon('status')}
                </div>
              </th>
              <th 
                className="text-left p-4 font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => onSort('totalSpent')}
              >
                <div className="flex items-center space-x-2">
                  <span>Total Gastado</span>
                  {getSortIcon('totalSpent')}
                </div>
              </th>
              <th 
                className="text-left p-4 font-medium text-foreground cursor-pointer hover:bg-muted/70 transition-smooth"
                onClick={() => onSort('lastPurchase')}
              >
                <div className="flex items-center space-x-2">
                  <span>Última Compra</span>
                  {getSortIcon('lastPurchase')}
                </div>
              </th>
              <th className="text-center p-4 font-medium text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer) => (
              <tr key={customer?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedCustomers?.includes(customer?.id)}
                    onChange={() => onSelectCustomer(customer?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">{customer?.name}</div>
                  <div className="text-sm text-muted-foreground">{customer?.cedula}</div>
                </td>
                <td className="p-4 text-foreground">{customer?.email}</td>
                <td className="p-4 text-foreground">{customer?.phone}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSegmentBadgeColor(customer?.segment)}`}>
                    {customer?.segment === 'frequent' ? 'Frecuente' : 
                     customer?.segment === 'occasional' ? 'Ocasional' : 'Nuevo'}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(customer?.status)}`}>
                    {customer?.status === 'active' ? 'Activo' : 
                     customer?.status === 'inactive' ? 'Inactivo' : 'Bloqueado'}
                  </span>
                </td>
                <td className="p-4 font-medium text-foreground">{formatCurrency(customer?.totalSpent)}</td>
                <td className="p-4 text-foreground">{formatDate(customer?.lastPurchase)}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(customer)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewHistory(customer)}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onStatusChange(customer)}
                      className="h-8 w-8"
                    >
                      <Icon name="Settings" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden">
        {customers?.map((customer) => (
          <div key={customer?.id} className="border-b border-border last:border-b-0">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedCustomers?.includes(customer?.id)}
                    onChange={() => onSelectCustomer(customer?.id)}
                    className="mt-1 rounded border-border"
                  />
                  <div>
                    <h3 className="font-medium text-foreground">{customer?.name}</h3>
                    <p className="text-sm text-muted-foreground">{customer?.email}</p>
                    <p className="text-sm text-muted-foreground">{customer?.phone}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleRowExpansion(customer?.id)}
                  className="h-8 w-8"
                >
                  <Icon 
                    name={expandedRows?.has(customer?.id) ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                  />
                </Button>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSegmentBadgeColor(customer?.segment)}`}>
                    {customer?.segment === 'frequent' ? 'Frecuente' : 
                     customer?.segment === 'occasional' ? 'Ocasional' : 'Nuevo'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(customer?.status)}`}>
                    {customer?.status === 'active' ? 'Activo' : 
                     customer?.status === 'inactive' ? 'Inactivo' : 'Bloqueado'}
                  </span>
                </div>
              </div>

              {expandedRows?.has(customer?.id) && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Gastado</p>
                      <p className="font-medium text-foreground">{formatCurrency(customer?.totalSpent)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Última Compra</p>
                      <p className="font-medium text-foreground">{formatDate(customer?.lastPurchase)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(customer)}
                      iconName="Edit"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewHistory(customer)}
                      iconName="Eye"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Historial
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerTable;