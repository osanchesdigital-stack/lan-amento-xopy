import React, { useState } from 'react';
import type { Post } from '../types';
import { Heart, MessageCircle, Send } from 'lucide-react';
import CommentModal from './CommentModal';
import ShareModal from './ShareModal';

interface PostCardProps {
  post: Post;
  onAddComment: (postId: string, commentText: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onAddComment }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/#/?post=${post.id}`;
    const shareData = {
      title: 'Veja este post incrível!',
      text: post.caption,
      url: postUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      setIsShareModalOpen(true);
    }
  };


  return (
    <>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm mb-6">
        <div className="p-4 flex items-center gap-3">
          <img src={post.user.avatarUrl} alt={post.user.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-sm text-[#333333] dark:text-gray-200">{post.user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</p>
          </div>
        </div>

        <img src={post.imageUrl} alt="Post" className="w-full h-auto object-cover" />

        <div className="p-4">
          <div className="flex items-center gap-4 mb-2">
            <button className="flex items-center gap-1 text-red-500 hover:opacity-75 transition-opacity">
              <Heart size={24} fill="currentColor" />
              <span className="font-semibold text-sm">{post.likes}</span>
            </button>
            <button 
              onClick={() => setIsCommentModalOpen(true)}
              className="text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] transition-colors"
              aria-label={`Ver comentários do post de ${post.user.name}`}
            >
              <MessageCircle size={24} />
            </button>
            <button 
              onClick={handleShare}
              className="text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] transition-colors"
              aria-label={`Compartilhar post de ${post.user.name}`}
            >
              <Send size={24} />
            </button>
          </div>
          <p className="text-sm text-gray-800 dark:text-gray-100">
            <span className="font-semibold mr-2">{post.user.name}</span>
            {post.caption}
          </p>
           <div className="mt-2">
              {post.comments.length > 0 ? (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-semibold mr-2">{post.comments[0].user.name}</span>
                      {post.comments[0].text}
                  </p>
                  <p 
                    onClick={() => setIsCommentModalOpen(true)}
                    className="text-xs text-gray-400 mt-1 cursor-pointer hover:underline"
                  >
                      Ver todos os {post.comments.length} comentários
                  </p>
                </>
              ) : (
                <p 
                  onClick={() => setIsCommentModalOpen(true)}
                  className="text-xs text-gray-400 mt-1 cursor-pointer hover:underline"
                >
                  Seja o primeiro a comentar
                </p>
              )}
          </div>
        </div>
      </div>
      {isCommentModalOpen && (
        <CommentModal
          post={post}
          onClose={() => setIsCommentModalOpen(false)}
          onAddComment={onAddComment}
        />
      )}
      {isShareModalOpen && (
        <ShareModal
          postUrl={`${window.location.origin}/#/?post=${post.id}`}
          postCaption={post.caption}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </>
  );
};

export default PostCard;