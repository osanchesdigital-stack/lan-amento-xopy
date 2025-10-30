import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useMockData } from '../hooks/useMockData';

interface HeaderProps {
  title: React.ReactNode;
  actions?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, actions }) => {
  const { theme, toggleTheme } = useTheme();
  const { users } = useMockData();
  const currentUser = users[0];

  return (
    <header className="sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md z-10 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
      {typeof title === 'string' ? (
        <h1 className="text-2xl font-bold text-[#003366] dark:text-gray-100">{title}</h1>
      ) : (
        title
      )}
      <div className="flex items-center space-x-4">
        {actions}
        <button 
          onClick={toggleTheme} 
          className="text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors"
          aria-label="Alternar tema"
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
        <button className="text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors">
          <Bell size={24} />
        </button>
        <Link to="/perfil" aria-label="Ver perfil do usuário">
          <img 
            src={currentUser.avatarUrl} 
            alt="Avatar do usuário" 
            className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent hover:ring-[#00AEEF] transition-all"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;