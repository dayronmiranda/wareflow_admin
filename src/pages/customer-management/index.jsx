import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';

import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CustomerTable from './components/CustomerTable';
import CustomerFilters from './components/CustomerFilters';
import CustomerModal from './components/CustomerModal';
import BulkActionsBar from './components/BulkActionsBar';
import CustomerHistoryModal from './components/CustomerHistoryModal';
import CustomerStats from './components/CustomerStats';

const CustomerManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [filters, setFilters] = useState({
    search: '',
    segment: '',
    status: '',
    minAmount: '',
    maxAmount: '',
    dateFrom: '',
    dateTo: ''
  });

  // Mock customer data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "María Elena González",
      email: "maria.gonzalez@email.cu",
      phone: "+53 5234-5678",
      cedula: "85041512345",
      address: "Calle 23 #456, Vedado, La Habana",
      segment: "frequent",
      status: "active",
      totalSpent: 15750.50,
      lastPurchase: "2025-01-15",
      createdAt: "2024-03-15",
      updatedAt: "2025-01-15"
    },
    {
      id: 2,
      name: "Carlos Alberto Rodríguez",
      email: "carlos.rodriguez@correo.cu",
      phone: "+53 5345-6789",
      cedula: "79082398765",
      address: "Ave. 26 #123, Nuevo Vedado, La Habana",
      segment: "occasional",
      status: "active",
      totalSpent: 8920.25,
      lastPurchase: "2025-01-12",
      createdAt: "2024-05-20",
      updatedAt: "2025-01-12"
    },
    {
      id: 3,
      name: "Ana Beatriz Fernández",
      email: "ana.fernandez@gmail.com",
      phone: "+53 5456-7890",
      cedula: "92051876543",
      address: "Calle L #789, Vedado, La Habana",
      segment: "new",
      status: "active",
      totalSpent: 2340.00,
      lastPurchase: "2025-01-10",
      createdAt: "2025-01-05",
      updatedAt: "2025-01-10"
    },
    {
      id: 4,
      name: "Roberto Luis Martínez",
      email: "roberto.martinez@empresa.cu",
      phone: "+53 5567-8901",
      cedula: "86071234567",
      address: "Calle 17 #234, Vedado, La Habana",
      segment: "frequent",
      status: "inactive",
      totalSpent: 22150.75,
      lastPurchase: "2024-12-28",
      createdAt: "2023-08-10",
      updatedAt: "2024-12-28"
    },
    {
      id: 5,
      name: "Yolanda Pérez Sánchez",
      email: "yolanda.perez@correo.cu",
      phone: "+53 5678-9012",
      cedula: "88031987654",
      address: "Ave. Paseo #567, Vedado, La Habana",
      segment: "occasional",
      status: "blocked",
      totalSpent: 5680.30,
      lastPurchase: "2024-11-15",
      createdAt: "2024-02-14",
      updatedAt: "2024-11-20"
    },
    {
      id: 6,
      name: "Jorge Manuel Díaz",
      email: "jorge.diaz@email.cu",
      phone: "+53 5789-0123",
      cedula: "91041567890",
      address: "Calle G #890, Vedado, La Habana",
      segment: "new",
      status: "active",
      totalSpent: 1250.00,
      lastPurchase: "2025-01-08",
      createdAt: "2025-01-02",
      updatedAt: "2025-01-08"
    },
    {
      id: 7,
      name: "Carmen Rosa López",
      email: "carmen.lopez@correo.cu",
      phone: "+53 5890-1234",
      cedula: "84061345678",
      address: "Calle 21 #345, Vedado, La Habana",
      segment: "frequent",
      status: "active",
      totalSpent: 18920.40,
      lastPurchase: "2025-01-14",
      createdAt: "2023-11-22",
      updatedAt: "2025-01-14"
    },
    {
      id: 8,
      name: "Pedro Antonio García",
      email: "pedro.garcia@empresa.cu",
      phone: "+53 5901-2345",
      cedula: "87051876543",
      address: "Ave. 23 #678, Nuevo Vedado, La Habana",
      segment: "occasional",
      status: "active",
      totalSpent: 6750.80,
      lastPurchase: "2025-01-11",
      createdAt: "2024-07-18",
      updatedAt: "2025-01-11"
    }
  ]);

  // Filter and sort customers
  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers?.filter(customer => {
      const matchesSearch = !filters?.search || 
        customer?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        customer?.email?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        customer?.phone?.includes(filters?.search) ||
        customer?.cedula?.includes(filters?.search);

      const matchesSegment = !filters?.segment || customer?.segment === filters?.segment;
      const matchesStatus = !filters?.status || customer?.status === filters?.status;

      const matchesMinAmount = !filters?.minAmount || customer?.totalSpent >= parseFloat(filters?.minAmount);
      const matchesMaxAmount = !filters?.maxAmount || customer?.totalSpent <= parseFloat(filters?.maxAmount);

      const matchesDateFrom = !filters?.dateFrom || 
        new Date(customer.lastPurchase) >= new Date(filters.dateFrom);
      const matchesDateTo = !filters?.dateTo || 
        new Date(customer.lastPurchase) <= new Date(filters.dateTo);

      return matchesSearch && matchesSegment && matchesStatus && 
             matchesMinAmount && matchesMaxAmount && matchesDateFrom && matchesDateTo;
    });

    // Sort customers
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'totalSpent') {
          aValue = parseFloat(aValue) || 0;
          bValue = parseFloat(bValue) || 0;
        } else if (sortConfig?.key === 'lastPurchase') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
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
  }, [customers, filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCustomers?.length / itemsPerPage);
  const paginatedCustomers = filteredAndSortedCustomers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomers(prev => 
      prev?.includes(customerId)
        ? prev?.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCustomers(
      selectedCustomers?.length === paginatedCustomers?.length 
        ? [] 
        : paginatedCustomers?.map(customer => customer?.id)
    );
  };

  const handleCreateCustomer = () => {
    setSelectedCustomer(null);
    setShowCustomerModal(true);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const handleViewHistory = (customer) => {
    setSelectedCustomer(customer);
    setShowHistoryModal(true);
  };

  const handleSaveCustomer = (customerData) => {
    if (selectedCustomer) {
      // Update existing customer
      setCustomers(prev => prev?.map(customer => 
        customer?.id === selectedCustomer?.id ? customerData : customer
      ));
    } else {
      // Create new customer
      setCustomers(prev => [...prev, customerData]);
    }
    setShowCustomerModal(false);
    setSelectedCustomer(null);
  };

  const handleBulkStatusChange = (status) => {
    setCustomers(prev => prev?.map(customer => 
      selectedCustomers?.includes(customer?.id) 
        ? { ...customer, status, updatedAt: new Date()?.toISOString() }
        : customer
    ));
    setSelectedCustomers([]);
  };

  const handleBulkSegmentChange = (segment) => {
    setCustomers(prev => prev?.map(customer => 
      selectedCustomers?.includes(customer?.id) 
        ? { ...customer, segment, updatedAt: new Date()?.toISOString() }
        : customer
    ));
    setSelectedCustomers([]);
  };

  const handleBulkExport = () => {
    const selectedData = customers?.filter(customer => 
      selectedCustomers?.includes(customer?.id)
    );
    console.log('Exporting customers:', selectedData);
    // Implement export logic here
  };

  const handleBulkDelete = () => {
    if (window.confirm(`¿Está seguro de que desea eliminar ${selectedCustomers?.length} cliente(s)?`)) {
      setCustomers(prev => prev?.filter(customer => 
        !selectedCustomers?.includes(customer?.id)
      ));
      setSelectedCustomers([]);
    }
  };

  const handleExport = () => {
    console.log('Exporting filtered customers:', filteredAndSortedCustomers);
    // Implement export logic here
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      segment: '',
      status: '',
      minAmount: '',
      maxAmount: '',
      dateFrom: '',
      dateTo: ''
    });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Gestión de Clientes - WareFlow Admin</title>
        <meta name="description" content="Sistema de gestión de clientes con segmentación avanzada y seguimiento de historial de compras" />
      </Helmet>
      <Header onMobileMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-sidebar'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Gestión de Clientes
              </h1>
              <p className="text-muted-foreground">
                Administre sus clientes con segmentación avanzada y seguimiento de compras
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={handleExport}
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Exportar Todo
              </Button>
              <Button
                variant="default"
                onClick={handleCreateCustomer}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Crear Cliente
              </Button>
            </div>
          </div>

          {/* Customer Statistics */}
          <CustomerStats customers={customers} />

          {/* Filters */}
          <CustomerFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
            onExport={handleExport}
          />

          {/* Bulk Actions */}
          <BulkActionsBar
            selectedCount={selectedCustomers?.length}
            onBulkStatusChange={handleBulkStatusChange}
            onBulkSegmentChange={handleBulkSegmentChange}
            onBulkExport={handleBulkExport}
            onBulkDelete={handleBulkDelete}
            onClearSelection={() => setSelectedCustomers([])}
          />

          {/* Customer Table */}
          <CustomerTable
            customers={paginatedCustomers}
            selectedCustomers={selectedCustomers}
            onSelectCustomer={handleSelectCustomer}
            onSelectAll={handleSelectAll}
            onSort={handleSort}
            sortConfig={sortConfig}
            onEdit={handleEditCustomer}
            onViewHistory={handleViewHistory}
            onStatusChange={(customer) => {
              // Handle individual status change
              console.log('Change status for:', customer?.name);
            }}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredAndSortedCustomers?.length)} de {filteredAndSortedCustomers?.length} clientes
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  iconName="ChevronLeft"
                  iconPosition="left"
                  iconSize={16}
                >
                  Anterior
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-10"
                      >
                        {page}
                      </Button>
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
                  iconSize={16}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Modals */}
      <CustomerModal
        isOpen={showCustomerModal}
        onClose={() => {
          setShowCustomerModal(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
        onSave={handleSaveCustomer}
      />
      <CustomerHistoryModal
        isOpen={showHistoryModal}
        onClose={() => {
          setShowHistoryModal(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default CustomerManagement;