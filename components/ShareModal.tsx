import React, { useState } from 'react';
import { X, Link, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  postUrl: string;
  postCaption: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ postUrl, postCaption, onClose }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copiar Link');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      setCopyButtonText('Copiado!');
      setTimeout(() => setCopyButtonText('Copiar Link'), 2000);
    });
  };
  
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedCaption = encodeURIComponent(postCaption);

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'Twitter', icon: Twitter, url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedCaption}` },
    { name: 'LinkedIn', icon: Linkedin, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=Veja este post!&summary=${encodedCaption}` },
    { name: 'WhatsApp', icon: MessageCircle, url: `https://api.whatsapp.com/send?text=${encodedCaption} ${encodedUrl}` },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#003366] dark:text-gray-100">Compartilhar</h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white" aria-label="Fechar modal de compartilhamento">
            <X size={24} />
          </button>
        </header>
        <div className="p-4">
            <div className="grid grid-cols-4 gap-4 text-center mb-4">
                {socialLinks.map(({ name, icon: Icon, url }) => (
                     <a 
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] transition-colors"
                     >
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <Icon size={24} />
                        </div>
                        <span className="text-xs mt-1">{name}</span>
                    </a>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <input 
                    type="text"
                    readOnly
                    value={postUrl}
                    className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:text-gray-200"
                />
                <button 
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 bg-[#003366] text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-sm whitespace-nowrap"
                >
                    <Link size={16} />
                    {copyButtonText}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;