import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useMockData } from '../hooks/useMockData';
import type { Trip, Passenger } from '../types';
import { ArrowLeft, UserCheck, UserX, ScanLine, CheckCircle, XCircle, Info } from 'lucide-react';

const EmployeeTripDetails: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const { trips, boats } = useMockData();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [scanResult, setScanResult] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null);

  useEffect(() => {
    const foundTrip = trips.find(t => t.id === tripId);
    if (foundTrip) {
      setTrip(JSON.parse(JSON.stringify(foundTrip))); // Deep copy to allow local state mutation
    }
  }, [tripId, trips]);

  const boat = useMemo(() => boats.find(b => b.id === trip?.boatId), [trip, boats]);
  const capacity = boat?.capacity ?? 0;
  
  const boardedPassengersCount = useMemo(() => trip?.passengers.filter(p => p.status === 'Embarcado').length ?? 0, [trip]);
  const occupancyPercentage = capacity > 0 ? (boardedPassengersCount / capacity) * 100 : 0;

  const handleScan = () => {
    if (!trip) return;

    // Simulation logic
    const outcomes = ['valid_pending', 'valid_boarded', 'invalid_code'];
    const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];

    let targetPassenger: Passenger | undefined;
    
    if (randomOutcome === 'valid_pending') {
      targetPassenger = trip.passengers.find(p => p.status === 'Pendente');
      if (targetPassenger) {
        updatePassengerStatus(targetPassenger.ticketId, 'Embarcado');
        setScanResult({ type: 'success', message: `Embarque confirmado para ${targetPassenger.user.name}.` });
      } else {
        setScanResult({ type: 'info', message: 'Todos os passageiros já embarcaram.' });
      }
    } else if (randomOutcome === 'valid_boarded') {
      targetPassenger = trip.passengers.find(p => p.status === 'Embarcado');
       if (targetPassenger) {
        setScanResult({ type: 'error', message: `Passageiro ${targetPassenger.user.name} já embarcou.` });
      } else {
         // Fallback if no one has boarded yet, simulate a pending scan instead
         const pendingPassenger = trip.passengers.find(p => p.status === 'Pendente');
         if (pendingPassenger) {
            updatePassengerStatus(pendingPassenger.ticketId, 'Embarcado');
            setScanResult({ type: 'success', message: `Embarque confirmado para ${pendingPassenger.user.name}.` });
         } else {
            setScanResult({ type: 'info', message: 'Nenhum passageiro pendente para embarcar.' });
         }
      }
    } else { // invalid_code
      setScanResult({ type: 'error', message: 'QR Code inválido ou não pertence a esta viagem.' });
    }
    
    setTimeout(() => setScanResult(null), 4000);
  };

  const updatePassengerStatus = (ticketId: string, status: 'Pendente' | 'Embarcado') => {
    setTrip(prevTrip => {
      if (!prevTrip) return null;
      const newPassengers = prevTrip.passengers.map(p => 
        p.ticketId === ticketId ? { ...p, status } : p
      );
      return { ...prevTrip, passengers: newPassengers };
    });
  };

  if (!trip) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-full">
        <Header title="Carregando..." />
        <div className="p-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">Viagem não encontrada ou sendo carregada.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-full">
      <Header title={`${trip.origin} → ${trip.destination}`} />
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#003366] dark:text-gray-300 font-semibold mb-6">
          <ArrowLeft size={18} />
          Voltar
        </button>

        {/* Scanner Section */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-[#003366] dark:text-gray-100 mb-4">Check-in de Passageiros</h3>
          
          <div className="relative w-full aspect-square max-w-xs mx-auto bg-black rounded-lg overflow-hidden mb-4 border-2 border-gray-700">
             <div className="absolute inset-0 flex items-center justify-center">
                <ScanLine size={100} className="text-gray-500 opacity-30" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="scanner-line absolute left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_2px_rgba(0,255,255,0.7)]"></div>
            </div>
          </div>

          <button
            onClick={handleScan}
            className="w-full bg-[#00AEEF] text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-blue-400 transition-colors flex items-center justify-center gap-2"
          >
            <ScanLine size={22} /> Simular Leitura de QR Code
          </button>
          
          {scanResult && (
            <div className={`mt-4 p-3 rounded-lg flex items-center gap-3 text-sm font-semibold
              ${scanResult.type === 'success' && 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'}
              ${scanResult.type === 'error' && 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}
              ${scanResult.type === 'info' && 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'}
            `}>
              {scanResult.type === 'success' && <CheckCircle size={20} />}
              {scanResult.type === 'error' && <XCircle size={20} />}
              {scanResult.type === 'info' && <Info size={20} />}
              {scanResult.message}
            </div>
          )}
        </div>

        {/* Occupancy and Passenger List */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
           <h3 className="text-lg font-semibold text-[#003366] dark:text-gray-100 mb-4">Passageiros a Bordo</h3>
           <div className="mb-4">
              <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                <span>Lotação Atual</span>
                <span className="font-bold">{boardedPassengersCount} / {capacity}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${occupancyPercentage}%` }}></div>
              </div>
            </div>

            <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto">
                {trip.passengers.sort((a, b) => a.user.name.localeCompare(b.user.name)).map(passenger => (
                    <li key={passenger.ticketId} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={passenger.user.avatarUrl} alt={passenger.user.name} className="w-10 h-10 rounded-full object-cover" />
                            <span className="font-medium text-gray-800 dark:text-gray-200">{passenger.user.name}</span>
                        </div>
                        {passenger.status === 'Embarcado' ? (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded-full">
                                <UserCheck size={14} /> Embarcado
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 rounded-full">
                                <UserX size={14} /> Pendente
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTripDetails;
