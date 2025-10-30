import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Users, UserCheck } from 'lucide-react';

const logoBase64 = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjgwIDUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxzdHlsZT4udGV4dC1tYWlue2ZpbGw6IzAwMzM2Nn0udGV4dC1hY2NlbnR7ZmlsbDojMDBBRUVGfS5pY29uLW1haW57c3Ryb2tlOiMwMDMzNjZ9LmRhcmsgLnRleHQtbWFpbntmaWxsOiNmZmZ9LmRhcmsgLmljb24tbWFpbntzdHJva2U6I2ZmZn08L3N0eWxlPjxwYXRoIGQ9Ik0xMCw1IEQzMCwxNSAzMCwzNSAxMCw0NSBaIiBmaWxsPSIjMDBBRUVGIi8+PHBhdGggZD0iTTEwLDUgTDEwLDQ1IiBjbGFzcz0iaWNvbi1tYWluIiBzdHJva2Utd2lkdGg9IjQiLz48dGV4dCB4PSI0NSIgeT0iMzgiIGZvbnQtZmFtaWx5PSJQb3BwaW5zLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIiBmb250LXNpemU9IjMycHgiIGNsYXNzPSJ0ZXh0LW1haW4iPkVtYmFycXVlPC90ZXh0Pjx0ZXh0IHg9IjE4MCIgeT0iMzgiIGZvbnQtZmFtaWx5PSJQb3BwaW5zLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNjAwIiBmb250LXNpemU9IjMycHgiIGNsYXNzPSJ0ZXh0LWFjY2VudCI+RGlnaXRhbDwv dGV4dD48L3N2Zz4=';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: 'user' | 'employee') => {
    login(role);
    if (role === 'user') {
      navigate('/feed');
    } else {
      navigate('/funcionario');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4 max-w-lg mx-auto">
        <div className="text-center mb-12">
            <img src={logoBase64} alt="Embarque Digital Logo" className="w-64 h-auto mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Sua jornada começa aqui.</p>
        </div>
        
        <div className="w-full max-w-xs space-y-6">
            <h1 className="text-xl font-bold text-center text-[#003366] dark:text-gray-100">Selecione seu perfil</h1>
            <button
                onClick={() => handleLogin('user')}
                className="w-full flex items-center justify-center gap-3 bg-[#00AEEF] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-400 transition-all transform hover:scale-105"
            >
                <Users size={24} />
                Entrar como Passageiro
            </button>
            <button
                onClick={() => handleLogin('employee')}
                className="w-full flex items-center justify-center gap-3 bg-[#003366] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
                <UserCheck size={24} />
                Entrar como Funcionário
            </button>
        </div>
    </div>
  );
};

export default Login;