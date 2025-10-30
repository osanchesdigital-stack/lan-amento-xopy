import React from 'react';
import Header from '../components/Header';
import BoatInfoCard from '../components/BoatInfoCard';
import { useMockData } from '../hooks/useMockData';

const Boats: React.FC = () => {
  const { boats } = useMockData();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-full">
      <Header title="Nossa Frota" />
      <div className="p-4 space-y-6">
        {boats.map(boat => (
          <BoatInfoCard key={boat.id} boat={boat} />
        ))}
      </div>
    </div>
  );
};

export default Boats;