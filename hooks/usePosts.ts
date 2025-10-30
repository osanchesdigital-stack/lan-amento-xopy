import { useState, useEffect } from 'react';
import { supabase } from '../src/lib/supabase';
import type { Post } from '../types';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // Buscar posts com detalhes do usuário
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          *,
          user:users(id, name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Buscar comentários para cada post
      const postsWithComments = await Promise.all(
        (postsData || []).map(async (post) => {
          const { data: commentsData } = await supabase
            .from('comments')
            .select(`
              *,
              user:users(id, name, avatar_url)
            `)
            .eq('post_id', post.id)
            .order('created_at', { ascending: true });

          return {
            id: post.id,
            user: {
              id: post.user.id,
              name: post.user.name,
              avatarUrl: post.user.avatar_url || '',
            },
            imageUrl: post.image_url,
            caption: post.caption || '',
            likes: post.likes_count,
            comments: (commentsData || []).map((comment) => ({
              id: comment.id,
              user: {
                id: comment.user.id,
                name: comment.user.name,
                avatarUrl: comment.user.avatar_url || '',
              },
              text: comment.text,
            })),
            timestamp: formatTimestamp(post.created_at),
          };
        })
      );

      setPosts(postsWithComments);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar posts:', err);
      setError(err instanceof Error ? err.message : 'Erro ao buscar posts');
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (postId: string, userId: string, text: string) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: userId,
          text,
        })
        .select(`
          *,
          user:users(id, name, avatar_url)
        `)
        .single();

      if (error) throw error;

      // Atualizar o post localmente
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: data.id,
                  user: {
                    id: data.user.id,
                    name: data.user.name,
                    avatarUrl: data.user.avatar_url || '',
                  },
                  text: data.text,
                },
              ],
            };
          }
          return post;
        })
      );

      return { success: true };
    } catch (err) {
      console.error('Erro ao adicionar comentário:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Erro ao comentar' };
    }
  };

  const createPost = async (userId: string, imageUrl: string, caption: string) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          user_id: userId,
          image_url: imageUrl,
          caption,
        })
        .select(`
          *,
          user:users(id, name, avatar_url)
        `)
        .single();

      if (error) throw error;

      const newPost: Post = {
        id: data.id,
        user: {
          id: data.user.id,
          name: data.user.name,
          avatarUrl: data.user.avatar_url || '',
        },
        imageUrl: data.image_url,
        caption: data.caption || '',
        likes: 0,
        comments: [],
        timestamp: 'agora',
      };

      setPosts((prevPosts) => [newPost, ...prevPosts]);

      return { success: true, post: newPost };
    } catch (err) {
      console.error('Erro ao criar post:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Erro ao criar post' };
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    addComment,
    createPost,
    refetch: fetchPosts,
  };
};

// Função auxiliar para formatar timestamp
function formatTimestamp(timestamp: string): string {
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (diffInSeconds < 60) return 'agora';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
  
  return postDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}
