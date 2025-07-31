import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditPostPage = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/api/posts/${postId}`);
        if (data.user && data.user._id !== userInfo._id) {
          navigate('/');
          return;
        }
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        setError('Failed to fetch post data.');
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchPost();
    }
  }, [postId, userInfo, navigate]);

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
      const postData = { title, content };
      await api.put(`/api/posts/${postId}`, postData, config);
      setLoading(false);
      navigate(`/post/${postId}`);
    } catch (err) {
      setError('Failed to update post.');
      setLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],
      ['clean']
    ],
  };

  if (loading && !title) { 
    return <div>Loading editor...</div>;
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Edit Your Post</h1>
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-gray-300">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-3 bg-[#1E1E1E] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">Content</label>
          <div className="mt-1 bg-white text-gray-900 rounded-lg overflow-hidden">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={quillModules}
              className="h-64"
            />
          </div>
        </div>
        <div className="pt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 text-white font-semibold rounded-md bg-[#00A8E8] hover:bg-opacity-80 transition-all duration-300 disabled:bg-gray-500"
          >
            {loading ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;