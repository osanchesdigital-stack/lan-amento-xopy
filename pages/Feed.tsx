import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import { useMockData } from '../hooks/useMockData';
import type { Post, Comment as CommentType } from '../types';
import NewPostNotification from '../components/NewPostNotification';
import { PlusSquare } from 'lucide-react';

const logoBase64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjAiIHk9IjMyIiBmb250LWZhbWlseT0iUG9wcGlucywgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1zaXplPSIzMnB4IiBmaWxsPSIjMDAzMzY2Ij5FbWJhcnF1ZTwvdGV4dD48dGV4dCB4PSIxNTUiIHk9IjMyIiBmb250LWZhbWlseT0iUG9wcGlucywgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjYwMCIgZm9udC1zaXplPSIzMnB4IiBmaWxsPSIjMDBBRUVGIj5EaWdpdGFsPC90ZXh0Pjwvc3ZnPg==';

const Logo = () => (
  <img src={logoBase64} alt="Embarque Digital Logo" className="h-9 object-contain" />
);

const Feed: React.FC = () => {
  const { posts: initialPosts, users } = useMockData();
  const [posts, setPosts] = useState(initialPosts);
  const [newPosts, setNewPosts] = useState<Post[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Let's assume the current user is the first user from our mock data
  const currentUser = users[0];

  // Simulate receiving a new post
  useEffect(() => {
    const timer = setTimeout(() => {
      // Create a new mock post from a different user
      const newPost: Post = {
        id: `p${Date.now()}`,
        user: users[1], 
        imageUrl: `https://picsum.photos/seed/${Date.now()}/600/800`,
        caption: 'Uma nova aventura no mar! Quem mais ama essa sensação? 🌊⚓️ #explorando #mar',
        likes: 0,
        comments: [],
        timestamp: 'agora',
      };
      setNewPosts([newPost]);
    }, 7000); // Appear after 7 seconds

    return () => clearTimeout(timer);
  }, []);

  // Check for a new post passed via navigation state
  useEffect(() => {
    const newPostFromState = location.state?.newPost as Post | undefined;
    if (newPostFromState) {
      // Add the new post to the top of the feed
      setPosts(prevPosts => [newPostFromState, ...prevPosts]);
      // Scroll to top smoothly to show the new post
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Clear the state from location history to prevent re-adding
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const handleAddComment = (postId: string, commentText: string) => {
    const newComment: CommentType = {
      id: `c${Date.now()}`,
      user: currentUser,
      text: commentText,
    };

    setPosts(currentPosts => 
      currentPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );
  };

  const showNewPosts = () => {
    setPosts(prevPosts => [...newPosts, ...prevPosts]);
    setNewPosts([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-full">
      <Header 
        title={<Logo />} 
        actions={
          <Link to="/criar-post" className="text-gray-600 dark:text-gray-300 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] transition-colors" aria-label="Criar nova publicação">
            <PlusSquare size={24} />
          </Link>
        }
      />
      <NewPostNotification count={newPosts.length} onClick={showNewPosts} />
      <div className="p-4">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onAddComment={handleAddComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;