import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CustomerInfoCard from './components/CustomerInfoCard';
import CustomerMetrics from './components/CustomerMetrics';
import PurchaseHistoryTable from './components/PurchaseHistoryTable';
import CustomerActions from './components/CustomerActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CustomerProfile = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState({ show: false, message: '', type: 'success' });

  // Mock user data
  const currentUser = {
    id: 1,
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@wareflow.cu',
    role: 'owner'
  };

  // Mock customer data
  const mockCustomer = {
    id: customerId || 'CUST-001',
    name: 'María González Pérez',
    email: 'maria.gonzalez@email.cu',
    phone: '+53 5234-5678',
    address: 'Calle 23 #456, Apto 3B',
    city: 'La Habana',
    province: 'havana',
    postalCode: '10400',
    segment: 'frequent',
    status: 'active',
    totalSpent: 12450.75,
    averageOrderValue: 1556.34,
    totalOrders: 8,
    lastPurchaseDate: '2024-01-15',
    registrationDate: '2023-06-15',
    customerSince: 8
  };

  useEffect(() => {
    // Simulate loading customer data
    const loadCustomer = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCustomer(mockCustomer);
      } catch (error) {
        console.error('Error loading customer:', error);
        showToastMessage('Error al cargar los datos del cliente', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadCustomer();
  }, [customerId]);

  const showToastMessage = (message, type = 'success') => {
    setShowToast({ show: true, message, type });
    setTimeout(() => {
      setShowToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleSaveCustomer = async (formData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCustomer(prev => ({
        ...prev,
        ...formData
      }));
      
      setIsEditing(false);
      showToastMessage('Información del cliente actualizada correctamente');
    } catch (error) {
      console.error('Error saving customer:', error);
      showToastMessage('Error al guardar los cambios', 'error');
      throw error;
    }
  };

  const handleSegmentChange = async (newSegment) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCustomer(prev => ({
        ...prev,
        segment: newSegment
      }));
      
      showToastMessage('Segmento del cliente actualizado correctamente');
    } catch (error) {
      console.error('Error changing segment:', error);
      showToastMessage('Error al cambiar el segmento', 'error');
      throw error;
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCustomer(prev => ({
        ...prev,
        status: newStatus
      }));
      
      showToastMessage('Estado del cliente actualizado correctamente');
    } catch (error) {
      console.error('Error changing status:', error);
      showToastMessage('Error al cambiar el estado', 'error');
      throw error;
    }
  };

  const handleDeleteCustomer = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToastMessage('Cliente eliminado correctamente');
      setTimeout(() => {
        navigate('/customer-management');
      }, 1000);
    } catch (error) {
      console.error('Error deleting customer:', error);
      showToastMessage('Error al eliminar el cliente', 'error');
      throw error;
    }
  };

  const handleExportHistory = () => {
    // Simulate export functionality
    showToastMessage('Historial exportado correctamente');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onMobileMenuToggle={toggleMobileMenu}
          userRole={currentUser?.role}
        />
        <div className="flex">
          <Sidebar
            isCollapsed={sidebarCollapsed}
            onToggle={toggleSidebar}
            userRole={currentUser?.role}
            currentUser={currentUser}
          />
          
          <main className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-sidebar'
          } pt-16`}>
            <div className="p-6">
              <div className="flex items-center justify-center min-h-96">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Icon name="User" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Cargando perfil del cliente...</h3>
                  <p className="text-muted-foreground">Por favor espere mientras cargamos la información</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onMobileMenuToggle={toggleMobileMenu}
          userRole={currentUser?.role}
        />
        <div className="flex">
          <Sidebar
            isCollapsed={sidebarCollapsed}
            onToggle={toggleSidebar}
            userRole={currentUser?.role}
            currentUser={currentUser}
          />
          
          <main className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-sidebar'
          } pt-16`}>
            <div className="p-6">
              <div className="flex items-center justify-center min-h-96">
                <div className="text-center">
                  <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="AlertCircle" size={32} className="text-error" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Cliente no encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    No se pudo encontrar el cliente con ID: {customerId}
                  </p>
                  <Button
                    variant="default"
                    onClick={() => navigate('/customer-management')}
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    Volver a Clientes
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMobileMenuToggle={toggleMobileMenu}
        userRole={currentUser?.role}
      />
      <div className="flex">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          userRole={currentUser?.role}
          currentUser={currentUser}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-sidebar'
        } pt-16`}>
          <div className="p-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                    <button 
                      onClick={() => navigate('/customer-management')}
                      className="hover:text-primary transition-smooth"
                    >
                      Clientes
                    </button>
                    <Icon name="ChevronRight" size={16} />
                    <span>Perfil del Cliente</span>
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {customer?.name}
                  </h1>
                  <p className="text-muted-foreground">
                    Cliente desde {new Date(customer.registrationDate)?.toLocaleDateString('es-CU', {
                      month: 'long',
                      year: 'numeric'
                    })} • {customer?.customerSince} meses
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/customer-management')}
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    Volver
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Customer Info & Metrics */}
              <div className="xl:col-span-2 space-y-6">
                <CustomerInfoCard
                  customer={customer}
                  onSave={handleSaveCustomer}
                  onCancel={() => setIsEditing(false)}
                  isEditing={isEditing}
                  onEdit={() => setIsEditing(true)}
                />
                
                <CustomerMetrics customer={customer} />
                
                <PurchaseHistoryTable
                  customerId={customer?.id}
                  onExportHistory={handleExportHistory}
                />
              </div>

              {/* Right Column - Actions */}
              <div className="xl:col-span-1">
                <CustomerActions
                  customer={customer}
                  onSegmentChange={handleSegmentChange}
                  onStatusChange={handleStatusChange}
                  onDeleteCustomer={handleDeleteCustomer}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Toast Notification */}
      {showToast?.show && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg modal-shadow ${
            showToast?.type === 'success' ?'bg-success text-success-foreground' :'bg-error text-error-foreground'
          }`}>
            <Icon 
              name={showToast?.type === 'success' ? 'CheckCircle' : 'AlertCircle'} 
              size={20} 
            />
            <span className="text-sm font-medium">{showToast?.message}</span>
          </div>
        </div>
      )}
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </div>
  );
};

export default CustomerProfile;