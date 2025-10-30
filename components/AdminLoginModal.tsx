import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { X, Lock, LogIn } from 'lucide-react';

interface AdminLoginModalProps {
  onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { authenticateAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticateAdmin(password)) {
      navigate('/admin/dashboard');
      onClose();
    } else {
      setError('Credencial inválida. Tente novamente.');
      setPassword('');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#003366] dark:text-gray-100">Acesso Administrativo</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
            <X size={24} />
          </button>
        </header>
        <form onSubmit={handleLogin} className="p-6">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Por favor, insira a credencial de administrador para continuar.
          </p>
          <div className="relative mb-4">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Senha de administrador"
              className="w-full p-3 pl-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#00AEEF] focus:border-[#00AEEF]"
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-[#003366] text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-opacity-90 transition-colors"
          >
            <LogIn size={20} />
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;