import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import Button from '../../components/ui/Button';

const mockOrdersDb = {
  '101': {
    id: '101',
    date: '05/06/2026 • 14:25',
    status: 'Ingresado',
    paymentStatus: 'Deuda',
    services: [
      { name: 'Lavado Completo Económico', price: 4000.0 },
      { name: 'Lavado Completo Económico', price: 4000.0 },
      { name: 'Limpieza Acolchado Estándar', price: 5000.0 }
    ],
    subtotal: 13000.0,
    tax: 2730.0,
    total: 15730.0
  },
  '098': {
    id: '098',
    date: '03/06/2026 • 09:12',
    status: 'En Proceso',
    paymentStatus: 'Pagado',
    services: [
      { name: 'Lavado Calzado Especial', price: 4500.0 },
      { name: 'Secado Delicado Edredón', price: 13500.0 }
    ],
    subtotal: 18000.0,
    tax: 3780.0,
    total: 21780.0,
    paymentMethod: 'Mercado Pago',
    paymentDate: '03/06/2026 - 09:14'
  }
};

export default function DetallePedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = mockOrdersDb[id];

  if (!order) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center p-6 text-center space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Pedido no encontrado</h3>
        <p className="text-xs text-gray-400">El pedido con ID #{id} no existe en el sistema.</p>
        <Button onClick={() => navigate('/cliente/pedidos')} variant="secondary">
          Volver a Mis Pedidos
        </Button>
      </div>
    );
  }

  const isPaid = order.paymentStatus === 'Pagado';

  const handlePay = () => {
    alert('API Pasarela: POST /pagos/crear-preferencia');
  };

  const handleDownloadTicket = () => {
    alert(`API: PDF Stream /reportes/pedidos/${order.id}`);
  };

  return (
    <div className="flex-1 flex flex-col justify-start space-y-4 overflow-y-auto pr-1">
      {/* Barra de navegación interna / Título */}
      <div className="flex items-center gap-2 text-gray-800">
        <button
          onClick={() => navigate('/cliente/pedidos')}
          className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors cursor-pointer"
          aria-label="Volver a la lista de pedidos"
        >
          <ArrowLeft size={16} strokeWidth={3} />
        </button>
        <h3 className="text-base font-black tracking-tight">Pedido #{order.id}</h3>
      </div>

      {/* Card de Estados Principales */}
      <div className="bg-gray-50 border rounded-xl p-3.5 flex justify-between items-center shadow-sm shrink-0">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase block tracking-wider">
            Fecha de Ingreso
          </span>
          <span className="text-xs font-semibold text-gray-700">
            {order.date}
          </span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <StatusBadge status={order.status} />
          <StatusBadge status={order.paymentStatus} />
        </div>
      </div>

      {/* Sección: Servicios Contratados */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
          Servicios Contratados
        </h4>
        <div className="bg-white border rounded-xl p-3.5 space-y-3 shadow-sm">
          {order.services.map((service, index) => {
            const isLast = index === order.services.length - 1;
            return (
              <div
                key={index}
                className={`flex justify-between items-center text-xs ${!isLast ? 'border-b pb-2.5' : ''}`}
              >
                <span className="text-gray-800 font-bold">{service.name}</span>
                <span className="font-extrabold text-gray-900">
                  ${service.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sección de Facturación / Pago */}
      {isPaid ? (
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
            Datos de Facturación
          </h4>
          <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-3.5 space-y-2 text-xs shadow-sm">
            <div className="flex justify-between text-gray-600">
              <span>Método de Pago</span>
              <span className="font-bold text-emerald-700">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-gray-600 border-b border-emerald-100 pb-2">
              <span>Fecha de Pago</span>
              <span className="text-gray-700 font-medium">{order.paymentDate}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-gray-900 pt-1">
              <span>ABONADO TOTAL</span>
              <span className="text-emerald-600">
                ${order.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="pt-1">
            <Button onClick={handleDownloadTicket} variant="secondary">
              <Download size={14} strokeWidth={2.5} />
              Descargar Ticket PDF
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
              Resumen de Precio
            </h4>
            <div className="bg-white border rounded-xl p-3.5 space-y-2 text-xs shadow-sm">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Costo Neto Subtotal</span>
                <span>${order.subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium border-b pb-2">
                <span>Impuestos (IVA 21%)</span>
                <span>${order.tax.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-gray-900 pt-1">
                <span>TOTAL A PAGAR</span>
                <span className="text-blue-600">
                  ${order.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Button onClick={handlePay} variant="blue">
              Pagar Pedido
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
