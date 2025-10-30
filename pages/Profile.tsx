import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useMockData } from '../hooks/useMockData';
import { User, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { users, posts, tickets } = useMockData();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  // Assume the logged-in user is the first user in the mock data
  const currentUser = users[0];
  const userPosts = posts.filter(post => post.user.id === currentUser.id);
  const userTripsCount = tickets.length; // In a real app, filter by user ID

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const actionItems = [
    { icon: User, text: 'Editar Perfil', action: () => navigate('/perfil/editar') },
    { icon: Settings, text: 'Configurações', action: () => navigate('/perfil/configuracoes') },
    { icon: HelpCircle, text: 'Ajuda e Suporte', action: () => navigate('/perfil/ajuda') },
    { icon: LogOut, text: 'Sair', action: handleLogout, color: 'text-red-500' },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-full">
      <Header title="Meu Perfil" />
      <div className="p-4">
        {/* User Info Section */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg mb-4"
          />
          <h2 className="text-2xl font-bold text-[#003366] dark:text-gray-100">{currentUser.name}</h2>
          <div className="flex gap-6 mt-4 text-gray-600 dark:text-gray-400">
            <div className="text-center">
              <p className="text-xl font-bold text-[#333] dark:text-gray-200">{userPosts.length}</p>
              <p className="text-sm">Publicações</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#333] dark:text-gray-200">{userTripsCount}</p>
              <p className="text-sm">Viagens</p>
            </div>
          </div>
        </div>

        {/* Action List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          {actionItems.map((item, index) => (
            <button
              key={item.text}
              onClick={item.action}
              className={`w-full flex items-center p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${index < actionItems.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''} ${item.color || 'text-gray-800 dark:text-gray-200'}`}
            >
              <item.icon size={20} className="mr-4" />
              <span className="flex-grow font-semibold">{item.text}</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          ))}
        </div>

        {/* User Posts Grid */}
        <div>
          <h3 className="text-lg font-semibold text-[#003366] dark:text-gray-100 mb-4">Minhas Publicações</h3>
          <div className="grid grid-cols-3 gap-1">
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <div key={post.id} className="aspect-square bg-gray-200 dark:bg-gray-700">
                  <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover" />
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500 dark:text-gray-400 py-8">Nenhuma publicação ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
