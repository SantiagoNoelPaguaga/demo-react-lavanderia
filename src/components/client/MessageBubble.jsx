
export default function MessageBubble({ message }) {
  const isMe = message.sender === 'client';

  if (isMe) {
    return (
      <div className="flex flex-col items-end space-y-1 max-w-[85%] ml-auto">
        <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none p-3 shadow-sm text-xs font-medium leading-relaxed">
          {message.text}
        </div>
        <span className="text-[9px] text-gray-400 font-semibold mr-1">
          {message.timestamp} (Tú)
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start space-y-1 max-w-[85%] mr-auto">
      <div className="bg-white border text-gray-800 rounded-2xl rounded-tl-none p-3 shadow-sm text-xs font-medium leading-relaxed">
        {message.text}
      </div>
      <span className="text-[9px] text-gray-400 font-semibold ml-1">
        {message.timestamp} ({message.senderName || 'Soporte LavaPro'})
      </span>
    </div>
  );
}
