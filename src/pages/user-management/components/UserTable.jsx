import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import UserStatusBadge from './UserStatusBadge';
import UserRoleBadge from './UserRoleBadge';

const UserTable = ({ 
  users = [], 
  selectedUsers = [], 
  onUserSelect, 
  onSelectAll, 
  onSort, 
  sortConfig, 
  onEditUser, 
  onToggleStatus, 
  onManagePermissions,
  onViewProfile 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const formatDate = (date) => {
    if (!date) return 'Nunca';
    return new Intl.DateTimeFormat('es-CU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleSort = (column) => {
    onSort(column);
  };

  const isAllSelected = users?.length > 0 && selectedUsers?.length === users?.length;
  const isIndeterminate = selectedUsers?.length > 0 && selectedUsers?.length < users?.length;

  if (users?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No hay usuarios</h3>
        <p className="text-muted-foreground">
          No se encontraron usuarios que coincidan con los filtros aplicados.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Usuario</span>
                  <Icon name={getSortIcon('name')} size={16} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('role')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Rol</span>
                  <Icon name={getSortIcon('role')} size={16} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Estado</span>
                  <Icon name={getSortIcon('status')} size={16} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('warehouse')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Almacén</span>
                  <Icon name={getSortIcon('warehouse')} size={16} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('lastLogin')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Último Acceso</span>
                  <Icon name={getSortIcon('lastLogin')} size={16} />
                </button>
              </th>
              <th className="w-32 p-4 text-center">
                <span className="text-sm font-medium text-foreground">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user?.id}
                className={`border-b border-border hover:bg-muted/50 transition-smooth ${
                  selectedUsers?.includes(user?.id) ? 'bg-muted/30' : ''
                }`}
                onMouseEnter={() => setHoveredRow(user?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="p-4">
                  <Checkbox
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={(e) => onUserSelect(user?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} color="white" />
                    </div>
                    <div>
                      <button
                        onClick={() => onViewProfile(user?.id)}
                        className="font-medium text-foreground hover:text-primary transition-smooth"
                      >
                        {user?.name}
                      </button>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                      <p className="text-xs text-muted-foreground">CI: {user?.cubanId}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <UserRoleBadge role={user?.role} />
                </td>
                <td className="p-4">
                  <UserStatusBadge status={user?.status} />
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{user?.warehouse}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(user?.lastLogin)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditUser(user)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onManagePermissions(user)}
                      className="h-8 w-8"
                    >
                      <Icon name="Shield" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onToggleStatus(user)}
                      className="h-8 w-8"
                    >
                      <Icon name={user?.status === 'active' ? 'UserX' : 'UserCheck'} size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {users?.map((user) => (
          <div
            key={user?.id}
            className={`border border-border rounded-lg p-4 transition-smooth ${
              selectedUsers?.includes(user?.id) ? 'bg-muted/30 border-primary' : 'hover:border-muted-foreground'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedUsers?.includes(user?.id)}
                  onChange={(e) => onUserSelect(user?.id, e?.target?.checked)}
                />
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div>
                  <button
                    onClick={() => onViewProfile(user?.id)}
                    className="font-medium text-foreground hover:text-primary transition-smooth"
                  >
                    {user?.name}
                  </button>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditUser(user)}
                  className="h-8 w-8"
                >
                  <Icon name="Edit" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleStatus(user)}
                  className="h-8 w-8"
                >
                  <Icon name={user?.status === 'active' ? 'UserX' : 'UserCheck'} size={16} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Rol:</span>
                <div className="mt-1">
                  <UserRoleBadge role={user?.role} />
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Estado:</span>
                <div className="mt-1">
                  <UserStatusBadge status={user?.status} />
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Almacén:</span>
                <p className="text-foreground mt-1">{user?.warehouse}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Último Acceso:</span>
                <p className="text-foreground mt-1">{formatDate(user?.lastLogin)}</p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">CI: {user?.cubanId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;