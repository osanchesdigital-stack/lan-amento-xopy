import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useMockData } from '../hooks/useMockData';
import type { Trip } from '../types';
import { ArrowLeft, CheckCircle, Minus, Plus, Car } from 'lucide-react';

const Purchase: React.FC = () => {
  const { trips } = useMockData();
  const location = useLocation();
  
  const initialTrip = (location.state?.selectedTrip as Trip) || null;
  
  const [step, setStep] = useState(initialTrip ? 2 : 1);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(initialTrip);
  const [passengers, setPassengers] = useState(1);
  const [includeVehicle, setIncludeVehicle] = useState(false);
  const [vehicleType, setVehicleType] = useState<'pequeno' | 'grande'>('pequeno');
  const [licensePlate, setLicensePlate] = useState('');

  const VEHICLE_PRICES = {
    pequeno: 80,
    grande: 120,
  };

  const vehiclePrice = includeVehicle ? VEHICLE_PRICES[vehicleType] : 0;
  const totalPrice = selectedTrip ? (selectedTrip.price * passengers) + vehiclePrice : 0;
  const isPurchaseDisabled = includeVehicle && !licensePlate.trim();

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    setStep(2);
  };

  const handleConfirmPurchase = () => {
    // In a real app, this would involve payment processing.
    setStep(3);
  };
  
  const resetFlow = () => {
    setStep(1);
    setSelectedTrip(null);
    setPassengers(1);
    setIncludeVehicle(false);
    setVehicleType('pequeno');
    setLicensePlate('');
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-full">
      <Header title="Comprar Passagem" />
      <div className="p-6">
        {step > 1 && step < 3 && (
            <button onClick={() => initialTrip ? window.history.back() : setStep(step - 1)} className="flex items-center gap-2 text-[#003366] dark:text-gray-300 font-semibold mb-6">
                <ArrowLeft size={18} />
                Voltar
            </button>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">1. Selecione a sua viagem</h2>
            <div className="space-y-3">
              {trips.filter(t => t.availableSeats > 0).map(trip => (
                <div key={trip.id} onClick={() => handleSelectTrip(trip)} className="bg-white dark:bg-gray-800 p-3 rounded-lg border dark:border-gray-700 cursor-pointer hover:border-[#00AEEF] dark:hover:border-[#00AEEF]">
                  <p className="font-bold">{trip.origin} → {trip.destination}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{trip.departureTime} - {trip.arrivalTime}</p>
                  <p className="text-sm font-semibold mt-1">R$ {trip.price.toFixed(2).replace('.', ',')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && selectedTrip && (
          <div>
            <h2 className="text-xl font-semibold mb-4">2. Detalhes da Compra</h2>
            {/* Trip Summary */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 mb-6">
              <p className="font-bold text-lg">{selectedTrip.origin} → {selectedTrip.destination}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{selectedTrip.departureTime} - {selectedTrip.arrivalTime}</p>
            </div>
            
            {/* Passengers */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 mb-6">
                <label className="block text-md font-semibold mb-2 text-center">Quantidade de Passageiros</label>
                <div className="flex items-center justify-center gap-4 mt-2">
                    <button
                    onClick={() => setPassengers(p => Math.max(1, p - 1))}
                    disabled={passengers <= 1}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-[#003366] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-all"
                    aria-label="Diminuir quantidade de passageiros"
                    >
                    <Minus size={20} />
                    </button>
                    <span 
                    className="text-2xl font-bold bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg w-20 h-12 flex items-center justify-center text-[#003366] dark:text-gray-100"
                    aria-live="polite"
                    >
                    {passengers}
                    </span>
                    <button
                    onClick={() => setPassengers(p => Math.min(selectedTrip.availableSeats, p + 1))}
                    disabled={passengers >= selectedTrip.availableSeats}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-[#003366] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-all"
                    aria-label="Aumentar quantidade de passageiros"
                    >
                    <Plus size={20} />
                    </button>
                </div>
            </div>

            {/* Vehicle */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 mb-6">
                <div className="flex items-center justify-between">
                    <label htmlFor="includeVehicle" className="text-md font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        <Car size={20} />
                        Adicionar Veículo
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            id="includeVehicle" 
                            checked={includeVehicle}
                            onChange={() => setIncludeVehicle(!includeVehicle)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#00AEEF]"></div>
                    </label>
                </div>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${includeVehicle ? 'max-h-96 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600' : 'max-h-0'}`}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tamanho do Veículo</label>
                        <div className="flex gap-4">
                            <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition-all ${vehicleType === 'pequeno' ? 'border-[#00AEEF] bg-blue-50 dark:bg-blue-900/50 ring-2 ring-[#00AEEF]' : 'border-gray-300 dark:border-gray-600'}`}>
                                <input type="radio" name="vehicleType" value="pequeno" checked={vehicleType === 'pequeno'} onChange={() => setVehicleType('pequeno')} className="sr-only" />
                                <span className="font-semibold">Pequeno</span>
                                <span className="block text-xs text-gray-500 dark:text-gray-400">R$ {VEHICLE_PRICES.pequeno.toFixed(2).replace('.',',')}</span>
                            </label>
                            <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition-all ${vehicleType === 'grande' ? 'border-[#00AEEF] bg-blue-50 dark:bg-blue-900/50 ring-2 ring-[#00AEEF]' : 'border-gray-300 dark:border-gray-600'}`}>
                                <input type="radio" name="vehicleType" value="grande" checked={vehicleType === 'grande'} onChange={() => setVehicleType('grande')} className="sr-only" />
                                <span className="font-semibold">Grande</span>
                                <span className="block text-xs text-gray-500 dark:text-gray-400">R$ {VEHICLE_PRICES.grande.toFixed(2).replace('.',',')}</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Placa do Veículo</label>
                        <input 
                            type="text"
                            id="licensePlate"
                            value={licensePlate}
                            onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                            placeholder="ABC1D23"
                            className="w-full p-2 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#00AEEF] focus:border-[#00AEEF]"
                            required={includeVehicle}
                        />
                    </div>
                </div>
            </div>

            {/* Total */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 mb-6">
                <div className="flex justify-between items-center text-gray-700 dark:text-gray-300 mb-2">
                    <span>{passengers} x Passageiro(s)</span>
                    <span>R$ {(selectedTrip.price * passengers).toFixed(2).replace('.', ',')}</span>
                </div>
                {includeVehicle && (
                    <div className="flex justify-between items-center text-gray-700 dark:text-gray-300 mb-2 transition-opacity duration-300">
                        <span>Veículo ({vehicleType})</span>
                        <span>R$ {vehiclePrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                )}
                <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>
                <div className="flex justify-between items-center text-2xl font-bold text-[#003366] dark:text-gray-100">
                    <span>Total</span>
                    <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>

            <button 
                onClick={handleConfirmPurchase} 
                disabled={isPurchaseDisabled}
                className="w-full bg-[#00AEEF] text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmar Compra
            </button>
          </div>
        )}

        {step === 3 && (
            <div className="text-center py-10">
                <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#003366] dark:text-gray-100 mb-2">Compra Realizada!</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {includeVehicle 
                        ? 'Sua passagem e o transporte do seu veículo foram confirmados com sucesso.'
                        : 'Sua passagem foi comprada com sucesso.'
                    }
                    {' '}Você pode encontrar os detalhes na aba 'Histórico'.
                </p>
                <button onClick={resetFlow} className="bg-[#003366] text-white py-2 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                    Comprar Outra Passagem
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Purchase;
