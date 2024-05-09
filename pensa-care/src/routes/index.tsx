import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Login, NewPassword, Recover, Signup } from '../components/forms';
import { Layout } from '../layouts';
import { ClientsPage } from '../pages/clients';
import { ClientDetailsPage } from '../pages/clients/client-details';
import { ConfigPage } from '../pages/config';
import { DashboardPage } from '../pages/dashboard';
import { ItensPage } from '../pages/itens';
import { ServicesPage } from '../pages/services';
import withAuthProtection from './AuthProtection';

const ProtectedDashboard = withAuthProtection(DashboardPage);
const ProtectedClients = withAuthProtection(ClientsPage);
const ProtectedClientDetails = withAuthProtection(ClientDetailsPage);
const ProtectedItens = withAuthProtection(ItensPage);
const ProtectedServices = withAuthProtection(ServicesPage);
const ProtectedConfig = withAuthProtection(ConfigPage);

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<Layout.Auth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<Layout.Recovery />}>
          <Route path="/recover" element={<Recover />} />
          <Route path="/new-password" element={<NewPassword />} />
        </Route>
        <Route element={<Layout.Dashboard />}>
          <Route path="/dashboard" element={<ProtectedDashboard />} />
          <Route path="/clients" element={<ProtectedClients />} />
          <Route path="/clients/:id" element={<ProtectedClientDetails />} />
          <Route path="/itens" element={<ProtectedItens />} />
          <Route path="/services" element={<ProtectedServices />} />
          <Route path="/config" element={<ProtectedConfig />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
