import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoForm from './components/PersonalInfoForm';
import PermissionsPanel from './components/PermissionsPanel';
import ActivityHistory from './components/ActivityHistory';
import ConfirmationDialog from './components/ConfirmationDialog';
import ToastNotification from './components/ToastNotification';

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Dialog states
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: 'default',
    title: '',
    message: '',
    onConfirm: null,
    isLoading: false
  });

  // Toast states
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  // Mock user data
  const mockUsers = [
    {
      id: '1',
      name: 'Ana María Rodríguez',
      email: 'ana.rodriguez@wareflow.cu',
      cubanId: '85042312345',
      phone: '+53 5234-5678',
      role: 'manager',
      warehouse: 'Almacén Central Habana',
      status: 'active',
      lastLogin: '15/09/2024 14:32',
      createdAt: '01/03/2024',
      permissions: {
        inventoryManagement: true,
        salesOperations: true,
        userCreation: false,
        customerManagement: true,
        reportAccess: true,
        systemSettings: false
      }
    },
    {
      id: '2',
      name: 'Carlos Eduardo Pérez',
      email: 'carlos.perez@wareflow.cu',
      cubanId: '92051487632',
      phone: '+53 5876-5432',
      role: 'staff',
      warehouse: 'Almacén Santiago',
      status: 'active',
      lastLogin: '14/09/2024 09:15',
      createdAt: '15/05/2024',
      permissions: {
        inventoryManagement: true,
        salesOperations: true,
        userCreation: false,
        customerManagement: false,
        reportAccess: false,
        systemSettings: false
      }
    }
  ];

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const user = mockUsers?.find(u => u?.id === userId) || mockUsers?.[0];
        setCurrentUser(user);
        setIsLoading(false);
      }, 800);
    };

    loadUserData();
  }, [userId]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleBack = () => {
    navigate('/user-management');
  };

  const showToast = (message, type = 'success') => {
    setToast({
      isVisible: true,
      message,
      type
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const showConfirmDialog = (config) => {
    setConfirmDialog({
      isOpen: true,
      ...config
    });
  };

  const hideConfirmDialog = () => {
    setConfirmDialog(prev => ({
      ...prev,
      isOpen: false,
      isLoading: false
    }));
  };

  const handleSaveProfile = async (formData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentUser(prev => ({
        ...prev,
        ...formData
      }));
      
      showToast('Perfil actualizado correctamente', 'success');
    } catch (error) {
      showToast('Error al actualizar el perfil', 'error');
      throw error;
    }
  };

  const handleSavePermissions = async (permissions) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setCurrentUser(prev => ({
        ...prev,
        permissions
      }));
      
      showToast('Permisos actualizados correctamente', 'success');
    } catch (error) {
      showToast('Error al actualizar los permisos', 'error');
      throw error;
    }
  };

  const handleResetPassword = () => {
    showConfirmDialog({
      type: 'warning',
      title: 'Restablecer Contraseña',
      message: `¿Está seguro que desea restablecer la contraseña de ${currentUser?.name}? Se enviará un enlace de restablecimiento al correo electrónico registrado.`,
      confirmText: 'Restablecer',
      onConfirm: async () => {
        setConfirmDialog(prev => ({ ...prev, isLoading: true }));
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          hideConfirmDialog();
          showToast('Enlace de restablecimiento enviado al correo electrónico', 'success');
        } catch (error) {
          hideConfirmDialog();
          showToast('Error al enviar el enlace de restablecimiento', 'error');
        }
      }
    });
  };

  const handleChangeStatus = () => {
    const isActive = currentUser?.status === 'active';
    const newStatus = isActive ? 'suspended' : 'active';
    const action = isActive ? 'suspender' : 'activar';
    
    showConfirmDialog({
      type: isActive ? 'danger' : 'success',
      title: `${action?.charAt(0)?.toUpperCase() + action?.slice(1)} Usuario`,
      message: `¿Está seguro que desea ${action} a ${currentUser?.name}? ${
        isActive 
          ? 'El usuario no podrá acceder al sistema hasta que sea reactivado.' 
          : 'El usuario podrá acceder nuevamente al sistema.'
      }`,
      confirmText: action?.charAt(0)?.toUpperCase() + action?.slice(1),
      onConfirm: async () => {
        setConfirmDialog(prev => ({ ...prev, isLoading: true }));
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1200));
          
          setCurrentUser(prev => ({
            ...prev,
            status: newStatus
          }));
          
          hideConfirmDialog();
          showToast(`Usuario ${action}do correctamente`, 'success');
        } catch (error) {
          hideConfirmDialog();
          showToast(`Error al ${action} el usuario`, 'error');
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onMobileMenuToggle={handleMobileMenuToggle} />
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={handleSidebarToggle}
        />
        
        <main className={`pt-16 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-sidebar'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Cargando perfil del usuario...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMobileMenuToggle={handleMobileMenuToggle} />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={handleSidebarToggle}
        currentUser={currentUser}
      />
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-sidebar'
      }`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Profile Header */}
          <ProfileHeader
            user={currentUser}
            onBack={handleBack}
            onResetPassword={handleResetPassword}
            onChangeStatus={handleChangeStatus}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Profile Form */}
            <div className="xl:col-span-2 space-y-6">
              <PersonalInfoForm
                user={currentUser}
                onSave={handleSaveProfile}
                onCancel={handleBack}
              />
              
              <PermissionsPanel
                user={currentUser}
                onSavePermissions={handleSavePermissions}
              />
            </div>

            {/* Right Column - Activity History */}
            <div className="xl:col-span-1">
              <ActivityHistory user={currentUser} />
            </div>
          </div>
        </div>
      </main>
      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmDialog?.isOpen}
        onClose={hideConfirmDialog}
        onConfirm={confirmDialog?.onConfirm}
        title={confirmDialog?.title}
        message={confirmDialog?.message}
        confirmText={confirmDialog?.confirmText}
        type={confirmDialog?.type}
        isLoading={confirmDialog?.isLoading}
      />
      {/* Toast Notification */}
      <ToastNotification
        isVisible={toast?.isVisible}
        message={toast?.message}
        type={toast?.type}
        onClose={hideToast}
      />
    </div>
  );
};

export default UserProfile;