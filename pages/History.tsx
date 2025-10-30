import React, { useState } from 'react';
import Header from '../components/Header';
import HistoryItem from '../components/HistoryItem';
import QRCodeModal from '../components/QRCodeModal';
import { useMockData } from '../hooks/useMockData';

const History: React.FC = () => {
  const { tickets } = useMockData();
  const [selectedQrCode, setSelectedQrCode] = useState<string | null>(null);
  
  const validTickets = tickets.filter(t => t.status === 'Válido');
  const pastTickets = tickets.filter(t => t.status !== 'Válido');

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-full">
      <Header title="Histórico de Viagens" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#003366] dark:text-gray-100 mb-3">Próximas Viagens</h2>
        <div className="space-y-4">
          {validTickets.length > 0 ? (
            validTickets.map(ticket => (
              <HistoryItem key={ticket.id} ticket={ticket} onShowQrCode={setSelectedQrCode} />
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">Nenhuma viagem futura encontrada.</p>
          )}
        </div>

        <h2 className="text-lg font-semibold text-[#003366] dark:text-gray-100 mt-8 mb-3">Viagens Anteriores</h2>
        <div className="space-y-4">
          {pastTickets.map(ticket => (
            <HistoryItem key={ticket.id} ticket={ticket} onShowQrCode={() => {}} />
          ))}
        </div>
      </div>
      {selectedQrCode && (
        <QRCodeModal qrCodeData={selectedQrCode} onClose={() => setSelectedQrCode(null)} />
      )}
    </div>
  );
};

export default History;