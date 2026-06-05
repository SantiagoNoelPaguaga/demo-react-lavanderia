import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function ClientHeader({ title }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí se limpiará el contexto de autenticación en el futuro
    alert('Cerrando sesión...');
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center border-b pb-3 mb-4 shrink-0">
      <div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          LavaPro App
        </p>
        <h2 className="text-md font-bold text-gray-800">
          {title || "Ricardo Darín"}
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
