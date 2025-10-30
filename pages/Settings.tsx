import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ArrowLeft, Bell, Lock, Globe, ChevronRight } from 'lucide-react';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const settingsItems = [
    { icon: Bell, text: 'Notificações', description: 'Gerencie os alertas do app' },
    { icon: Lock, text: 'Privacidade', description: 'Controle suas informações' },
    { icon: Globe, text: 'Idioma', description: 'Português (Brasil)' },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-full">
      <Header title="Configurações" />
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#003366] dark:text-gray-300 font-semibold mb-6">
          <ArrowLeft size={18} />
          Voltar
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          {settingsItems.map((item, index) => (
            <div
              key={item.text}
              className={`flex items-center p-4 w-full text-left ${index < settingsItems.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}
            >
              <item.icon size={22} className="mr-4 text-[#00AEEF]" />
              <div className="flex-grow">
                <p className="font-semibold text-gray-800 dark:text-gray-200">{item.text}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;