import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ 
  selectedCount, 
  onBulkStatusChange, 
  onBulkSegmentChange, 
  onBulkExport, 
  onBulkDelete,
  onClearSelection 
}) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showSegmentMenu, setShowSegmentMenu] = useState(false);

  if (selectedCount === 0) return null;

  const handleStatusChange = (status) => {
    onBulkStatusChange(status);
    setShowStatusMenu(false);
  };

  const handleSegmentChange = (segment) => {
    onBulkSegmentChange(segment);
    setShowSegmentMenu(false);
  };

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedCount} cliente{selectedCount !== 1 ? 's' : ''} seleccionado{selectedCount !== 1 ? 's' : ''}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Limpiar selección
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Status Change Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              iconName="Settings"
              iconPosition="left"
              iconSize={14}
            >
              Cambiar Estado
            </Button>

            {showStatusMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowStatusMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg modal-shadow z-50 py-2">
                  <button
                    onClick={() => handleStatusChange('active')}
                    className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                  >
                    <div className="w-3 h-3 bg-success rounded-full mr-3"></div>
                    Activar
                  </button>
                  <button
                    onClick={() => handleStatusChange('inactive')}
                    className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                  >
                    <div className="w-3 h-3 bg-warning rounded-full mr-3"></div>
                    Desactivar
                  </button>
                  <button
                    onClick={() => handleStatusChange('blocked')}
                    className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                  >
                    <div className="w-3 h-3 bg-error rounded-full mr-3"></div>
                    Bloquear
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Segment Change Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSegmentMenu(!showSegmentMenu)}
              iconName="Tag"
              iconPosition="left"
              iconSize={14}
            >
              Cambiar Segmento
            </Button>

            {showSegmentMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowSegmentMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg modal-shadow z-50 py-2">
                  <button
                    onClick={() => handleSegmentChange('frequent')}
                    className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="Star" size={16} className="mr-3 text-primary" />
                    Frecuente
                  </button>
                  <button
                    onClick={() => handleSegmentChange('occasional')}
                    className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="Clock" size={16} className="mr-3 text-accent" />
                    Ocasional
                  </button>
                  <button
                    onClick={() => handleSegmentChange('new')}
                    className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="UserPlus" size={16} className="mr-3 text-secondary" />
                    Nuevo
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkExport}
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Exportar
          </Button>

          {/* Delete Button */}
          <Button
            variant="destructive"
            size="sm"
            onClick={onBulkDelete}
            iconName="Trash2"
            iconPosition="left"
            iconSize={14}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;