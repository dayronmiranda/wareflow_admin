import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CustomerActions = ({ customer, onSegmentChange, onStatusChange, onDeleteCustomer }) => {
  const [showSegmentModal, setShowSegmentModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(customer?.segment || 'new');
  const [selectedStatus, setSelectedStatus] = useState(customer?.status || 'active');
  const [isLoading, setIsLoading] = useState(false);

  const segmentOptions = [
    { value: 'frequent', label: 'Cliente Frecuente', description: 'Compra regularmente (más de 5 órdenes/mes)' },
    { value: 'occasional', label: 'Cliente Ocasional', description: 'Compra ocasionalmente (1-5 órdenes/mes)' },
    { value: 'new', label: 'Cliente Nuevo', description: 'Menos de 3 meses como cliente' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Activo', description: 'Cliente puede realizar compras normalmente' },
    { value: 'inactive', label: 'Inactivo', description: 'Cliente temporalmente inactivo' },
    { value: 'blocked', label: 'Bloqueado', description: 'Cliente bloqueado por políticas de la empresa' }
  ];

  const handleSegmentChange = async () => {
    setIsLoading(true);
    try {
      await onSegmentChange(selectedSegment);
      setShowSegmentModal(false);
    } catch (error) {
      console.error('Error changing segment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async () => {
    setIsLoading(true);
    try {
      await onStatusChange(selectedStatus);
      setShowStatusModal(false);
    } catch (error) {
      console.error('Error changing status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCustomer = async () => {
    setIsLoading(true);
    try {
      await onDeleteCustomer();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting customer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSegmentInfo = (segment) => {
    return segmentOptions?.find(opt => opt?.value === segment);
  };

  const getStatusInfo = (status) => {
    return statusOptions?.find(opt => opt?.value === status);
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg card-shadow">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Acciones del Cliente</h3>
          <p className="text-sm text-muted-foreground">
            Gestionar segmento, estado y configuraciones del cliente
          </p>
        </div>

        <div className="p-6 space-y-4">
          {/* Segment Management */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Users" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Segmento Actual</h4>
                <p className="text-sm text-muted-foreground">
                  {getSegmentInfo(customer?.segment)?.label || 'No definido'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowSegmentModal(true)}
              iconName="Edit"
              iconPosition="left"
            >
              Cambiar Segmento
            </Button>
          </div>

          {/* Status Management */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Estado Actual</h4>
                <p className="text-sm text-muted-foreground">
                  {getStatusInfo(customer?.status)?.label || 'No definido'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowStatusModal(true)}
              iconName="Settings"
              iconPosition="left"
            >
              Actualizar Estado
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/customer-management'}
              iconName="ArrowLeft"
              iconPosition="left"
              className="w-full"
            >
              Volver a Clientes
            </Button>
            
            <Button
              variant="destructive"
              onClick={() => setShowDeleteModal(true)}
              iconName="Trash2"
              iconPosition="left"
              className="w-full"
            >
              Eliminar Cliente
            </Button>
          </div>
        </div>
      </div>

      {/* Segment Change Modal */}
      {showSegmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg modal-shadow w-full max-w-md">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Cambiar Segmento de Cliente</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Seleccione el nuevo segmento para este cliente
              </p>
            </div>
            
            <div className="p-6">
              <Select
                label="Nuevo Segmento"
                options={segmentOptions}
                value={selectedSegment}
                onChange={setSelectedSegment}
                description="El segmento afecta las promociones y ofertas disponibles"
              />
            </div>
            
            <div className="p-6 border-t border-border flex gap-3">
              <Button
                variant="default"
                onClick={handleSegmentChange}
                loading={isLoading}
                iconName="Save"
                iconPosition="left"
                className="flex-1"
              >
                Guardar Cambios
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSegmentModal(false)}
                disabled={isLoading}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg modal-shadow w-full max-w-md">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Actualizar Estado del Cliente</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Cambie el estado de acceso del cliente
              </p>
            </div>
            
            <div className="p-6">
              <Select
                label="Nuevo Estado"
                options={statusOptions}
                value={selectedStatus}
                onChange={setSelectedStatus}
                description="El estado controla el acceso del cliente al sistema"
              />
            </div>
            
            <div className="p-6 border-t border-border flex gap-3">
              <Button
                variant="default"
                onClick={handleStatusChange}
                loading={isLoading}
                iconName="Save"
                iconPosition="left"
                className="flex-1"
              >
                Actualizar Estado
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowStatusModal(false)}
                disabled={isLoading}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg modal-shadow w-full max-w-md">
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-error" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Eliminar Cliente</h3>
                  <p className="text-sm text-muted-foreground">Esta acción no se puede deshacer</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-foreground mb-4">
                ¿Está seguro que desea eliminar permanentemente a <strong>{customer?.name}</strong>?
              </p>
              <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                <p className="text-sm text-error">
                  Se eliminarán todos los datos del cliente incluyendo su historial de compras.
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-border flex gap-3">
              <Button
                variant="destructive"
                onClick={handleDeleteCustomer}
                loading={isLoading}
                iconName="Trash2"
                iconPosition="left"
                className="flex-1"
              >
                Eliminar Cliente
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                disabled={isLoading}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerActions;