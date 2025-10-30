import React, { useState } from 'react';
import type { Post } from '../types';
import { X, Send } from 'lucide-react';

interface CommentModalProps {
  post: Post;
  onClose: () => void;
  onAddComment: (postId: string, commentText: string) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ post, onClose, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handlePostComment = () => {
    if (newComment.trim()) {
      onAddComment(post.id, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800">
          <h2 className="text-lg font-bold text-[#003366] dark:text-gray-100">Comentários</h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white" aria-label="Fechar modal de comentários">
            <X size={24} />
          </button>
        </header>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {post.comments.map(comment => (
            <div key={comment.id} className="flex items-start gap-3">
              <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-9 h-9 rounded-full object-cover" />
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex-1">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{comment.user.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        <footer className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky bottom-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Adicione um comentário..."
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-[#00AEEF] focus:border-[#00AEEF] focus:outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handlePostComment()}
              aria-label="Escreva um comentário"
            />
            <button
              onClick={handlePostComment}
              disabled={!newComment.trim()}
              className="bg-[#00AEEF] text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-400 transition-colors"
              aria-label="Publicar comentário"
            >
              <Send size={20} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CommentModal;