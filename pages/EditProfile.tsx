import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useMockData } from '../hooks/useMockData';
import { ArrowLeft, Camera } from 'lucide-react';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { users } = useMockData();
  const [currentUser, setCurrentUser] = useState(users[0]); // Mock current user

  const handleSave = () => {
    // In a real app, you would upload the new avatar if it's a blob URL
    // and then send the updated user data to a server.
    console.log('Saving profile:', currentUser);
    // For this simulation, we'll just navigate back.
    // A more advanced simulation could update a global state.
    navigate('/perfil');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Create a temporary URL for the selected image to show a preview
      const newAvatarUrl = URL.createObjectURL(file);
      setCurrentUser({ ...currentUser, avatarUrl: newAvatarUrl });
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-full">
      <Header title="Editar Perfil" />
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#003366] dark:text-gray-300 font-semibold mb-6">
          <ArrowLeft size={18} />
          Voltar
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-1 right-1 bg-[#00AEEF] text-white p-2 rounded-full hover:bg-blue-400 transition-colors cursor-pointer"
              aria-label="Alterar foto de perfil"
            >
              <Camera size={20} />
            </label>
            <input
              type="file"
              id="avatar-upload"
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={currentUser.name}
              onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#00AEEF] focus:border-[#00AEEF]"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleSave}
            className="w-full bg-[#00AEEF] text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-blue-400 transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
