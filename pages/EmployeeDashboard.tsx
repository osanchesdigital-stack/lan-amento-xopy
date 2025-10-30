import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useMockData } from '../hooks/useMockData';
import { Ship, ChevronRight, Shield } from 'lucide-react';
import AdminLoginModal from '../components/AdminLoginModal';

const EmployeeDashboard: React.FC = () => {
  const { trips, boats } = useMockData();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const getBoatCapacity = (boatId: string) => {
    const boat = boats.find(b => b.id === boatId);
    return boat ? boat.capacity : 0;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-full">
      <Header title="Painel do Funcionário" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#003366] dark:text-gray-100">Viagens de Hoje</h2>
            <button
                onClick={() => setIsAdminModalOpen(true)}
                className="flex items-center gap-2 text-sm bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors shadow"
                title="Acessar Área Administrativa"
            >
                <Shield size={16} />
                <span>Área Admin</span>
            </button>
        </div>
        <div className="space-y-4">
          {trips.map(trip => {
            const capacity = getBoatCapacity(trip.boatId);
            const totalPassengers = trip.passengers.length;
            const percentage = capacity > 0 ? (totalPassengers / capacity) * 100 : 0;

            return (
              <Link to={`/funcionario/viagem/${trip.id}`} key={trip.id} className="block bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-[#00AEEF] transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 text-md font-semibold text-[#003366] dark:text-gray-100">
                      <span>{trip.origin}</span> &rarr; <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Ship size={14} />
                      <span>Partida: {trip.departureTime}</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    <span>Lotação</span>
                    <span className="font-bold">{totalPassengers} / {capacity}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-[#00AEEF] h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {isAdminModalOpen && (
        <AdminLoginModal onClose={() => setIsAdminModalOpen(false)} />
      )}
    </div>
  );
};

export default EmployeeDashboard;