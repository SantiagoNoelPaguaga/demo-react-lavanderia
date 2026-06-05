import { useNavigate } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';
import { MessageSquare } from 'lucide-react';

export default function ClaimCard({ claim }) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (claim.status.toLowerCase() === 'resuelto') {
      alert(`Navegación: Ver historial de chat cerrado del Reclamo #${claim.id}`);
    } else {
      navigate(`/cliente/reclamos/${claim.id}`);
    }
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3 transition-all hover:border-blue-300 ${claim.status.toLowerCase() === 'resuelto' ? 'opacity-85 hover:opacity-100' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-md font-bold uppercase tracking-wide">
            Reclamo #{claim.id}
          </span>
          <h4 className="font-black text-gray-800 text-sm mt-1.5">
            Pedido Asociado: #{claim.pedidoId}
          </h4>
        </div>
        <StatusBadge status={claim.status} />
      </div>

      <div className="text-xs bg-gray-50 p-2.5 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-gray-400 font-medium text-[10px] uppercase tracking-wider">
            Categoría
          </p>
          <p className="font-bold text-gray-700">{claim.categoria}</p>
          <p className="text-[10px] text-gray-400 font-medium mt-0.5">
            Creado: {claim.fecha}
          </p>
        </div>
        <button
          onClick={handleAction}
          className={`p-2 bg-white border border-gray-200 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer ${
            claim.status.toLowerCase() === 'resuelto'
              ? 'text-gray-500 hover:text-gray-700'
              : 'text-blue-600 hover:text-blue-800'
          }`}
          aria-label={`Ver mensajes del Reclamo #${claim.id}`}
        >
          <MessageSquare size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
