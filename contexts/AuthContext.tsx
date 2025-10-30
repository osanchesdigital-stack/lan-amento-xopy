import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'user' | 'employee' | null;

interface AuthContextType {
  userRole: UserRole;
  isAdmin: boolean;
  login: (role: 'user' | 'employee') => void;
  logout: () => void;
  authenticateAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(() => {
    return (localStorage.getItem('userRole') as UserRole) || null;
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [userRole]);
  
  useEffect(() => {
    // Garante que o estado de admin seja resetado se o perfil mudar
    if (userRole !== 'employee') {
      setIsAdmin(false);
    }
  }, [userRole]);

  const login = (role: 'user' | 'employee') => {
    setUserRole(role);
  };

  const logout = () => {
    setUserRole(null);
    setIsAdmin(false); // Garante que o logout completo também desautentique o admin
  };

  const authenticateAdmin = (password: string): boolean => {
    // Simulação de verificação de senha
    if (password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ userRole, isAdmin, login, logout, authenticateAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};