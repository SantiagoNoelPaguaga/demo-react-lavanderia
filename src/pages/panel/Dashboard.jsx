import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getFormattedDate = () => {
    const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateStr = new Date().toLocaleDateString('es-AR', options);
    
    // Capitalizar día de la semana
    return dateStr.charAt(0).toUpperCase() + dateStr.slice(1).replace(/\//g, ' / ');
  };

  const getClientDate = () => {
    return new Date().toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, ' / ');
  };

  if (!user) return null;

  const isClient = user.rol === 'cliente';
  const isOperator = user.rol === 'operador';
  const isAdmin = user.rol === 'administrador';

  const handleCreateOrder = () => {
    navigate('/pedidos/nuevo');
  };

  return (
    <div className="flex-1 flex flex-col justify-start space-y-4 pt-1 overflow-y-auto pr-1">
      {/* Botón rápido del operador */}
      {isOperator && (
        <div className="shrink-0">
          <Button onClick={handleCreateOrder} variant="primary">
            <Plus size={16} strokeWidth={3} />
            Crear Nuevo Pedido
          </Button>
        </div>
      )}

      {/* Saludo exclusivo del Cliente */}
      {isClient && (
        <div className="border-2 border-blue-600 rounded-xl p-4 bg-blue-50/30 shadow-sm shrink-0">
          <h3 className="text-xl font-black text-blue-900 tracking-tight">
            Hola {user.nombre}
          </h3>
        </div>
      )}

      {/* Fecha del sistema */}
      <div className="bg-gray-100 rounded-xl py-2 px-4 text-center shrink-0">
        <p className="text-xs font-bold text-gray-600 tracking-wide">
          {isClient ? getClientDate() : getFormattedDate()}
        </p>
      </div>

      {/* Contadores */}
      <div className="space-y-3 pt-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1">
          {isClient ? 'Estado de tus pedidos' : isOperator ? 'Monitoreo de Órdenes' : 'Monitoreo en Tiempo Real'}
        </p>

        {isClient && (
          <>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col items-center justify-center transition-all hover:border-gray-300">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Ingresado</span>
              <span className="text-3xl font-black text-gray-900">1</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col items-center justify-center transition-all hover:border-gray-300">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">En proceso</span>
              <span className="text-3xl font-black text-gray-900">0</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col items-center justify-center transition-all hover:border-gray-300">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Listo</span>
              <span className="text-3xl font-black text-gray-900">0</span>
            </div>
          </>
        )}

        {isOperator && (
          <>
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm flex justify-between items-center transition-all hover:border-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Lista de Espera</span>
              </div>
              <span className="text-2xl font-black text-gray-900">12</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm flex justify-between items-center transition-all hover:border-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">En mi Lavarropas</span>
              </div>
              <span className="text-2xl font-black text-blue-600">12</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm flex justify-between items-center transition-all hover:border-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Listos para Entregar</span>
              </div>
              <span className="text-2xl font-black text-emerald-600">12</span>
            </div>
          </>
        )}

        {isAdmin && (
          <>
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm flex justify-between items-center transition-all hover:border-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Lista de Espera</span>
              </div>
              <span className="text-2xl font-black text-gray-900">12</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm flex justify-between items-center transition-all hover:border-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">En Proceso de Lavado</span>
              </div>
              <span className="text-2xl font-black text-blue-600">12</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm flex justify-between items-center transition-all hover:border-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Entregados Hoy</span>
              </div>
              <span className="text-2xl font-black text-emerald-600">12</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
