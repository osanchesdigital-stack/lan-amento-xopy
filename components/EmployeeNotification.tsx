import React from 'react';
import { X, AlertTriangle, Info } from 'lucide-react';

interface EmployeeNotificationProps {
  message: string;
  type: 'warning' | 'info';
  onClose: () => void;
}

const typeStyles = {
  warning: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/50',
    text: 'text-yellow-800 dark:text-yellow-300',
    icon: <AlertTriangle size={20} />,
  },
  info: {
    bg: 'bg-blue-100 dark:bg-blue-900/50',
    text: 'text-blue-800 dark:text-blue-300',
    icon: <Info size={20} />,
  },
};

const EmployeeNotification: React.FC<EmployeeNotificationProps> = ({ message, type, onClose }) => {
  const styles = typeStyles[type];

  return (
    <div className={`w-full p-3 rounded-lg flex items-center gap-3 text-sm font-semibold shadow-lg animate-slide-up ${styles.bg} ${styles.text}`}>
      {styles.icon}
      <span className="flex-grow">{message}</span>
      <button onClick={onClose} className="hover:opacity-75 transition-opacity" aria-label="Fechar notificação">
        <X size={20} />
      </button>
    </div>
  );
};

export default EmployeeNotification;