import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ 
  selectedUsers = [], 
  onBulkAction, 
  onClearSelection,
  totalUsers = 0 
}) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const actionOptions = [
    { value: '', label: 'Seleccionar acción...' },
    { value: 'activate', label: 'Activar usuarios' },
    { value: 'deactivate', label: 'Desactivar usuarios' },
    { value: 'suspend', label: 'Suspender usuarios' },
    { value: 'export', label: 'Exportar seleccionados' },
    { value: 'delete', label: 'Eliminar usuarios' }
  ];

  const handleExecuteAction = async () => {
    if (!selectedAction || selectedUsers?.length === 0) return;

    setIsProcessing(true);
    try {
      await onBulkAction(selectedAction, selectedUsers);
      setSelectedAction('');
    } catch (error) {
      console.error('Error executing bulk action:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'activate': return 'UserCheck';
      case 'deactivate': return 'UserX';
      case 'suspend': return 'UserMinus';
      case 'export': return 'Download';
      case 'delete': return 'Trash2';
      default: return 'Play';
    }
  };

  const getActionVariant = (action) => {
    switch (action) {
      case 'delete': return 'destructive';
      case 'suspend': return 'warning';
      case 'export': return 'outline';
      default: return 'default';
    }
  };

  if (selectedUsers?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Selection Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedUsers?.length} de {totalUsers} usuarios seleccionados
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
            iconSize={16}
          >
            Limpiar selección
          </Button>
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none sm:w-64">
            <Select
              options={actionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Seleccionar acción..."
            />
          </div>
          
          <Button
            variant={getActionVariant(selectedAction)}
            onClick={handleExecuteAction}
            disabled={!selectedAction || isProcessing}
            loading={isProcessing}
            iconName={getActionIcon(selectedAction)}
            iconPosition="left"
            iconSize={16}
          >
            Ejecutar
          </Button>
        </div>
      </div>
      {/* Action Preview */}
      {selectedAction && (
        <div className="mt-4 p-3 bg-muted rounded-lg border-l-4 border-primary">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">
                {actionOptions?.find(opt => opt?.value === selectedAction)?.label}
              </p>
              <p className="text-muted-foreground mt-1">
                Esta acción se aplicará a {selectedUsers?.length} usuario{selectedUsers?.length !== 1 ? 's' : ''} seleccionado{selectedUsers?.length !== 1 ? 's' : ''}.
                {selectedAction === 'delete' && ' Esta acción no se puede deshacer.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;