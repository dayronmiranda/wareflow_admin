import React from 'react';
import Icon from '../../../components/AppIcon';

const CustomerStats = ({ customers }) => {
  const totalCustomers = customers?.length;
  const activeCustomers = customers?.filter(c => c?.status === 'active')?.length;
  const frequentCustomers = customers?.filter(c => c?.segment === 'frequent')?.length;
  const totalRevenue = customers?.reduce((sum, c) => sum + (c?.totalSpent || 0), 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CU', {
      style: 'currency',
      currency: 'CUP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const stats = [
    {
      title: 'Total Clientes',
      value: totalCustomers?.toLocaleString('es-CU'),
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Clientes Activos',
      value: activeCustomers?.toLocaleString('es-CU'),
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Clientes Frecuentes',
      value: frequentCustomers?.toLocaleString('es-CU'),
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Ingresos Totales',
      value: formatCurrency(totalRevenue),
      icon: 'DollarSign',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+23%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-6 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              stat?.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={stat?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{stat?.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat?.value}</h3>
            <p className="text-sm text-muted-foreground">{stat?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerStats;