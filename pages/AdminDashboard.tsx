import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMockData } from '../hooks/useMockData';
import { ArrowLeft, LogOut, Ship, Calendar, BarChart2, Plus, Edit, Trash2, Users, DollarSign } from 'lucide-react';
import type { Boat, Trip } from '../types';
import AdminFormModal from '../components/AdminFormModal';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { logout, logoutAdmin } = useAuth();
    
    const { boats: initialBoats, trips: initialTrips } = useMockData();
    const [boats, setBoats] = useState<Boat[]>(initialBoats);
    const [trips, setTrips] = useState<Trip[]>(initialTrips);

    const [activeTab, setActiveTab] = useState<'boats' | 'trips' | 'reports'>('boats');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalEntityType, setModalEntityType] = useState<'boat' | 'trip'>('boat');
    const [editingEntity, setEditingEntity] = useState<Boat | Trip | null>(null);

    const handleAdminLogout = () => {
        logoutAdmin();
        navigate('/funcionario');
    };
    
    const handleFullLogout = () => {
        logout();
        navigate('/');
    };
    
    const openModal = (type: 'boat' | 'trip', entity: Boat | Trip | null = null) => {
        setModalEntityType(type);
        setEditingEntity(entity);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEntity(null);
    };

    const handleSave = (entity: Boat | Trip) => {
        if (modalEntityType === 'boat') {
            const boat = entity as Boat;
            if (editingEntity) { // Editing
                setBoats(boats.map(b => b.id === boat.id ? boat : b));
            } else { // Adding
                setBoats([...boats, boat]);
            }
        } else if (modalEntityType === 'trip') {
            const trip = entity as Trip;
             if (editingEntity) { // Editing
                setTrips(trips.map(t => t.id === trip.id ? trip : t));
            } else { // Adding
                setTrips([...trips, trip]);
            }
        }
        closeModal();
    };

    const handleDeleteBoat = (boatId: string) => {
        const boatName = boats.find(b => b.id === boatId)?.name || 'este barco';
        if(window.confirm(`Tem certeza que deseja excluir ${boatName}? Esta ação não pode ser desfeita.`)) {
            setBoats(currentBoats => currentBoats.filter(b => b.id !== boatId));
        }
    };

    const handleDeleteTrip = (tripId: string) => {
        const trip = trips.find(t => t.id === tripId);
        const tripName = trip ? `${trip.origin} → ${trip.destination}` : 'esta viagem';
        if(window.confirm(`Tem certeza que deseja excluir a viagem ${tripName}?`)) {
            setTrips(currentTrips => currentTrips.filter(t => t.id !== tripId));
        }
    };

    const TabButton: React.FC<{ tabId: 'boats' | 'trips' | 'reports'; currentTab: string; onClick: (tabId: 'boats' | 'trips' | 'reports') => void; children: React.ReactNode; icon: React.ElementType }> = ({ tabId, currentTab, onClick, children, icon: Icon }) => (
        <button
          onClick={() => onClick(tabId)}
          className={`flex-1 flex items-center justify-center gap-2 p-3 font-semibold transition-colors ${
            currentTab === tabId
              ? 'bg-[#003366] text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
            <Icon size={18} />
            {children}
        </button>
      );

    const reportTrips = [
        { route: 'Salvador → Morro (09:00)', boarded: 145, capacity: 150 },
        { route: 'Salvador → Morro (14:00)', boarded: 110, capacity: 150 },
        { route: 'Valença → Morro (10:30)', boarded: 75, capacity: 80 },
        { route: 'Morro → Salvador (11:30)', boarded: 45, capacity: 150 },
    ];

    const getOccupancyColor = (percentage: number) => {
        if (percentage > 90) return 'bg-green-500';
        if (percentage > 70) return 'bg-blue-500';
        return 'bg-yellow-500';
    };
    

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 max-w-lg mx-auto shadow-2xl dark:shadow-blue-900/50">
            <header className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-xl font-bold text-[#003366] dark:text-gray-100">Painel Admin</h1>
                <div className="flex items-center gap-4">
                    <button onClick={handleAdminLogout} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 font-semibold" title="Voltar para o painel de funcionário">
                        <ArrowLeft size={16} /> Painel
                    </button>
                    <button onClick={handleFullLogout} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-bold" title="Sair do sistema">
                        <LogOut size={16} /> Sair
                    </button>
                </div>
            </header>

            <main className="p-4">
                <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 mb-6">
                    <TabButton tabId="boats" currentTab={activeTab} onClick={setActiveTab} icon={Ship}>Barcos</TabButton>
                    <TabButton tabId="trips" currentTab={activeTab} onClick={setActiveTab} icon={Calendar}>Viagens</TabButton>
                    <TabButton tabId="reports" currentTab={activeTab} onClick={setActiveTab} icon={BarChart2}>Relatórios</TabButton>
                </div>

                {activeTab === 'boats' && (
                    <section aria-labelledby="manage-fleet-title">
                        <div className="flex justify-between items-center mb-4">
                            <h2 id="manage-fleet-title" className="text-lg font-semibold">Gerenciar Frota</h2>
                            <button onClick={() => openModal('boat')} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm">
                                <Plus size={18} /> Novo Barco
                            </button>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 divide-y dark:divide-gray-700">
                            {boats.map(boat => (
                                <div key={boat.id} className="p-3 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{boat.name} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(Cap: {boat.capacity})</span></p>
                                        <p className={`text-xs font-semibold ${boat.status === 'Operando' ? 'text-green-500' : 'text-yellow-500'}`}>{boat.status}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openModal('boat', boat)} aria-label={`Editar ${boat.name}`} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-full"><Edit size={16} /></button>
                                        <button onClick={() => handleDeleteBoat(boat.id)} aria-label={`Excluir ${boat.name}`} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-gray-700 rounded-full"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                
                {activeTab === 'trips' && (
                     <section aria-labelledby="manage-trips-title">
                        <div className="flex justify-between items-center mb-4">
                            <h2 id="manage-trips-title" className="text-lg font-semibold">Gerenciar Viagens</h2>
                            <button onClick={() => openModal('trip')} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm">
                                <Plus size={18} /> Nova Viagem
                            </button>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 divide-y dark:divide-gray-700">
                           {trips.map(trip => (
                                <div key={trip.id} className="p-3 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{trip.origin} &rarr; {trip.destination}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{trip.departureTime} - {trip.arrivalTime}</p>
                                    </div>
                                     <div className="flex gap-2">
                                        <button onClick={() => openModal('trip', trip)} aria-label={`Editar viagem de ${trip.origin} para ${trip.destination}`} className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-full"><Edit size={16} /></button>
                                        <button onClick={() => handleDeleteTrip(trip.id)} aria-label={`Excluir viagem de ${trip.origin} para ${trip.destination}`} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-gray-700 rounded-full"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                           ))}
                        </div>
                    </section>
                )}

                {activeTab === 'reports' && (
                     <section aria-labelledby="reports-title">
                        <h2 id="reports-title" className="text-lg font-semibold mb-4">Relatórios e Métricas</h2>
                        
                        {/* Key Metrics Cards */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                                <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                                    <h3 className="text-sm font-medium">Passageiros (Hoje)</h3>
                                    <Users size={20} />
                                </div>
                                <p className="text-3xl font-bold text-[#003366] dark:text-gray-100 mt-2">375</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                                <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                                    <h3 className="text-sm font-medium">Ocupação Média</h3>
                                    <BarChart2 size={20} />
                                </div>
                                <p className="text-3xl font-bold text-[#003366] dark:text-gray-100 mt-2">71%</p>
                            </div>
                            <div className="col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                                    <h3 className="text-sm font-medium">Receita Estimada (Hoje)</h3>
                                    <DollarSign size={20} />
                                </div>
                                <p className="text-3xl font-bold text-green-500 mt-2">R$ 44.500,00</p>
                            </div>
                        </div>

                        {/* Occupancy per trip list */}
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="font-semibold mb-3 text-[#003366] dark:text-gray-100">Ocupação das Viagens de Hoje</h3>
                            <ul className="space-y-4">
                                {reportTrips.map((trip, index) => {
                                    const percentage = (trip.boarded / trip.capacity) * 100;
                                    return (
                                        <li key={index}>
                                            <div className="flex justify-between items-center text-sm font-medium mb-1">
                                                <span className="text-gray-700 dark:text-gray-300">{trip.route}</span>
                                                <span className="font-bold text-gray-800 dark:text-gray-200">{trip.boarded} / {trip.capacity}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                                <div className={`${getOccupancyColor(percentage)} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </section>
                )}
            </main>
            
            {isModalOpen && (
                <AdminFormModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSave={handleSave}
                    entityType={modalEntityType}
                    entityData={editingEntity}
                    boats={boats}
                />
            )}
        </div>
    );
};

export default AdminDashboard;