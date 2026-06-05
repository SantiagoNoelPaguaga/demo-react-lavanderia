
export default function Dashboard() {
  const currentDate = new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, ' / ');

  const stats = [
    { label: 'Ingresado', value: 1 },
    { label: 'En proceso', value: 0 },
    { label: 'Listo', value: 0 },
  ];

  return (
    <div className="flex-1 flex flex-col justify-start space-y-4 pt-2 overflow-y-auto">
      <div className="border-2 border-blue-600 rounded-xl p-4 bg-blue-50/30 shadow-sm">
        <h3 className="text-xl font-black text-blue-900 tracking-tight">
          Hola Ricardo Darín
        </h3>
      </div>

      <div className="bg-gray-100 rounded-lg py-2 px-4 text-center">
        <p className="text-xs font-semibold text-gray-600 tracking-wide">
          {currentDate}
        </p>
      </div>

      <div className="space-y-3.5 pt-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col items-center justify-center transition-all hover:border-gray-300"
          >
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              {stat.label}
            </span>
            <span className="text-3xl font-black text-gray-900">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
