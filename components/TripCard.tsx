import React from 'react';
import type { Trip } from '../types';
import { ArrowRight, Clock, Users, DollarSign } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
  onPurchase: (trip: Trip) => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onPurchase }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[#003366] dark:text-gray-100">{trip.origin}</h3>
        <ArrowRight className="text-[#00AEEF]" size={20} />
        <h3 className="text-lg font-semibold text-[#003366] dark:text-gray-100">{trip.destination}</h3>
      </div>
      <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{trip.departureTime} - {trip.arrivalTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={16} />
          <span>{trip.availableSeats} vagas</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl font-bold text-[#003366] dark:text-gray-100">
          <DollarSign size={20} />
          <span>{trip.price.toFixed(2).replace('.', ',')}</span>
        </div>
        <button 
          onClick={() => onPurchase(trip)}
          className="bg-[#00AEEF] text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-400 transition-colors shadow-sm">
          Comprar
        </button>
      </div>
    </div>
  );
};

export default TripCard;