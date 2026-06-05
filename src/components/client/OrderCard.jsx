import { useNavigate } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';
import { Plus } from 'lucide-react';

export default function OrderCard({ order, isHistory = false }) {
  const navigate = useNavigate();

  if (isHistory) {
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
          onClick={() => navigate(`/cliente/pedidos/${order.id}`)}
          className="p-2 text-blue-600 hover:text-blue-800 bg-white border border-gray-200 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
          aria-label={`Ver detalles del Pedido #${order.id}`}
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
