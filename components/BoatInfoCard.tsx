import React from 'react';
import type { Boat } from '../types';
import { Users, Timer, ShieldCheck, ShieldAlert } from 'lucide-react';

interface BoatInfoCardProps {
  boat: Boat;
}

const BoatInfoCard: React.FC<BoatInfoCardProps> = ({ boat }) => {
  const statusColor = boat.status === 'Operando' ? 'text-green-500' : 'text-yellow-500';
  const StatusIcon = boat.status === 'Operando' ? ShieldCheck : ShieldAlert;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <img src={boat.imageUrl} alt={boat.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-[#003366] dark:text-gray-100 mb-2">{boat.name}</h3>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>Capacidade: {boat.capacity} passageiros</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer size={16} />
            <span>Tempo médio de viagem: {boat.travelTime}</span>
          </div>
          <div className={`flex items-center gap-2 font-semibold ${statusColor}`}>
            <StatusIcon size={16} />
            <span>Status: {boat.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoatInfoCard;