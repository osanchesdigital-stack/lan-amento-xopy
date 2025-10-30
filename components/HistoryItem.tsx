import React from 'react';
import type { Ticket } from '../types';
import { ArrowRight, Calendar, QrCode } from 'lucide-react';

interface HistoryItemProps {
  ticket: Ticket;
  onShowQrCode: (qrCodeData: string) => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ ticket, onShowQrCode }) => {
  const statusStyles = {
    'Válido': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    'Utilizado': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    'Expirado': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 text-md font-semibold text-[#003366] dark:text-gray-100">
            <span>{ticket.trip.origin}</span>
            <ArrowRight size={16} />
            <span>{ticket.trip.destination}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
            <Calendar size={14} />
            <span>{ticket.trip.departureTime} - {ticket.purchaseDate}</span>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusStyles[ticket.status]}`}>
          {ticket.status}
        </span>
      </div>
      {ticket.status === 'Válido' && (
        <div className="mt-4 border-t dark:border-gray-700 pt-3 flex justify-end">
          <button 
            onClick={() => onShowQrCode(ticket.qrCodeData)}
            className="flex items-center gap-2 bg-[#003366] text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-sm">
            <QrCode size={18} />
            Check-in Digital
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryItem;