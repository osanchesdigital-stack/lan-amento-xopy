import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useMockData } from '../hooks/useMockData';
import type { Post } from '../types';
import { ArrowLeft, ImageUp, Send } from 'lucide-react';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { users } = useMockData();
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // For simulation, we assume the current user is the first one
  const currentUser = users[0];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImagePreview = URL.createObjectURL(file);
      // In a real app, you'd probably want to hold on to the File object to upload it.
      // For this mock app, the object URL is enough.
      setImagePreview(newImagePreview);
    }
  };

  const handlePublish = () => {
    if (!imagePreview || !caption.trim()) {
      alert('Por favor, adicione uma imagem e uma legenda.');
      return;
    }

    const newPost: Post = {
      id: `p${Date.now()}`,
      user: currentUser,
      imageUrl: imagePreview,
      caption: caption.trim(),
      likes: 0,
      comments: [],
      timestamp: 'agora',
    };

    // Pass the new post back to the feed via navigation state
    navigate('/feed', { state: { newPost } });
  };

  const isPublishDisabled = !imagePreview || !caption.trim();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-full">
      <Header title="Nova Publicação" />
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#003366] dark:text-gray-300 font-semibold mb-6">
          <ArrowLeft size={18} />
          Voltar
        </button>

        <div className="space-y-6">
          <div>
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="w-full aspect-square bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Pré-visualização da publicação" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <ImageUp size={48} className="mx-auto" />
                    <p className="mt-2 font-semibold">Carregar uma imagem</p>
                    <p className="text-xs">Clique aqui para selecionar</p>
                  </div>
                )}
              </div>
            </label>
            <input
              type="file"
              id="image-upload"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div>
            <label htmlFor="caption" className="sr-only">
              Legenda
            </label>
            <textarea
              id="caption"
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Escreva uma legenda..."
              className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#00AEEF] focus:border-[#00AEEF] resize-none"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handlePublish}
            disabled={isPublishDisabled}
            className="w-full flex items-center justify-center gap-3 bg-[#00AEEF] text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
