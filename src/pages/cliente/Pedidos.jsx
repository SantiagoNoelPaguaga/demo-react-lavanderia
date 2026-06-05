import OrderCard from '../../components/client/OrderCard';

export default function Pedidos() {
  const activeOrders = [
    {
      id: '101',
      status: 'Ingresado',
      paymentStatus: 'Deuda',
      total: 15730.0,
      fecha: '05/06/2026',
    },
    {
      id: '098',
      status: 'En proceso',
      paymentStatus: 'Pagado',
      total: 21780.0,
      fecha: '03/06/2026',
    },
  ];

  const historicalOrders = [
    {
      id: '085',
      status: 'Entregado',
      total: 4500.0,
      fecha: '24/05/2026',
    },
  ];

  return (
    <div className="flex-1 flex flex-col justify-start space-y-5 overflow-y-auto pr-1">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
          Mis Pedidos
        </span>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
          Activos
        </h3>
        {activeOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
          Historial
        </h3>
        {historicalOrders.map((order) => (
          <OrderCard key={order.id} order={order} isHistory />
        ))}
      </div>
    </div>
  );
}
