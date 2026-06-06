import { useNavigate } from 'react-router-dom';
import { LogOut, Tag, AlertTriangle, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AppHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert('Cerrando sesión...');
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/perfil');
  };

  if (!user) return null;

  const isClient = user.rol === 'cliente';

  if (isClient) {
    return (
      <div className="flex justify-between items-center border-b pb-3 mb-4 shrink-0">
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            LavaPro App
          </p>
          <h2 className="text-md font-bold text-gray-800">
            {user.nombre}
          </h2>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          aria-label="Cerrar sesión"
        >
          <LogOut size={18} strokeWidth={2.5} />
        </button>
      </div>
    );
  }

  // Operador y Administrador
  const isAdmin = user.rol === 'administrador';
  const roleName = isAdmin ? 'Admin' : 'Operador';
  const badgeColor = isAdmin 
    ? 'bg-purple-50 text-purple-600 border-purple-100' 
    : 'bg-amber-50 text-amber-700 border-amber-100';
  
  const roleSubtitle = isAdmin ? 'Control de Auditoría' : 'Planta de Lavado';

  return (
    <div className="flex justify-between items-center border-b pb-3 mb-4 shrink-0">
      {/* Identidad de usuario clickeable */}
      <button
        onClick={handleProfileClick}
        className="flex items-center gap-2 text-left hover:bg-gray-50 py-1 px-2 rounded-xl transition-all active:scale-[0.98] group cursor-pointer"
        title="Configuración de mi cuenta"
      >
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-black text-gray-800">{user.nombre}</h2>
            <span className={`text-[8px] border px-1.5 py-0.5 rounded font-black uppercase tracking-wide ${badgeColor}`}>
              {roleName}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 font-medium mt-0.5 flex items-center gap-1 group-hover:text-gray-600 transition-colors">
            {roleSubtitle}
            <Settings size={10} strokeWidth={2.5} className="group-hover:rotate-45 transition-transform" />
          </p>
        </div>
      </button>

      {/* Herramientas globales */}
      <div className="flex items-center gap-0.5">
        {/* Acceso Global a Servicios */}
        <button
          onClick={() => navigate('/servicios')}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
          title="Módulo de Servicios"
        >
          <Tag size={18} strokeWidth={2.5} />
        </button>

        {/* Acceso Global a Reclamos */}
        <button
          onClick={() => navigate('/reclamos')}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all relative cursor-pointer"
          title="Centro de Reclamos"
        >
          <AlertTriangle size={18} strokeWidth={2.5} />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm">
            3
          </span>
        </button>

        <div className="w-[1px] h-5 bg-gray-200 mx-1"></div>

        {/* Cerrar Sesión */}
        <button
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-gray-900 rounded-xl transition-colors cursor-pointer"
          title="Cerrar sesión"
        >
          <LogOut size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
