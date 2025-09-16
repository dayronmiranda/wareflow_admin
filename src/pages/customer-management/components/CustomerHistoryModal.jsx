import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerHistoryModal = ({ 
  isOpen, 
  onClose, 
  customer 
}) => {
  if (!isOpen || !customer) return null;

  const mockPurchaseHistory = [
    {
      id: 1,
      date: '2025-01-15',
      amount: 2500.00,
      items: 15,
      status: 'completed',
      invoice: 'INV-2025-001'
    },
    {
      id: 2,
      date: '2025-01-08',
      amount: 1800.50,
      items: 8,
      status: 'completed',
      invoice: 'INV-2025-002'
    },
    {
      id: 3,
      date: '2024-12-22',
      amount: 3200.75,
      items: 22,
      status: 'completed',
      invoice: 'INV-2024-156'
    },
    {
      id: 4,
      date: '2024-12-15',
      amount: 950.00,
      items: 5,
      status: 'refunded',
      invoice: 'INV-2024-145'
    },
    {
      id: 5,
      date: '2024-11-28',
      amount: 4100.25,
      items: 18,
      status: 'completed',
      invoice: 'INV-2024-132'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CU', {
      style: 'currency',
      currency: 'CUP',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-CU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'refunded': return 'bg-warning text-warning-foreground';
      case 'cancelled': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'Completada';
      case 'refunded': return 'Reembolsada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const totalPurchases = mockPurchaseHistory?.length;
  const totalSpent = mockPurchaseHistory?.filter(purchase => purchase?.status === 'completed')?.reduce((sum, purchase) => sum + purchase?.amount, 0);
  const averageOrder = totalSpent / mockPurchaseHistory?.filter(p => p?.status === 'completed')?.length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto modal-shadow">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Historial de Compras
            </h2>
            <p className="text-muted-foreground mt-1">
              {customer?.name} - {customer?.email}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Customer Summary */}
        <div className="p-6 border-b border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="ShoppingCart" size={20} className="text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Total Compras</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{totalPurchases}</p>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="DollarSign" size={20} className="text-success" />
                <span className="text-sm font-medium text-muted-foreground">Total Gastado</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(totalSpent)}</p>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={20} className="text-accent" />
                <span className="text-sm font-medium text-muted-foreground">Promedio por Orden</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(averageOrder)}</p>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Calendar" size={20} className="text-warning" />
                <span className="text-sm font-medium text-muted-foreground">Última Compra</span>
              </div>
              <p className="text-lg font-bold text-foreground">
                {formatDate(customer?.lastPurchase)}
              </p>
            </div>
          </div>
        </div>

        {/* Purchase History Table */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Historial Detallado</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-foreground">Fecha</th>
                  <th className="text-left p-4 font-medium text-foreground">Factura</th>
                  <th className="text-left p-4 font-medium text-foreground">Artículos</th>
                  <th className="text-left p-4 font-medium text-foreground">Monto</th>
                  <th className="text-left p-4 font-medium text-foreground">Estado</th>
                  <th className="text-center p-4 font-medium text-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mockPurchaseHistory?.map((purchase) => (
                  <tr key={purchase?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                    <td className="p-4 text-foreground">{formatDate(purchase?.date)}</td>
                    <td className="p-4">
                      <span className="font-mono text-sm text-foreground">{purchase?.invoice}</span>
                    </td>
                    <td className="p-4 text-foreground">{purchase?.items} artículos</td>
                    <td className="p-4 font-medium text-foreground">{formatCurrency(purchase?.amount)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(purchase?.status)}`}>
                        {getStatusLabel(purchase?.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => console.log('View invoice:', purchase?.invoice)}
                        >
                          <Icon name="Eye" size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => console.log('Download invoice:', purchase?.invoice)}
                        >
                          <Icon name="Download" size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={() => console.log('Export history for:', customer?.name)}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Exportar Historial
          </Button>
          <Button
            variant="default"
            onClick={onClose}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerHistoryModal;