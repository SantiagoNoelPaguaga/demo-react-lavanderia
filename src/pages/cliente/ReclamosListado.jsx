import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import ClaimCard from '../../components/client/ClaimCard';

export default function ReclamosListado() {
  const navigate = useNavigate();

  const claims = [
    {
      id: '012',
      pedidoId: '101',
      status: 'En Revisión',
      categoria: 'Prenda Dañada o Manchada',
      fecha: '05/06/2026',
    },
    {
      id: '005',
      pedidoId: '085',
      status: 'Resuelto',
      categoria: 'Error en el Cobro / Precio',
      fecha: '26/05/2026',
    },
  ];

  return (
    <div className="flex-1 flex flex-col justify-start space-y-4 overflow-y-auto pr-1">
      <div className="flex justify-between items-center shrink-0">
        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
          Centro de Soporte
        </span>
        <button
          onClick={() => navigate('/cliente/reclamos/nuevo')}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
        >
          <Plus size={12} strokeWidth={3} />
          Nuevo Reclamo
        </button>
      </div>

      <div className="space-y-3.5 pt-1">
        {claims.map((claim) => (
          <ClaimCard key={claim.id} claim={claim} />
        ))}
      </div>
    </div>
  );
}
