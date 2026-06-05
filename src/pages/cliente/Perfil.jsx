import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function Perfil() {
  const navigate = useNavigate();

  const userInfo = {
    nombre: 'Ricardo',
    apellido: 'Darín',
    dni: '30.123.456',
    telefono: '+54 9 351 1234567',
    email: 'ricardodarin@gmail.com',
    qrData: 'LAVAPRO-USR-3-30123456',
  };

  return (
    <div className="flex-1 flex flex-col justify-start space-y-5 overflow-y-auto pr-1">
      {/* Tarjeta del Código QR Unificado */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-4 text-center text-white shadow-md flex flex-col items-center justify-center space-y-2.5 shrink-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">
          Tu QR de Retiro y Entrega
        </p>

        <div className="bg-white p-2.5 rounded-xl shadow-inner inline-block">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${userInfo.qrData}`}
            alt="QR Usuario"
            className="w-28 h-28 mx-auto"
          />
        </div>

        <div className="text-center">
          <h3 className="text-base font-black tracking-tight">
            {userInfo.nombre} {userInfo.apellido}
          </h3>
          <p className="text-[11px] text-blue-100 font-medium opacity-90">
            Cliente Registrado LavaPro
          </p>
        </div>
      </div>

      {/* Sección de Campos */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
          Información Personal
        </h4>

        <div className="bg-white border rounded-xl p-3.5 space-y-3 shadow-sm text-xs font-semibold text-gray-800">
          <div className="flex justify-between items-center border-b pb-2.5">
            <span className="text-gray-400 font-medium">Nombre Completo</span>
            <span className="text-gray-900">{userInfo.nombre} {userInfo.apellido}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-2.5">
            <span className="text-gray-400 font-medium">Documento (DNI)</span>
            <span className="text-gray-900 font-mono">{userInfo.dni}</span>
          </div>

          <div className="flex justify-between items-center border-b pb-2.5">
            <span className="text-gray-400 font-medium">Teléfono de Contacto</span>
            <span className="text-gray-900">{userInfo.telefono}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-medium">Correo Electrónico</span>
            <span className="text-gray-900">{userInfo.email}</span>
          </div>
        </div>
      </div>

      {/* Acción de Edición */}
      <div className="pt-1">
        <Button
          onClick={() => navigate('/cliente/perfil/editar')}
          variant="primary"
        >
          Editar Datos del Perfil
        </Button>
      </div>
    </div>
  );
}
