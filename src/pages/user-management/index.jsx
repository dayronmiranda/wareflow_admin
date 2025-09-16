import React, { useState, useEffect, useMemo } from 'react';

import Button from '../../components/ui/Button';
import UserFilters from './components/UserFilters';
import UserTable from './components/UserTable';
import BulkActions from './components/BulkActions';
import UserFormModal from './components/UserFormModal';
import UserPermissionsModal from './components/UserPermissionsModal';
import UserPagination from './components/UserPagination';

const UserManagement = () => {
  // State Management
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: '',
    warehouse: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState('create');
  const [isLoading, setIsLoading] = useState(true);

  // Mock Data
  const mockUsers = [
    {
      id: 1,
      name: "Carlos Rodríguez Pérez",
      email: "carlos.rodriguez@wareflow.cu",
      cubanId: "85041512345",
      phone: "+53 5234-5678",
      role: "owner",
      status: "active",
      warehouse: "Almacén Central Habana",
      warehouseId: "havana-central",
      lastLogin: new Date(Date.now() - 3600000),
      createdAt: new Date(Date.now() - 86400000 * 30),
      permissions: {
        inventory: { view: true, create: true, edit: true, delete: true, export: true },
        sales: { view: true, create: true, edit: true, delete: true, reports: true },
        users: { view: true, create: true, edit: true, delete: true, permissions: true },
        customers: { view: true, create: true, edit: true, delete: true, export: true },
        reports: { view: true, generate: true, export: true, schedule: true },
        settings: { view: true, edit: true, system: true, backup: true }
      }
    },
    {
      id: 2,
      name: "María Elena González",
      email: "maria.gonzalez@wareflow.cu",
      cubanId: "92031687654",
      phone: "+53 5345-6789",
      role: "manager",
      status: "active",
      warehouse: "Almacén Norte Santiago",
      warehouseId: "santiago-norte",
      lastLogin: new Date(Date.now() - 7200000),
      createdAt: new Date(Date.now() - 86400000 * 25),
      permissions: {
        inventory: { view: true, create: true, edit: true, delete: false, export: true },
        sales: { view: true, create: true, edit: true, delete: false, reports: true },
        users: { view: true, create: false, edit: true, delete: false, permissions: false },
        customers: { view: true, create: true, edit: true, delete: false, export: true },
        reports: { view: true, generate: true, export: true, schedule: false },
        settings: { view: true, edit: false, system: false, backup: false }
      }
    },
    {
      id: 3,
      name: "José Antonio Martínez",
      email: "jose.martinez@wareflow.cu",
      cubanId: "88121598765",
      phone: "+53 5456-7890",
      role: "staff",
      status: "active",
      warehouse: "Almacén Sur Matanzas",
      warehouseId: "matanzas-sur",
      lastLogin: new Date(Date.now() - 14400000),
      createdAt: new Date(Date.now() - 86400000 * 20),
      permissions: {
        inventory: { view: true, create: false, edit: false, delete: false, export: false },
        sales: { view: true, create: true, edit: false, delete: false, reports: false },
        users: { view: false, create: false, edit: false, delete: false, permissions: false },
        customers: { view: true, create: true, edit: true, delete: false, export: false },
        reports: { view: false, generate: false, export: false, schedule: false },
        settings: { view: false, edit: false, system: false, backup: false }
      }
    },
    {
      id: 4,
      name: "Ana Beatriz Fernández",
      email: "ana.fernandez@wareflow.cu",
      cubanId: "95061234567",
      phone: "+53 5567-8901",
      role: "manager",
      status: "inactive",
      warehouse: "Almacén Villa Clara",
      warehouseId: "villa-clara",
      lastLogin: new Date(Date.now() - 86400000 * 3),
      createdAt: new Date(Date.now() - 86400000 * 15),
      permissions: {
        inventory: { view: true, create: true, edit: true, delete: false, export: true },
        sales: { view: true, create: true, edit: true, delete: false, reports: true },
        users: { view: true, create: false, edit: true, delete: false, permissions: false },
        customers: { view: true, create: true, edit: true, delete: false, export: true },
        reports: { view: true, generate: true, export: true, schedule: false },
        settings: { view: true, edit: false, system: false, backup: false }
      }
    },
    {
      id: 5,
      name: "Roberto Luis Herrera",
      email: "roberto.herrera@wareflow.cu",
      cubanId: "87091876543",
      phone: "+53 5678-9012",
      role: "staff",
      status: "suspended",
      warehouse: "Almacén Este Camagüey",
      warehouseId: "camaguey-este",
      lastLogin: new Date(Date.now() - 86400000 * 7),
      createdAt: new Date(Date.now() - 86400000 * 10),
      permissions: {
        inventory: { view: true, create: false, edit: false, delete: false, export: false },
        sales: { view: true, create: true, edit: false, delete: false, reports: false },
        users: { view: false, create: false, edit: false, delete: false, permissions: false },
        customers: { view: true, create: true, edit: true, delete: false, export: false },
        reports: { view: false, generate: false, export: false, schedule: false },
        settings: { view: false, edit: false, system: false, backup: false }
      }
    },
    {
      id: 6,
      name: "Carmen Rosa Díaz",
      email: "carmen.diaz@wareflow.cu",
      cubanId: "91051345678",
      phone: "+53 5789-0123",
      role: "staff",
      status: "active",
      warehouse: "Almacén Central Habana",
      warehouseId: "havana-central",
      lastLogin: new Date(Date.now() - 1800000),
      createdAt: new Date(Date.now() - 86400000 * 5),
      permissions: {
        inventory: { view: true, create: false, edit: false, delete: false, export: false },
        sales: { view: true, create: true, edit: false, delete: false, reports: false },
        users: { view: false, create: false, edit: false, delete: false, permissions: false },
        customers: { view: true, create: true, edit: true, delete: false, export: false },
        reports: { view: false, generate: false, export: false, schedule: false },
        settings: { view: false, edit: false, system: false, backup: false }
      }
    }
  ];

  // Initialize data
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
      setIsLoading(false);
    };

    loadUsers();
  }, []);

  // Filter and sort users
  const processedUsers = useMemo(() => {
    let filtered = [...users];

    // Apply filters
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(user =>
        user?.name?.toLowerCase()?.includes(searchTerm) ||
        user?.email?.toLowerCase()?.includes(searchTerm) ||
        user?.cubanId?.includes(searchTerm)
      );
    }

    if (filters?.role) {
      filtered = filtered?.filter(user => user?.role === filters?.role);
    }

    if (filters?.status) {
      filtered = filtered?.filter(user => user?.status === filters?.status);
    }

    if (filters?.warehouse) {
      filtered = filtered?.filter(user => user?.warehouseId === filters?.warehouse);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'lastLogin') {
        aValue = aValue ? new Date(aValue)?.getTime() : 0;
        bValue = bValue ? new Date(bValue)?.getTime() : 0;
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

    return filtered;
  }, [users, filters, sortConfig]);

  // Pagination
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedUsers?.slice(startIndex, startIndex + itemsPerPage);
  }, [processedUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(processedUsers?.length / itemsPerPage);

  // Event Handlers
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setSelectedUsers([]);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      role: '',
      status: '',
      warehouse: ''
    });
    setCurrentPage(1);
    setSelectedUsers([]);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleUserSelect = (userId, checked) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev?.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(paginatedUsers?.map(user => user?.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleClearSelection = () => {
    setSelectedUsers([]);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setModalMode('create');
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsUserModalOpen(true);
  };

  const handleManagePermissions = (user) => {
    setSelectedUser(user);
    setIsPermissionsModalOpen(true);
  };

  const handleToggleStatus = (user) => {
    const newStatus = user?.status === 'active' ? 'inactive' : 'active';
    setUsers(prev => prev?.map(u => 
      u?.id === user?.id ? { ...u, status: newStatus } : u
    ));
  };

  const handleViewProfile = (userId) => {
    window.location.href = `/user-profile?id=${userId}`;
  };

  const handleSaveUser = async (userData) => {
    if (modalMode === 'create') {
      const newUser = {
        ...userData,
        id: Date.now(),
        createdAt: new Date(),
        lastLogin: null,
        permissions: {
          inventory: { view: false, create: false, edit: false, delete: false, export: false },
          sales: { view: false, create: false, edit: false, delete: false, reports: false },
          users: { view: false, create: false, edit: false, delete: false, permissions: false },
          customers: { view: false, create: false, edit: false, delete: false, export: false },
          reports: { view: false, generate: false, export: false, schedule: false },
          settings: { view: false, edit: false, system: false, backup: false }
        }
      };
      setUsers(prev => [...prev, newUser]);
    } else {
      setUsers(prev => prev?.map(u => 
        u?.id === selectedUser?.id ? { ...u, ...userData } : u
      ));
    }
  };

  const handleSavePermissions = async (userData) => {
    setUsers(prev => prev?.map(u => 
      u?.id === userData?.id ? userData : u
    ));
  };

  const handleBulkAction = async (action, userIds) => {
    switch (action) {
      case 'activate':
        setUsers(prev => prev?.map(u => 
          userIds?.includes(u?.id) ? { ...u, status: 'active' } : u
        ));
        break;
      case 'deactivate':
        setUsers(prev => prev?.map(u => 
          userIds?.includes(u?.id) ? { ...u, status: 'inactive' } : u
        ));
        break;
      case 'suspend':
        setUsers(prev => prev?.map(u => 
          userIds?.includes(u?.id) ? { ...u, status: 'suspended' } : u
        ));
        break;
      case 'delete':
        setUsers(prev => prev?.filter(u => !userIds?.includes(u?.id)));
        break;
      case 'export':
        console.log('Exporting users:', userIds);
        break;
    }
    setSelectedUsers([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedUsers([]);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setSelectedUsers([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-96">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="text-muted-foreground">Cargando usuarios...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Usuarios</h1>
            <p className="text-muted-foreground mt-2">
              Administre los usuarios del sistema con control de roles y permisos
            </p>
          </div>
          <Button
            variant="default"
            onClick={handleCreateUser}
            iconName="UserPlus"
            iconPosition="left"
            size="lg"
          >
            Crear Usuario
          </Button>
        </div>

        {/* Filters */}
        <UserFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
          totalUsers={users?.length}
          filteredUsers={processedUsers?.length}
        />

        {/* Bulk Actions */}
        <BulkActions
          selectedUsers={selectedUsers}
          onBulkAction={handleBulkAction}
          onClearSelection={handleClearSelection}
          totalUsers={processedUsers?.length}
        />

        {/* Users Table */}
        <UserTable
          users={paginatedUsers}
          selectedUsers={selectedUsers}
          onUserSelect={handleUserSelect}
          onSelectAll={handleSelectAll}
          onSort={handleSort}
          sortConfig={sortConfig}
          onEditUser={handleEditUser}
          onToggleStatus={handleToggleStatus}
          onManagePermissions={handleManagePermissions}
          onViewProfile={handleViewProfile}
        />

        {/* Pagination */}
        <div className="mt-6">
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={processedUsers?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>

        {/* Modals */}
        <UserFormModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          onSave={handleSaveUser}
          user={selectedUser}
          mode={modalMode}
        />

        <UserPermissionsModal
          isOpen={isPermissionsModalOpen}
          onClose={() => setIsPermissionsModalOpen(false)}
          onSave={handleSavePermissions}
          user={selectedUser}
        />
      </div>
    </div>
  );
};

export default UserManagement;