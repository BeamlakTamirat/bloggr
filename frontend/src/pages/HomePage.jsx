import { useState, useEffect } from 'react';
import api from '../api';
import PostCard from '../components/PostCard';
import SkeletonCard from '../components/SkeletonCard';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setError(null);
        const response = await api.get('/api/posts');
        setPosts(response.data);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-4">
          A Space for Ideas
        </h1>
        <p className="text-gray-400 text-lg md:text-xl">
          Discover articles, stories, and insights from our community of writers.
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-white mb-8">Latest Articles</h2>
        {error && <div className="text-center mt-20 text-red-400">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
          ) : posts.length > 0 ? (
            posts.map((post, index) => (
              <PostCard key={post._id} post={post} index={index} />
            ))
          ) : (
            !error && (
              <div className="col-span-full text-center text-gray-500 mt-20">
                <h3 className="text-2xl font-bold mb-2">The Canvas is Blank</h3>
                <p>No posts have been created yet. Be the first to share your story!</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;