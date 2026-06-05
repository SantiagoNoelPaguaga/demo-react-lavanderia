import { Outlet, useLocation } from 'react-router-dom';
import MobileContainer from './MobileContainer';
import ClientHeader from './ClientHeader';
import BottomNavbar from './BottomNavbar';

export default function ClientLayout() {
  const location = useLocation();

  // Determinamos si es una página de chat (ej: /cliente/reclamos/012)
  const isChatPage = location.pathname.match(/\/cliente\/reclamos\/\w+/) && 
                     !location.pathname.endsWith('/nuevo') && 
                     location.pathname !== '/cliente/reclamos';
                     
  const isNewClaimPage = location.pathname === '/cliente/reclamos/nuevo';
  const isEditProfilePage = location.pathname === '/cliente/perfil/editar' || location.pathname === '/cliente/perfil/password';
  
  // Páginas que usan su propia cabecera personalizada
  const hideDefaultHeader = isChatPage || isNewClaimPage || isEditProfilePage;
  
  // Páginas que ocultan el BottomNavbar por diseño original
  const hideNavbar = isChatPage || isEditProfilePage;

  // Título de la cabecera según la ruta
  let headerTitle = "Ricardo Darín";
  if (location.pathname.startsWith('/cliente/perfil')) {
    headerTitle = "Mi Cuenta";
  }

  return (
    <MobileContainer 
      padding={isChatPage ? "p-0" : "p-6"} 
      className={isChatPage ? "overflow-hidden" : ""}
    >
      <div className="flex-1 flex flex-col justify-between h-full relative">
        {/* Cabecera */}
        {!hideDefaultHeader && <ClientHeader title={headerTitle} />}

        {/* Contenido dinámico */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <Outlet />
        </div>

        {/* Navbar inferior */}
        {!hideNavbar && <div className="h-16 shrink-0"></div>} {/* Espaciador para no tapar contenido */}
        {!hideNavbar && <BottomNavbar />}
      </div>
    </MobileContainer>
  );
}
