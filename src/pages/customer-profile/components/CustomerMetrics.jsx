import React from 'react';
import Icon from '../../../components/AppIcon';

const CustomerMetrics = ({ customer }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CU', {
      style: 'currency',
      currency: 'CUP',
      minimumFractionDigits: 2
    })?.format(amount || 0);
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

  const calculateDaysSinceLastPurchase = (lastPurchaseDate) => {
    if (!lastPurchaseDate) return null;
    const today = new Date();
    const lastPurchase = new Date(lastPurchaseDate);
    const diffTime = Math.abs(today - lastPurchase);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getActivityStatus = (daysSince) => {
    if (daysSince === null) return { label: 'Sin compras', color: 'text-muted-foreground', bg: 'bg-muted' };
    if (daysSince <= 30) return { label: 'Muy activo', color: 'text-success', bg: 'bg-success/10' };
    if (daysSince <= 90) return { label: 'Activo', color: 'text-primary', bg: 'bg-primary/10' };
    if (daysSince <= 180) return { label: 'Moderado', color: 'text-warning', bg: 'bg-warning/10' };
    return { label: 'Inactivo', color: 'text-error', bg: 'bg-error/10' };
  };

  const daysSinceLastPurchase = calculateDaysSinceLastPurchase(customer?.lastPurchaseDate);
  const activityStatus = getActivityStatus(daysSinceLastPurchase);

  const metrics = [
    {
      label: 'Total Gastado',
      value: formatCurrency(customer?.totalSpent || 0),
      icon: 'DollarSign',
      color: 'text-success',
      bg: 'bg-success/10'
    },
    {
      label: 'Valor Promedio de Orden',
      value: formatCurrency(customer?.averageOrderValue || 0),
      icon: 'TrendingUp',
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      label: 'Total de Órdenes',
      value: customer?.totalOrders || 0,
      icon: 'ShoppingCart',
      color: 'text-accent',
      bg: 'bg-accent/10'
    },
    {
      label: 'Última Compra',
      value: formatDate(customer?.lastPurchaseDate),
      icon: 'Calendar',
      color: 'text-secondary',
      bg: 'bg-secondary/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg card-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Métricas del Cliente</h3>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${activityStatus?.color} ${activityStatus?.bg}`}>
            {activityStatus?.label}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics?.map((metric, index) => (
            <div key={index} className="bg-background border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${metric?.bg}`}>
                  <Icon name={metric?.icon} size={16} className={metric?.color} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground mb-1">
                  {metric?.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {metric?.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Activity Information */}
        {daysSinceLastPurchase !== null && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Última actividad hace {daysSinceLastPurchase} días
              </span>
            </div>
          </div>
        )}

        {/* Customer Lifetime Value Indicator */}
        <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                Valor de Vida del Cliente
              </span>
            </div>
            <span className="text-lg font-bold text-primary">
              {formatCurrency((customer?.totalSpent || 0) * 1.2)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Proyección basada en el historial de compras
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerMetrics;