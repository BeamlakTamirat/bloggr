import { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ConfirmationModal from '../components/ConfirmationModal';

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await api.get('/api/posts/myposts', config);
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchMyPosts();
    }
  }, [userInfo]);

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId); 
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      await api.delete(`/api/posts/${postToDelete}`, config);
      setPosts(posts.filter((p) => p._id !== postToDelete));
    } catch (error) {
      console.error('Failed to delete post');
    } finally {
      setIsModalOpen(false);
      setPostToDelete(null);
    }
  };

  if (loading) return <div>Loading your posts...</div>;

  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="bg-[#1E1E1E] p-4 rounded-lg flex justify-between items-center">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <div className="flex gap-4">
                  <Link to={`/post/${post._id}/edit`} className="text-blue-400 hover:text-blue-300 text-lg">
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(post._id)}
                    className="text-red-500 hover:text-red-400 text-lg"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-20">
              <h3 className="text-2xl font-bold mb-2">No Posts Yet</h3>
              <p>Click the "Write" link in the header to create your first article!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;