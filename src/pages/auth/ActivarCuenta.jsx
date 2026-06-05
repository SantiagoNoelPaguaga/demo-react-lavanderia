import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import FloatingLabelInput from '../../components/ui/FloatingLabelInput';
import Button from '../../components/ui/Button';

export default function ActivarCuenta() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      'API: POST /auth/activate-account \nEnvía el token de la URL y la contraseña ingresada. \nCambia cuenta_activa a true y hace el hash. Redirigiendo al login...'
    );
    navigate('/login');
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full min-h-[500px]">
      {/* Branding Superior */}
      <div className="text-center mt-6 shrink-0">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          LavaPro
        </h1>
        <p className="text-sm text-gray-500 mt-2 font-medium">
          Activación segura de usuario
        </p>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full opacity-60"></div>
      </div>

      {/* Formulario Central */}
      <div className="flex-1 flex flex-col justify-center my-8 shrink-0">
        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
          Establecer Contraseña
        </h2>
        <p className="text-xs text-gray-400 text-center mb-6 leading-relaxed px-4">
          Tu correo ya fue validado con éxito. Ingresá la clave que vas a usar
          para acceder al sistema.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingLabelInput
            label="Nueva contraseña (Mínimo 8 caracteres)"
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          <div className="pt-4">
            <Button type="submit" variant="primary">
              Activar Cuenta e Ingresar
            </Button>
          </div>
        </form>
      </div>

      {/* Footer Branding */}
      <div className="text-center mb-4 shrink-0">
        <p className="text-[10px] text-gray-400 font-bold tracking-widest">
          LAVAPRO • SEGURIDAD
        </p>
      </div>
    </div>
  );
}
