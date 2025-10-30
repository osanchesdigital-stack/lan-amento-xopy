import React from 'react';
import { ArrowUp } from 'lucide-react';

interface NewPostNotificationProps {
  count: number;
  onClick: () => void;
}

const NewPostNotification: React.FC<NewPostNotificationProps> = ({ count, onClick }) => {
  if (count === 0) return null;

  const message = count === 1 ? 'Ver 1 novo post' : `Ver ${count} novos posts`;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-30 flex justify-center">
        <button
          onClick={onClick}
          className="bg-[#00AEEF] text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-blue-400 transition-all transform hover:scale-105 flex items-center gap-2 animate-slide-down"
          aria-live="polite"
        >
            <ArrowUp size={16} />
            {message}
        </button>
    </div>
  );
};

export default NewPostNotification;