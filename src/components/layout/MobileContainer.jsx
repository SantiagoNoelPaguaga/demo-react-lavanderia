
export default function MobileContainer({ children, className = "", padding = "p-6" }) {
  return (
    <div
      className={`w-full min-h-screen sm:min-h-[780px] bg-white flex flex-col justify-between ${padding} max-w-sm mx-auto sm:shadow-2xl sm:rounded-2xl border border-gray-100 relative ${className}`}
    >
      {children}
    </div>
  );
}
