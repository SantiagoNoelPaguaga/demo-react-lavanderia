import { useNavigate } from 'react-router-dom';
import { Plus, Printer, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../ui/StatusBadge';

export default function OrderCard({ order, isHistory = false }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePrintQR = (e) => {
    e.stopPropagation();
    alert(`Contingencia QR - Reimprimiendo Etiqueta QR del Pedido #${order.id}`);
  };

  const handleManage = () => {
    navigate(`/pedidos/${order.id}`);
  };

  const isClient = user?.rol === 'cliente';

  // Render para Historial de Cliente
  if (isClient && isHistory) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm opacity-75 hover:opacity-100 transition-opacity flex justify-between items-center">
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} type="dot" />
          <div>
            <h4 className="font-bold text-gray-700 text-sm">Pedido #{order.id}</h4>
            <p className="text-[10px] text-gray-400">Entregado el {order.fecha}</p>
          </div>
        </div>
        <span className="text-sm font-black text-gray-600">
          ${order.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        </span>
      </div>
    );
  }

  // Render para Pedido Activo de Cliente
  if (isClient) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3 transition-all hover:border-blue-300">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <StatusBadge status={order.status} type="dot" />
            <div>
              <h4 className="font-extrabold text-gray-800 text-sm">
                Pedido #{order.id}
              </h4>
              <p className="text-[11px] text-gray-400 font-medium">
                {order.status} • {order.fecha}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <StatusBadge status={order.paymentStatus} />
          </div>
        </div>

        <div className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg flex justify-between items-center">
          <div>
            <p className="text-gray-400 font-medium">Monto Total</p>
            <p className="font-black text-gray-800 text-sm">
              ${order.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <button
            onClick={handleManage}
            className="p-2 text-blue-600 hover:text-blue-800 bg-white border border-gray-200 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
            aria-label={`Ver detalles del Pedido #${order.id}`}
          >
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>
      </div>
    );
  }

  // Render para Operador y Administrador (Cola de Pedidos del Sistema)
  // Determinamos el color de borde hover según el rol
  const hoverColorClass = user?.rol === 'administrador' 
    ? 'hover:border-purple-300' 
    : 'hover:border-amber-300';

  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between items-center transition-all ${hoverColorClass}`}>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="font-black text-gray-800 text-sm">Pedido #{order.id}</h3>
          <StatusBadge status={order.status} />
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={order.paymentStatus} />
          <span className="text-[11px] text-gray-400 font-medium">
            ${order.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5">
        <button
          onClick={handlePrintQR}
          className="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-500 border border-gray-200 rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center"
          title="Reimprimir Etiqueta QR"
        >
          <Printer size={15} strokeWidth={2.5} />
        </button>
        <button
          onClick={handleManage}
          className={`p-2.5 bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center ${
            user?.rol === 'administrador' 
              ? 'hover:bg-purple-50 hover:text-purple-600' 
              : 'hover:bg-amber-50 hover:text-amber-600'
          }`}
          title="Gestionar Pedido"
        >
          <ChevronRight size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
