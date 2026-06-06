import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

export default function Perfil() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return null;

  const isClient = user.rol === 'cliente';
  const isOperator = user.rol === 'operador';
  const isAdmin = user.rol === 'administrador';

  // Configuración de datos ficticios según el rol
  const getProfileData = () => {
    if (isClient) {
      return {
        nombre: 'Ricardo',
        apellido: 'Darín',
        dni: '30.123.456',
        telefono: '+54 9 351 1234567',
        email: 'ricardodarin@gmail.com',
        qrData: 'LAVAPRO-USR-3-30123456',
        subtitle: 'Cliente Registrado LavaPro',
      };
    } else if (isOperator) {
      return {
        nombre: 'Ramiro',
        apellido: 'P.',
        dni: '20.123.987',
        telefono: '+54 9 351 1239876',
        email: 'ramiro.op@lavapro.com',
        subtitle: 'Operador de Planta de Lavado',
      };
    } else {
      // Admin
      return {
        nombre: 'Santiago',
        apellido: '',
        dni: '20.987.654',
        telefono: '+54 9 351 9876543',
        email: 'santiago.admin@lavapro.com',
        subtitle: 'Administrador General',
      };
    }
  };

  const profile = getProfileData();
  const badgeColor = isAdmin 
    ? 'bg-purple-50 text-purple-600 border-purple-100' 
    : isOperator 
      ? 'bg-amber-50 text-amber-700 border-amber-100' 
      : 'bg-blue-50 text-blue-600 border-blue-100';

  return (
    <div className="flex-1 flex flex-col justify-start space-y-5 overflow-y-auto pr-1">
      {/* Tarjeta del Código QR (Solo para Cliente) */}
      {isClient ? (
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-4 text-center text-white shadow-md flex flex-col items-center justify-center space-y-2.5 shrink-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">
            Tu QR de Retiro y Entrega
          </p>

          <div className="bg-white p-2.5 rounded-xl shadow-inner inline-block">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${profile.qrData}`}
              alt="QR Usuario"
              className="w-28 h-28 mx-auto"
            />
          </div>

          <div className="text-center">
            <h3 className="text-base font-black tracking-tight">
              {profile.nombre} {profile.apellido}
            </h3>
            <p className="text-[11px] text-blue-100 font-medium opacity-90">
              {profile.subtitle}
            </p>
          </div>
        </div>
      ) : (
        /* Tarjeta de Encabezado Simple para Staff */
        <div className="bg-gradient-to-br from-gray-800 to-gray-950 rounded-2xl p-4 text-center text-white shadow-md flex flex-col items-center justify-center space-y-2 shrink-0">
          <span className={`text-[9px] border px-2 py-0.5 rounded-md font-black uppercase tracking-wide ${badgeColor}`}>
            {user.rol}
          </span>
          <div className="text-center">
            <h3 className="text-base font-black tracking-tight">
              {profile.nombre} {profile.apellido}
            </h3>
            <p className="text-[11px] text-gray-300 font-medium opacity-90">
              {profile.subtitle}
            </p>
          </div>
        </div>
      )}

      {/* Sección de Campos */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
          Información de la Cuenta
        </h4>

        <div className="bg-white border rounded-xl p-3.5 space-y-3 shadow-sm text-xs font-semibold text-gray-800">
          <div className="flex justify-between items-center border-b pb-2.5">
            <span className="text-gray-400 font-medium">Nombre Completo</span>
            <span className="text-gray-900">{profile.nombre} {profile.apellido}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-2.5">
            <span className="text-gray-400 font-medium">Documento (DNI)</span>
            <span className="text-gray-900 font-mono">{profile.dni}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-2.5">
            <span className="text-gray-400 font-medium">Teléfono de Contacto</span>
            <span className="text-gray-900">{profile.telefono}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-medium">Correo Electrónico</span>
            <span className="text-gray-900">{profile.email}</span>
          </div>
        </div>
      </div>

      {/* Acción de Edición */}
      <div className="pt-1">
        <Button
          onClick={() => navigate('/perfil/editar')}
          variant="primary"
        >
          Editar Datos del Perfil
        </Button>
      </div>
    </div>
  );
}
