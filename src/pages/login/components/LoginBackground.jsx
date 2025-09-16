import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginBackground = () => {
  return (
    <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-8">
      <div className="mx-auto max-w-md text-center">
        {/* Hero Icon */}
        <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Icon name="Building2" size={48} className="text-primary" />
        </div>

        {/* Hero Content */}
        <h2 className="text-3xl font-semibold text-foreground mb-4">
          Gestión Empresarial Integral
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Administre usuarios, clientes e inventario desde una plataforma centralizada y segura.
        </p>

        {/* Feature List */}
        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Users" size={16} className="text-success" />
            </div>
            <span className="text-foreground">Control de usuarios con roles y permisos</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Building2" size={16} className="text-accent" />
            </div>
            <span className="text-foreground">Gestión completa de clientes y segmentación</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Package" size={16} className="text-warning" />
            </div>
            <span className="text-foreground">Inventario en tiempo real por almacén</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="BarChart3" size={16} className="text-secondary" />
            </div>
            <span className="text-foreground">Reportes y análisis detallados</span>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Certificado y conforme con:
          </p>
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-xs text-muted-foreground">Seguridad SSL</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-xs text-muted-foreground">ISO 27001</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={16} className="text-success" />
              <span className="text-xs text-muted-foreground">GDPR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBackground;