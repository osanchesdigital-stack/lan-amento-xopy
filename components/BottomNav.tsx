import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Ship, ShoppingCart, History, Anchor, LogOut, UserCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const BottomNav: React.FC = () => {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();

  const commonClass = "flex flex-col items-center justify-center gap-1 w-full text-gray-400 transition-colors";
  const activeClass = "text-[#00AEEF]";

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${commonClass} ${isActive ? activeClass : 'hover:text-white'}`;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (userRole === 'employee') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#003366] flex items-center justify-around max-w-lg mx-auto z-20 shadow-t-lg">
        <NavLink to="/funcionario" className={getNavLinkClass}>
          <UserCheck size={24} />
          <span className="text-xs font-medium">Painel</span>
        </NavLink>
        <button onClick={handleLogout} className={commonClass}>
          <LogOut size={24} />
          <span className="text-xs font-medium">Sair</span>
        </button>
      </nav>
    );
  }

  // Default to user navigation
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#003366] flex items-center justify-around max-w-lg mx-auto z-20 shadow-t-lg">
      <NavLink to="/feed" className={getNavLinkClass}>
        <Home size={24} />
        <span className="text-xs font-medium">Início</span>
      </NavLink>
      <NavLink to="/viagens" className={getNavLinkClass}>
        <Ship size={24} />
        <span className="text-xs font-medium">Viagens</span>
      </NavLink>
      
      <NavLink to="/comprar" className="relative -mt-8">
        <div className="flex items-center justify-center w-20 h-20 bg-[#00AEEF] rounded-full shadow-lg hover:bg-blue-400 transition-transform transform hover:scale-105">
          <ShoppingCart size={32} className="text-white" />
        </div>
      </NavLink>

      <NavLink to="/historico" className={getNavLinkClass}>
        <History size={24} />
        <span className="text-xs font-medium">Histórico</span>
      </NavLink>
      <NavLink to="/barcos" className={getNavLinkClass}>
        <Anchor size={24} />
        <span className="text-xs font-medium">Barcos</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;