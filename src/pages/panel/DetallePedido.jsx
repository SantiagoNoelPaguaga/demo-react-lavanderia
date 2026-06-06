import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Download, Edit2, Trash2, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import StatusBadge from '../../components/ui/StatusBadge';
import Button from '../../components/ui/Button';

export default function DetallePedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = () => {
    setLoading(true);
    api.getPedidoById(id)
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) {
    const isAdmin = user?.rol === 'administrador';
    return (
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-3">
        <div className={`w-8 h-8 border-4 ${isAdmin ? 'border-purple-500 border-t-transparent' : 'border-blue-600 border-t-transparent'} rounded-full animate-spin`}></div>
        <p className="text-xs font-bold text-gray-400">Cargando detalles del pedido...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center p-6 text-center space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Pedido no encontrado</h3>
        <p className="text-xs text-gray-400">El pedido con ID #{id} no existe en el sistema.</p>
        <Button onClick={() => navigate('/pedidos')} variant="secondary">
          Volver a Pedidos
        </Button>
      </div>
    );
  }

  const isClient = user?.rol === 'cliente';
  const isPaid = order.paymentStatus === 'Pagado';

  const handlePay = () => {
    if (confirm(`¿Desea simular el pago de $${order.total.toLocaleString('es-AR')} para esta orden?`)) {
      api.updatePedido(order.id, {
        paymentStatus: 'Pagado',
        paymentMethod: 'Mercado Pago',
        paymentDate: new Date().toLocaleDateString('es-AR') + ' - ' + new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
      }).then(() => {
        alert('Pago simulado con éxito. Response: { "status": "approved", "transaction_id": "mp_123456" }');
        fetchOrder();
      });
    }
  };

  const handleDownloadTicket = () => {
    alert(`API: PDF Stream /reportes/pedidos/${order.id}`);
  };

  const handleBajaLogica = () => {
    if (confirm('¿Desea dar de baja esta orden?\nEsto aplicará una baja lógica en el backend sin romper relaciones históricas.')) {
      api.deletePedido(order.id).then(() => {
        alert(`DELETE /pedidos/${order.id}\nOrden deshabilitada correctamente.`);
        navigate('/pedidos');
      });
    }
  };

  const handleScanQR = () => {
    let nextStatus = 'Listo';
    if (order.status === 'Ingresado') nextStatus = 'En proceso';
    else if (order.status === 'En proceso') nextStatus = 'Listo';
    else if (order.status === 'Listo') nextStatus = 'Entregado';
    else {
      alert('La orden ya ha sido entregada.');
      return;
    }

    if (confirm(`Escaneo de QR Exitoso. ¿Desea actualizar secuencialmente el estado del pedido a "${nextStatus}"?`)) {
      api.updatePedido(order.id, { status: nextStatus }).then(() => {
        alert(`PATCH /pedidos/${order.id}/escanear-qr\nEstado del pedido actualizado a "${nextStatus}" con éxito.`);
        fetchOrder();
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-start space-y-4 overflow-y-auto pr-1">
      {/* Barra de navegación interna / Título */}
      <div className="flex items-center gap-2 text-gray-800 shrink-0">
        <button
          onClick={() => navigate('/pedidos')}
          className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors cursor-pointer"
          aria-label="Volver a la lista de pedidos"
        >
          <ArrowLeft size={16} strokeWidth={3} />
        </button>
        <h3 className="text-base font-black tracking-tight">Pedido #{order.id}</h3>
      </div>

      {/* Card de Estados Principales */}
      <div className="bg-gray-50 border rounded-xl p-3.5 space-y-3 shadow-sm shrink-0">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase block tracking-wider">
              {isClient ? 'Fecha de Ingreso' : 'Orden de Planta'}
            </span>
            <span className="text-xs font-semibold text-gray-700">
              {isClient ? order.date : `Pedido #${order.id}`}
            </span>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <StatusBadge status={order.status} />
            <StatusBadge status={order.paymentStatus} />
          </div>
        </div>

        {/* Info de Titular (Staff only) */}
        {!isClient && (
          <div className="border-t pt-2 flex justify-between items-center text-xs">
            <span className="text-gray-400 font-medium">Cliente Titular:</span>
            <span className="font-extrabold text-gray-900 bg-white border px-2 py-0.5 rounded-md shadow-sm">
              {order.cliente}
            </span>
          </div>
        )}

        {/* Botones de Gestión (Staff only) */}
        {!isClient && (
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => navigate(`/pedidos/${order.id}/editar`)}
              className="flex items-center justify-center gap-1.5 py-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl font-bold text-[11px] shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Edit2 size={13} strokeWidth={2.5} />
              Editar Pedido
            </button>
            <button
              onClick={handleBajaLogica}
              className="flex items-center justify-center gap-1.5 py-2 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 rounded-xl font-bold text-[11px] shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Trash2 size={13} strokeWidth={2.5} />
              Dar de Baja
            </button>
          </div>
        )}
      </div>

      {/* Sección: Servicios Contratados */}
      <div className="space-y-1.5 shrink-0">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider pl-1">
          {isClient ? 'Servicios Contratados' : 'Servicios en esta Orden'}
        </h4>
        <div className="bg-white border rounded-xl p-3.5 space-y-3 shadow-sm">
          {order.services && order.services.map((service, index) => {
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

      {/* Historial de Trazabilidad (Timeline) */}
      {order.trazabilidad && (
        <div className="space-y-1.5 shrink-0">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider pl-1">
            Historial de Trazabilidad
          </h4>
          <div className="bg-white border rounded-xl p-4 shadow-sm relative">
            <div className="absolute left-[21px] top-6 bottom-6 w-[2px] bg-gray-100"></div>
            {order.trazabilidad.map((item, index) => {
              const isLast = index === order.trazabilidad.length - 1;
              return (
                <div key={index} className={`flex items-start gap-4 relative ${!isLast ? 'pb-4' : ''}`}>
                  <div className={`w-3 h-3 rounded-full border-2 border-white ring-4 ring-gray-100 mt-1 z-10 shrink-0 ${item.color}`}></div>
                  <div className="text-xs">
                    <p className={`font-black ${isLast ? 'text-green-600' : 'text-gray-700'}`}>
                      {item.title}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {item.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sección Facturación / Pago / Escaneo QR */}
      <div className="shrink-0 pt-2 pb-4">
        {isClient ? (
          isPaid ? (
            <div className="space-y-2">
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

              <Button onClick={handleDownloadTicket} variant="secondary">
                Descargar Ticket PDF
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
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

              <Button onClick={handlePay} variant="blue">
                Pagar Pedido
              </Button>
            </div>
          )
        ) : (
          /* Botón Escáner QR de planta (Staff only) */
          <Button onClick={handleScanQR} variant="primary">
            <Camera size={14} strokeWidth={2.5} />
            Escanear QR de la Bolsa / Ticket
          </Button>
        )}
      </div>
    </div>
  );
}
