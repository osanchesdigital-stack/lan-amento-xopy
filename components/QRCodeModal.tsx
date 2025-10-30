import React from 'react';
import { X } from 'lucide-react';

interface QRCodeModalProps {
  qrCodeData: string;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ qrCodeData, onClose }) => {
  if (!qrCodeData) return null;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrCodeData)}`;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold text-[#003366] dark:text-gray-100 mb-4">Seu QR Code de Embarque</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Apresente este código no momento do embarque.</p>
        <img src={qrCodeUrl} alt="QR Code de Embarque" className="mx-auto bg-white p-2 rounded-md" />
      </div>
    </div>
  );
};

export default QRCodeModal;