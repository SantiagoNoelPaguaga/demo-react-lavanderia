import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

export default function ReclamoNuevo() {
  const navigate = useNavigate();

  const [pedidoId, setPedidoId] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [mensaje, setMensaje] = useState('');

  const pedidoOptions = [
    { value: '101', label: 'Pedido #101 — $15.730,00 (Ingresado)' },
    { value: '98', label: 'Pedido #098 — $21.780,00 (En Proceso)' },
    { value: '85', label: 'Pedido #085 — $4.500,00 (Entregado)' },
  ];

  const categoriaOptions = [
    { value: '1', label: 'Prenda Dañada o Manchada' },
    { value: '2', label: 'Falta una Prenda en la Entrega' },
    { value: '3', label: 'Demora excesiva en los plazos' },
    { value: '4', label: 'Error en el Cobro / Precio de Lista' },
    { value: '5', label: 'Otro motivo específico' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      'API Pipeline: \n1. POST /reclamos \n2. Captura ID generado \n3. POST /reclamos/mensajes con el texto \n4. Redirige a la vista del Chat.'
    );
    navigate('/cliente/reclamos');
  };

  return (
    <div className="flex-1 flex flex-col justify-start space-y-5 overflow-y-auto pr-1">
      {/* HEADER SUPERIOR INTERNO */}
      <div className="flex items-center gap-2 text-gray-800 shrink-0">
        <button
          type="button"
          onClick={() => navigate('/cliente/reclamos')}
          className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors cursor-pointer"
          aria-label="Volver a la lista de reclamos"
        >
          <ArrowLeft size={16} strokeWidth={3} />
        </button>
        <h3 className="text-base font-black tracking-tight">
          Iniciar Nuevo Reclamo
        </h3>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed pl-1 shrink-0">
        Por favor, seleccioná el pedido afectado y detallanos lo ocurrido.
        Nuestro equipo auditará el caso a la brevedad.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 pt-2 flex-1">
        {/* Selector de Pedido */}
        <Select
          label="Seleccionar Pedido"
          id="pedido"
          value={pedidoId}
          onChange={(e) => setPedidoId(e.target.value)}
          options={pedidoOptions}
          placeholder="Elegí una orden activa..."
          required
        />

        {/* Selector de Categoría */}
        <Select
          label="Motivo del Reclamo"
          id="categoria"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          options={categoriaOptions}
          placeholder="¿Cuál es el inconveniente?"
          required
        />

        {/* Mensaje Explicativo */}
        <div className="space-y-1.5">
          <label
            htmlFor="mensaje"
            className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1 block"
          >
            Explicación Detallada
          </label>
          <textarea
            id="mensaje"
            rows={5}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
            placeholder="Describí detalladamente lo sucedido con tus servicios..."
            className="block w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs font-medium rounded-xl p-3.5 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm resize-none placeholder-gray-400 leading-relaxed"
          ></textarea>
        </div>

        {/* Botonera de Acción */}
        <div className="pt-4 space-y-2 shrink-0">
          <Button type="submit" variant="primary">
            Confirmar e Iniciar Reclamo
          </Button>

          <Button
            type="button"
            onClick={() => navigate('/cliente/reclamos')}
            variant="secondary"
          >
            Cancelar
          </Button>
        </div>
      </form>

      {/* Nota de pie de página */}
      <div className="text-center mt-2 shrink-0 pb-2">
        <p className="text-[9px] text-gray-400 font-medium tracking-wide">
          LavaPro garantiza la auditoría fotográfica de todos los procesos físicos.
        </p>
      </div>
    </div>
  );
}
