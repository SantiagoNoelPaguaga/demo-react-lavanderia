import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    // Coincidir ruta base para subrutas (ej: /cliente/pedidos/101 activa Pedidos)
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/cliente/dashboard',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="9"></rect>
          <rect x="14" y="3" width="7" height="5"></rect>
          <rect x="14" y="12" width="7" height="9"></rect>
          <rect x="3" y="16" width="7" height="5"></rect>
        </svg>
      )
    },
    {
      name: 'Pedidos',
      path: '/cliente/pedidos',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      )
    },
    {
      name: 'Reclamos',
      path: '/cliente/reclamos',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <line x1="9" y1="15" x2="15" y2="15"></line>
        </svg>
      )
    },
    {
      name: 'Perfil',
      path: '/cliente/perfil',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-around items-center rounded-b-2xl shadow-inner z-50 shrink-0">
      {navItems.map((item) => {
        const active = isActive(item.path);
        return (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 min-w-[60px] cursor-pointer transition-colors ${
              active
                ? 'text-blue-600 font-bold text-[11px]'
                : 'text-gray-400 hover:text-blue-500 font-medium text-[11px]'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        );
      })}
    </div>
  );
}
