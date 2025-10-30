import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TripCard from '../components/TripCard';
import { useMockData } from '../hooks/useMockData';
import { Filter, X } from 'lucide-react';
import type { Trip } from '../types';

const Trips: React.FC = () => {
  const { trips } = useMockData();
  const navigate = useNavigate();
  const [originFilter, setOriginFilter] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');

  const origins = useMemo(() => [...new Set(trips.map(trip => trip.origin))], [trips]);
  const destinations = useMemo(() => [...new Set(trips.map(trip => trip.destination))], [trips]);

  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      const originMatch = originFilter ? trip.origin === originFilter : true;
      const destinationMatch = destinationFilter ? trip.destination === destinationFilter : true;
      const timeMatch = timeFilter ? trip.departureTime >= timeFilter : true;
      return originMatch && destinationMatch && timeMatch;
    });
  }, [trips, originFilter, destinationFilter, timeFilter]);

  const handleClearFilters = () => {
    setOriginFilter('');
    setDestinationFilter('');
    setTimeFilter('');
  };

  const handlePurchase = (trip: Trip) => {
    navigate('/comprar', { state: { selectedTrip: trip } });
  };
  
  const areFiltersActive = originFilter || destinationFilter || timeFilter;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-full">
      <Header title="Próximas Viagens" />
      <div className="p-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#003366] dark:text-gray-100 flex items-center gap-2">
              <Filter size={20} />
              Filtrar Viagens
            </h3>
            {areFiltersActive && (
              <button 
                onClick={handleClearFilters}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 font-semibold"
                aria-label="Limpar filtros"
              >
                <X size={16} />
                Limpar
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Origem</label>
              <select
                id="origin"
                value={originFilter}
                onChange={(e) => setOriginFilter(e.target.value)}
                className="w-full p-2 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#00AEEF] focus:border-[#00AEEF]"
              >
                <option value="">Todas</option>
                {origins.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Destino</label>
              <select
                id="destination"
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                className="w-full p-2 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#00AEEF] focus:border-[#00AEEF]"
              >
                <option value="">Todos</option>
                {destinations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">A partir de</label>
              <input
                type="time"
                id="time"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full p-2 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#00AEEF] focus:border-[#00AEEF]"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredTrips.length > 0 ? (
            filteredTrips.map(trip => (
              <TripCard key={trip.id} trip={trip} onPurchase={handlePurchase} />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600 dark:text-gray-400">Nenhuma viagem encontrada com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trips;