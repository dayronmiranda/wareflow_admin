import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LoginBackground from './components/LoginBackground';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const sessionData = localStorage.getItem('wareflow_session');
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData);
        if (session?.user && session?.user?.role) {
          // Redirect based on role
          if (session?.user?.role === 'owner' || session?.user?.role === 'manager') {
            navigate('/user-management');
          } else {
            navigate('/customer-management');
          }
        }
      } catch (error) {
        // Clear invalid session data
        localStorage.removeItem('wareflow_session');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <LoginForm />
        </div>
      </div>

      {/* Right Side - Background Content */}
      <LoginBackground />
    </div>
  );
};

export default LoginPage;