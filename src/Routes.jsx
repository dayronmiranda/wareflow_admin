import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CustomerProfile from './pages/customer-profile';
import LoginPage from './pages/login';
import UserManagement from './pages/user-management';
import CustomerManagement from './pages/customer-management';
import UserProfile from './pages/user-profile';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CustomerManagement />} />
        <Route path="/customer-profile" element={<CustomerProfile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/customer-management" element={<CustomerManagement />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
