// Capa de Servicio API Simulada (Mock API Client)
// Simula llamadas HTTP utilizando Promesas (async/await) y almacena datos en localStorage para persistencia real.

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

const getStorageItem = (key, initialValue) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  }
  return JSON.parse(data);
};

const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// --- Datos Iniciales Semilla (Seed Data) ---

const INITIAL_PEDIDOS = [
  {
    id: '101',
    date: '05/06/2026 • 14:25',
    status: 'Ingresado',
    paymentStatus: 'Deuda',
    cliente: 'Ricardo Darín',
    services: [
      { name: 'Lavado Completo Económico', price: 4000.0 },
      { name: 'Lavado Completo Económico', price: 4000.0 },
      { name: 'Limpieza Acolchado Estándar', price: 5000.0 }
    ],
    subtotal: 13000.0,
    tax: 2730.0,
    total: 15730.0,
    trazabilidad: [
      { title: 'Orden Recibida (Pendiente)', date: '05/06/2026 — 14:25', active: true, color: 'bg-amber-500' }
    ]
  },
  {
    id: '098',
    date: '03/06/2026 • 09:12',
    status: 'En proceso',
    paymentStatus: 'Pagado',
    cliente: 'Ricardo Darín',
    services: [
      { name: 'Lavado Calzado Especial', price: 4500.0 },
      { name: 'Secado Delicado Edredón', price: 13500.0 }
    ],
    subtotal: 18000.0,
    tax: 3780.0,
    total: 21780.0,
    paymentMethod: 'Mercado Pago',
    paymentDate: '03/06/2026 - 09:14',
    trazabilidad: [
      { title: 'Orden Recibida (Pendiente)', date: '03/06/2026 — 09:12', active: true, color: 'bg-gray-400' },
      { title: 'Lavado Iniciado (En Proceso)', date: '03/06/2026 — 10:00', active: true, color: 'bg-blue-500 animate-pulse' }
    ]
  },
  {
    id: '122',
    date: '03/06/2026 • 09:12',
    status: 'Listo',
    paymentStatus: 'Deuda',
    cliente: 'Carlos Monzón',
    services: [
      { name: 'Lavado Calzado Especial', price: 4500.0 },
      { name: 'Secado Delicado Edredón', price: 3900.0 }
    ],
    subtotal: 8400.0,
    tax: 0.0,
    total: 8400.0,
    trazabilidad: [
      { title: 'Orden Recibida (Pendiente)', date: '03/06/2026 — 09:12', active: true, color: 'bg-gray-400' },
      { title: 'Lavado Iniciado (En Proceso)', date: '03/06/2026 — 10:00', active: true, color: 'bg-blue-400' },
      { title: 'Empaquetado y Colgado (Listo)', date: '03/06/2026 — 11:30', active: true, color: 'bg-green-500 animate-pulse' }
    ]
  },
  {
    id: '120',
    date: '05/06/2026 • 08:30',
    status: 'Ingresado',
    paymentStatus: 'Pagado',
    cliente: 'Ricardo Darín',
    services: [
      { name: 'Lavado Completo Económico', price: 12500.0 }
    ],
    subtotal: 12500.0,
    tax: 0.0,
    total: 12500.0,
    paymentMethod: 'Efectivo Mostrador',
    paymentDate: '05/06/2026 - 08:32',
    trazabilidad: [
      { title: 'Orden Recibida (Pendiente)', date: '05/06/2026 — 08:30', active: true, color: 'bg-amber-500 animate-pulse' }
    ]
  },
  {
    id: '124',
    date: '05/06/2026 • 10:15',
    status: 'En proceso',
    paymentStatus: 'Pagado',
    cliente: 'Martín Fierro',
    services: [
      { name: 'Lavado Completo Premium', price: 15730.0 }
    ],
    subtotal: 15730.0,
    tax: 0.0,
    total: 15730.0,
    paymentMethod: 'Transferencia',
    paymentDate: '05/06/2026 - 10:18',
    trazabilidad: [
      { title: 'Orden Recibida (Pendiente)', date: '05/06/2026 — 10:15', active: true, color: 'bg-gray-400' },
      { title: 'Lavado Iniciado (En Proceso)', date: '05/06/2026 — 10:45', active: true, color: 'bg-blue-500 animate-pulse' }
    ]
  }
];

const INITIAL_INSUMOS = [
  { id: 1, nombre: 'Detergente Industrial', cantidad: 450, alerta: 100, costo: 2455 },
  { id: 2, nombre: 'Suavizante Premium', cantidad: 98, alerta: 100, costo: 18450 },
  { id: 3, nombre: 'Quita Manchas Activo', cantidad: 14, alerta: 10, costo: 5100 }
];

const INITIAL_USUARIOS = [
  { id: 1, nombre: 'Martín Fierro', DNI: '31.945.321', email: 'martin.fierro@gmail.com', telefono: '3515123456', rol: 'cliente' },
  { id: 2, nombre: 'Carlos Monzón', DNI: '14.223.554', email: 'carlos.monzon@gmail.com', telefono: '3515987654', rol: 'cliente' },
  { id: 3, nombre: 'Gastón Pauls', DNI: '28.431.909', email: 'gaston.pauls@gmail.com', telefono: '3515456789', rol: 'cliente' },
  { id: 4, nombre: 'Ramiro Palacios', DNI: '35.844.112', email: 'ramiro.p@gmail.com', telefono: '3515987654', rol: 'operador' },
  { id: 5, nombre: 'Santiago Noel', DNI: '39.112.455', email: 'santiago@gmail.com', telefono: '3515456789', rol: 'administrador' }
];

const INITIAL_SERVICIOS = [
  {
    id: 1,
    nombre: 'Lavado Canasto Económico',
    precio: 4000.0,
    unidad: 'Canasto',
    modalidad: 'Económico',
    insumos: [
      { insumoId: 1, nombre: 'Detergente Industrial', cantidad: 200, unidadMedida: 'ml' }
    ]
  },
  {
    id: 2,
    nombre: 'Limpieza Acolchado Estándar',
    precio: 13730.0,
    unidad: 'Acolchado',
    modalidad: 'Estándar',
    insumos: [
      { insumoId: 1, nombre: 'Detergente Industrial', cantidad: 250, unidadMedida: 'ml' },
      { insumoId: 2, nombre: 'Suavizante Premium', cantidad: 150, unidadMedida: 'ml' },
      { insumoId: 3, nombre: 'Quita Manchas Activo', cantidad: 50, unidadMedida: 'gr' }
    ]
  },
  {
    id: 3,
    nombre: 'Lavado Calzado Especial',
    precio: 4500.0,
    unidad: 'Calzado',
    modalidad: 'Delicado',
    insumos: [
      { insumoId: 1, nombre: 'Detergente Industrial', cantidad: 100, unidadMedida: 'ml' },
      { insumoId: 3, nombre: 'Quita Manchas Activo', cantidad: 30, unidadMedida: 'gr' }
    ]
  }
];

const INITIAL_RECLAMOS = [
  { id: '012', pedidoId: '101', cliente: 'Ricardo Darín', status: 'En Revisión', categoria: 'Prenda Dañada o Manchada', fecha: '05/06/2026' },
  { id: '005', pedidoId: '085', cliente: 'Mirtha Legrand', status: 'Resuelto', categoria: 'Error en el Cobro / Precio', fecha: '26/05/2026' }
];

const INITIAL_MENSAJES = {
  '012': [
    { id: 1, sender: 'cliente', text: 'Buenas tardes, acabo de recibir mi pedido #101 y noto que mi camisa blanca tiene una mancha gris en el puño izquierdo.', time: '05/06/2026 — 14:22' },
    { id: 2, sender: 'soporte', text: 'Hola Ricardo. Lamentamos mucho el inconveniente. Por favor, ¿podrías enviarnos una foto de la prenda afectada para abrir la auditoría?', time: '05/06/2026 — 14:25' }
  ],
  '005': [
    { id: 1, sender: 'cliente', text: 'Se me cobró doble el cargo impositivo.', time: '26/05/2026 — 18:00' },
    { id: 2, sender: 'soporte', text: 'El problema ha sido corregido y se le reembolsará la diferencia.', time: '26/05/2026 — 18:10' }
  ]
};

