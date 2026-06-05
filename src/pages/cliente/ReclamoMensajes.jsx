import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import MessageBubble from '../../components/client/MessageBubble';
import StatusBadge from '../../components/ui/StatusBadge';

const initialChatsDb = {
  '012': {
    id: '012',
    pedidoId: '101',
    status: 'En Revisión',
    messages: [
      {
        sender: 'client',
        text: 'Hola, buenas tardes. Acabo de retirar el Pedido #101 y noté que uno de los pantalones negros tiene una mancha blanca en la rodilla que antes no estaba. ¿Me podrían dar una solución?',
        timestamp: '05/06/2026 • 14:25',
      },
      {
        sender: 'support',
        senderName: 'Soporte LavaPro',
        text: 'Hola Ricardo, buenas tardes. Lamentamos mucho el inconveniente. Ya pusimos tu caso bajo revisión y estamos chequeando las cámaras del área de lavado del operador encargado de tu orden. En breve te daremos una respuesta.',
        timestamp: '05/06/2026 • 15:10',
      },
      {
        sender: 'client',
        text: 'Dale, muchas gracias. Quedo a la espera de sus comentarios entonces.',
        timestamp: '05/06/2026 • 15:15',
      },
    ],
  },
};

export default function ReclamoMensajes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const claimData = initialChatsDb[id] || {
    id: id || '000',
    pedidoId: 'Desconocido',
    status: 'Resuelto',
    messages: [],
  };

  const [messages, setMessages] = useState(claimData.messages);
  const [inputText, setInputText] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const timeString = new Date().toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const dateString = new Date().toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const newMsg = {
      sender: 'client',
      text: inputText,
      timestamp: `${dateString} • ${timeString}`,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simular alerta de inserción de API
    setTimeout(() => {
      alert(
        'API: POST /reclamos/mensajes \nInserta texto con id_reclamo e id_usuario del cliente.'
      );
    }, 100);
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-gray-50/50 relative overflow-hidden">
      {/* HEADER SUPERIOR CHAT */}
      <div className="bg-white border-b p-4 flex items-center justify-between shadow-sm shrink-0 z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/cliente/reclamos')}
            className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors cursor-pointer"
            aria-label="Volver a soporte"
          >
            <ArrowLeft size={18} strokeWidth={3} />
          </button>
          <div>
            <h3 className="font-black text-gray-800 text-sm">
              Soporte Reclamo #{claimData.id}
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Pedido #{claimData.pedidoId}
            </p>
          </div>
        </div>
        <StatusBadge status={claimData.status} />
      </div>

      {/* ÁREA DE MENSAJES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center my-2">
          <span className="bg-gray-200/60 text-gray-500 font-bold text-[9px] px-2 py-1 rounded-md uppercase tracking-wider">
            Reclamo iniciado el 05/06/2026
          </span>
        </div>

        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* BARRA DE ENTRADA INFERIOR */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-white border-t flex items-center gap-2 shrink-0 shadow-inner z-10"
      >
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribí tu mensaje acá..."
            className="w-full bg-gray-100 border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none rounded-xl pl-4 pr-10 py-3 text-xs font-medium text-gray-800 transition-all placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          className="p-3 bg-black text-white hover:bg-gray-900 rounded-xl transition-all active:scale-95 shadow cursor-pointer flex items-center justify-center"
          aria-label="Enviar mensaje"
        >
          <Send size={14} strokeWidth={3} />
        </button>
      </form>
    </div>
  );
}
