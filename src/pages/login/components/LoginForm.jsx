import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user roles
  const mockCredentials = [
    { email: 'admin@wareflow.cu', password: 'Admin123!', role: 'owner', name: 'Carlos Rodríguez' },
    { email: 'gerente@wareflow.cu', password: 'Manager123!', role: 'manager', name: 'María González' },
    { email: 'personal@wareflow.cu', password: 'Staff123!', role: 'staff', name: 'José Martínez' }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials against mock data
      const user = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (user) {
        // Store user session data
        const sessionData = {
          user: {
            id: Math.floor(Math.random() * 1000),
            name: user?.name,
            email: user?.email,
            role: user?.role
          },
          rememberMe: formData?.rememberMe,
          loginTime: new Date()?.toISOString()
        };

        localStorage.setItem('wareflow_session', JSON.stringify(sessionData));

        // Show success message
        showToast('Inicio de sesión exitoso', 'success');

        // Navigate based on role
        setTimeout(() => {
          if (user?.role === 'owner' || user?.role === 'manager') {
            navigate('/user-management');
          } else {
            navigate('/customer-management');
          }
        }, 1000);

      } else {
        setErrors({
          general: 'Credenciales incorrectas. Verifique su correo y contraseña.'
        });
        showToast('Error de autenticación', 'error');
      }
    } catch (error) {
      setErrors({
        general: 'Error del sistema. Intente nuevamente.'
      });
      showToast('Error del sistema', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type) => {
    // Simple toast implementation
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
      type === 'success' ? 'bg-success' : 'bg-error'
    }`;
    toast.textContent = message;
    document.body?.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body?.removeChild(toast);
      }, 300);
    }, 3000);
  };

  const handleForgotPassword = () => {
    showToast('Funcionalidad de recuperación próximamente', 'info');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg border border-border card-shadow p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Warehouse" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            WareFlow Admin
          </h1>
          <p className="text-muted-foreground">
            Accede a tu panel de administración
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors?.general && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-4 flex items-center space-x-3">
              <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          )}

          {/* Email Input */}
          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            placeholder="usuario@wareflow.cu"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          {/* Password Input */}
          <Input
            label="Contraseña"
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between">
            <Checkbox
              label="Recordar sesión"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            iconName="LogIn"
            iconPosition="left"
            iconSize={20}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
              disabled={isLoading}
            >
              ¿Olvidé mi contraseña?
            </button>
          </div>
        </form>

        {/* Demo Credentials Info */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center mb-3">
            Credenciales de demostración:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Propietario:</span>
              <span className="font-mono text-foreground">admin@wareflow.cu</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Gerente:</span>
              <span className="font-mono text-foreground">gerente@wareflow.cu</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Personal:</span>
              <span className="font-mono text-foreground">personal@wareflow.cu</span>
            </div>
            <div className="text-center mt-2">
              <span className="text-muted-foreground">Contraseña para todos: </span>
              <span className="font-mono text-foreground">Admin123! / Manager123! / Staff123!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;