import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PurchaseHistoryTable = ({ customerId, onExportHistory }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  // Mock purchase history data
  const purchaseHistory = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      products: ['Producto A', 'Producto B'],
      category: 'Electrónicos',
      amount: 2500.00,
      status: 'completed',
      paymentMethod: 'Efectivo'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-28',
      products: ['Producto C'],
      category: 'Hogar',
      amount: 1200.50,
      status: 'completed',
      paymentMethod: 'Transferencia'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-02-10',
      products: ['Producto D', 'Producto E', 'Producto F'],
      category: 'Ropa',
      amount: 850.75,
      status: 'completed',
      paymentMethod: 'Efectivo'
    },
    {
      id: 'ORD-2024-004',
      date: '2024-02-22',
      products: ['Producto G'],
      category: 'Electrónicos',
      amount: 3200.00,
      status: 'pending',
      paymentMethod: 'Transferencia'
    },
    {
      id: 'ORD-2024-005',
      date: '2024-03-05',
      products: ['Producto H', 'Producto I'],
      category: 'Hogar',
      amount: 1800.25,
      status: 'completed',
      paymentMethod: 'Efectivo'
    },
    {
      id: 'ORD-2024-006',
      date: '2024-03-18',
      products: ['Producto J'],
      category: 'Deportes',
      amount: 650.00,
      status: 'cancelled',
      paymentMethod: 'Transferencia'
    },
    {
      id: 'ORD-2024-007',
      date: '2024-04-02',
      products: ['Producto K', 'Producto L'],
      category: 'Electrónicos',
      amount: 4100.50,
      status: 'completed',
      paymentMethod: 'Efectivo'
    },
    {
      id: 'ORD-2024-008',
      date: '2024-04-15',
      products: ['Producto M'],
      category: 'Ropa',
      amount: 320.75,
      status: 'completed',
      paymentMethod: 'Transferencia'
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { label: 'Completado', color: 'bg-success text-success-foreground' },
      pending: { label: 'Pendiente', color: 'bg-warning text-warning-foreground' },
      cancelled: { label: 'Cancelado', color: 'bg-error text-error-foreground' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getCategoryIcon = (category) => {
    const categoryIcons = {
      'Electrónicos': 'Smartphone',
      'Hogar': 'Home',
      'Ropa': 'Shirt',
      'Deportes': 'Dumbbell'
    };
    return categoryIcons?.[category] || 'Package';
  };

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = purchaseHistory?.filter(item =>
      item?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      item?.products?.some(product => product?.toLowerCase()?.includes(searchTerm?.toLowerCase())) ||
      item?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'date') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const totalAmount = filteredData?.reduce((sum, item) => sum + (item?.status === 'completed' ? item?.amount : 0), 0);

  return (
    <div className="bg-card border border-border rounded-lg card-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Historial de Compras</h3>
            <p className="text-sm text-muted-foreground">
              {filteredData?.length} transacciones • Total: {formatCurrency(totalAmount)}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar transacciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={onExportHistory}
              iconName="Download"
              iconPosition="left"
            >
              Exportar Historial
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>ID Orden</span>
                  {getSortIcon('id')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Fecha</span>
                  {getSortIcon('date')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Productos</th>
              <th className="text-left p-4 font-medium text-foreground">Categoría</th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('amount')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Monto</span>
                  {getSortIcon('amount')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Estado</th>
              <th className="text-left p-4 font-medium text-foreground">Pago</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((purchase) => (
              <tr key={purchase?.id} className="border-t border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <span className="font-mono text-sm text-foreground">{purchase?.id}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{formatDate(purchase?.date)}</span>
                </td>
                <td className="p-4">
                  <div className="max-w-48">
                    <p className="text-sm text-foreground truncate">
                      {purchase?.products?.join(', ')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {purchase?.products?.length} producto{purchase?.products?.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={getCategoryIcon(purchase?.category)} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{purchase?.category}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-semibold text-foreground">{formatCurrency(purchase?.amount)}</span>
                </td>
                <td className="p-4">
                  {getStatusBadge(purchase?.status)}
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">{purchase?.paymentMethod}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredData?.length)} de {filteredData?.length} resultados
            </p>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Anterior
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-smooth ${
                        currentPage === pageNum
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Empty State */}
      {filteredData?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="ShoppingCart" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No hay transacciones</h4>
          <p className="text-muted-foreground">
            {searchTerm ? 'No se encontraron transacciones que coincidan con tu búsqueda.' : 'Este cliente aún no ha realizado ninguna compra.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistoryTable;