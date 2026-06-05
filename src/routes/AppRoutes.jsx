import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from '../components/layout/AuthLayout';
import ClientLayout from '../components/layout/ClientLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import ActivarCuenta from '../pages/auth/ActivarCuenta';
import OlvideContrasena from '../pages/auth/OlvideContrasena';
import ResetPassword from '../pages/auth/ResetPassword';

// Client Pages
import Dashboard from '../pages/cliente/Dashboard';
import Pedidos from '../pages/cliente/Pedidos';
import DetallePedido from '../pages/cliente/DetallePedido';
import Perfil from '../pages/cliente/Perfil';
import EditarPerfil from '../pages/cliente/EditarPerfil';
import CambiarPassword from '../pages/cliente/CambiarPassword';
import ReclamosListado from '../pages/cliente/ReclamosListado';
import ReclamoMensajes from '../pages/cliente/ReclamoMensajes';
import ReclamoNuevo from '../pages/cliente/ReclamoNuevo';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de Autenticación */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/activar-cuenta" element={<ActivarCuenta />} />
          <Route path="/recuperar-contrasena" element={<OlvideContrasena />} />
          <Route path="/restablecer-contrasena" element={<ResetPassword />} />
        </Route>

        {/* Rutas del Cliente */}
        <Route path="/cliente" element={<ClientLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="pedidos/:id" element={<DetallePedido />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="perfil/editar" element={<EditarPerfil />} />
          <Route path="perfil/password" element={<CambiarPassword />} />
          <Route path="reclamos" element={<ReclamosListado />} />
          <Route path="reclamos/:id" element={<ReclamoMensajes />} />
          <Route path="reclamos/nuevo" element={<ReclamoNuevo />} />
          {/* Redirección por defecto de la sección cliente */}
          <Route path="" element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Redirecciones Generales */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