// --- CLIENTE API EXPORTADO (Simulación del Backend) ---

export const api = {
  // === PEDIDOS (GET /pedidos, GET /pedidos/{id}, PUT /pedidos/{id}, POST /pedidos, etc) ===
  async getPedidos(userRole, clientName = '') {
    await delay();
    const list = getStorageItem('api_pedidos', INITIAL_PEDIDOS);
    if (userRole === 'cliente') {
      return list.filter((p) => p.cliente === clientName);
    }
    return list;
  },

  async getPedidoById(id) {
    await delay();
    const list = getStorageItem('api_pedidos', INITIAL_PEDIDOS);
    return list.find((p) => p.id === id) || null;
  },

  async updatePedido(id, data) {
    await delay();
    const list = getStorageItem('api_pedidos', INITIAL_PEDIDOS);
    const updated = list.map((p) => {
      if (p.id === id) {
        // Generar un registro de trazabilidad si cambia el estado
        const newTrazabilidad = [...(p.trazabilidad || [])];
        if (data.status && data.status !== p.status) {
          const colorMap = {
            'Ingresado': 'bg-amber-500 animate-pulse',
            'En proceso': 'bg-blue-500 animate-pulse',
            'Listo': 'bg-green-500 animate-pulse',
            'Entregado': 'bg-emerald-600'
          };
          newTrazabilidad.push({
            title: `Orden Actualizada a: ${data.status}`,
            date: new Date().toLocaleString('es-AR'),
            active: true,
            color: colorMap[data.status] || 'bg-gray-400'
          });
        }
        return { ...p, ...data, trazabilidad: newTrazabilidad };
      }
      return p;
    });
    setStorageItem('api_pedidos', updated);
    return updated.find((p) => p.id === id);
  },

  async deletePedido(id) {
    await delay();
    const list = getStorageItem('api_pedidos', INITIAL_PEDIDOS);
    const filtered = list.filter((p) => p.id !== id);
    setStorageItem('api_pedidos', filtered);
    return true;
  },

  async addPedido(data) {
    await delay();
    const list = getStorageItem('api_pedidos', INITIAL_PEDIDOS);
    const newPedido = {
      id: (Math.floor(Math.random() * 900) + 100).toString(),
      date: new Date().toLocaleDateString('es-AR') + ' • ' + new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      status: 'Ingresado',
      paymentStatus: 'Deuda',
      trazabilidad: [
        { title: 'Orden Recibida (Pendiente)', date: new Date().toLocaleString('es-AR'), active: true, color: 'bg-amber-500 animate-pulse' }
      ],
      ...data
    };
    list.unshift(newPedido);
    setStorageItem('api_pedidos', list);
    return newPedido;
  },

  // === INSUMOS (GET /insumos, POST /insumos, PUT /insumos/{id}, DELETE /insumos/{id}) ===
  async getInsumos() {
    await delay();
    return getStorageItem('api_insumos', INITIAL_INSUMOS);
  },

  async addInsumo(data) {
    await delay();
    const list = getStorageItem('api_insumos', INITIAL_INSUMOS);
    const newItem = {
      id: Date.now(),
      ...data
    };
    list.push(newItem);
    setStorageItem('api_insumos', list);
    return newItem;
  },

  async updateInsumo(id, data) {
    await delay();
    const list = getStorageItem('api_insumos', INITIAL_INSUMOS);
    const updated = list.map((item) => (item.id === id ? { ...item, ...data } : item));
    setStorageItem('api_insumos', updated);
    return updated.find((item) => item.id === id);
  },

  async deleteInsumo(id) {
    await delay();
    const list = getStorageItem('api_insumos', INITIAL_INSUMOS);
    const filtered = list.filter((item) => item.id !== id);
    setStorageItem('api_insumos', filtered);
    return true;
  },

  // === USUARIOS (GET /usuarios, POST /usuarios, PUT /usuarios/{id}, DELETE /usuarios/{id}) ===
  async getUsuarios() {
    await delay();
    return getStorageItem('api_usuarios', INITIAL_USUARIOS);
  },

  async addUsuario(data) {
    await delay();
    const list = getStorageItem('api_usuarios', INITIAL_USUARIOS);
    const newItem = {
      id: Date.now(),
      ...data
    };
    list.push(newItem);
    setStorageItem('api_usuarios', list);
    return newItem;
  },

  async updateUsuario(id, data) {
    await delay();
    const list = getStorageItem('api_usuarios', INITIAL_USUARIOS);
    const updated = list.map((item) => (item.id === id ? { ...item, ...data } : item));
    setStorageItem('api_usuarios', updated);
    return updated.find((item) => item.id === id);
  },

  async deleteUsuario(id) {
    await delay();
    const list = getStorageItem('api_usuarios', INITIAL_USUARIOS);
    const filtered = list.filter((item) => item.id !== id);
    setStorageItem('api_usuarios', filtered);
    return true;
  },

  // === SERVICIOS (GET /servicios, POST /servicios, PUT /servicios/{id}, DELETE /servicios/{id}) ===
  async getServicios() {
    await delay();
    return getStorageItem('api_servicios', INITIAL_SERVICIOS);
  },

  async addServicio(data) {
    await delay();
    const list = getStorageItem('api_servicios', INITIAL_SERVICIOS);
    const newItem = {
      id: Date.now(),
      ...data
    };
    list.push(newItem);
    setStorageItem('api_servicios', list);
    return newItem;
  },

  async updateServicio(id, data) {
    await delay();
    const list = getStorageItem('api_servicios', INITIAL_SERVICIOS);
    const updated = list.map((item) => (item.id === id ? { ...item, ...data } : item));
    setStorageItem('api_servicios', updated);
    return updated.find((item) => item.id === id);
  },

  async deleteServicio(id) {
    await delay();
    const list = getStorageItem('api_servicios', INITIAL_SERVICIOS);
    const filtered = list.filter((item) => item.id !== id);
    setStorageItem('api_servicios', filtered);
    return true;
  },

  // === RECLAMOS (GET /reclamos, GET /reclamos/{id}/mensajes, POST /reclamos/{id}/mensajes, POST /reclamos) ===
  async getReclamos(userRole, clientName = '') {
    await delay();
    const list = getStorageItem('api_reclamos', INITIAL_RECLAMOS);
    if (userRole === 'cliente') {
      return list.filter((c) => c.cliente === clientName);
    }
    return list;
  },

  async getReclamoMensajes(claimId) {
    await delay();
    const mensajes = getStorageItem('api_mensajes_reclamos', INITIAL_MENSAJES);
    return mensajes[claimId] || [];
  },

  async addReclamoMensaje(claimId, sender, text) {
    await delay();
    const mensajes = getStorageItem('api_mensajes_reclamos', INITIAL_MENSAJES);
    if (!mensajes[claimId]) {
      mensajes[claimId] = [];
    }
    const newMsg = {
      id: Date.now(),
      sender,
      text,
      time: new Date().toLocaleDateString('es-AR') + ' — ' + new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
    };
    mensajes[claimId].push(newMsg);
    setStorageItem('api_mensajes_reclamos', mensajes);
    return newMsg;
  },

  async addReclamo(data) {
    await delay();
    const list = getStorageItem('api_reclamos', INITIAL_RECLAMOS);
    const newClaim = {
      id: (Math.floor(Math.random() * 900) + 100).toString(),
      fecha: new Date().toLocaleDateString('es-AR'),
      status: 'En Revisión',
      ...data
    };
    list.unshift(newClaim);
    setStorageItem('api_reclamos', list);
    return newClaim;
  },

  async updateReclamo(id, status) {
    await delay();
    const list = getStorageItem('api_reclamos', INITIAL_RECLAMOS);
    const updated = list.map((c) => (c.id === id ? { ...c, status } : c));
    setStorageItem('api_reclamos', updated);
    return updated.find((c) => c.id === id);
  }
};

