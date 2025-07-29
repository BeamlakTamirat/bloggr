import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CommentForm = ({ postId, onCommentPosted }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userInfo } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data: newComment } = await axios.post(
        `/api/posts/${postId}/comments`,
        { content },
        config
      );

      onCommentPosted(newComment);
      setContent(''); 
    } catch (err) {
      setError('Failed to post comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-3 bg-[#1E1E1E] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8E8] transition-all"
        rows="3"
        required
      ></textarea>
      <button
        type="submit"
        disabled={loading || !content}
        className="mt-2 px-6 py-2 bg-[#00A8E8] text-white font-semibold rounded-lg hover:bg-opacity-80 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </form>
  );
};

export default CommentForm;