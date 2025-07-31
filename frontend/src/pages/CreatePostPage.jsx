import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
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

      const postData = { title, content };
      const { data: newPost } = await api.post('/api/posts', postData, config);
      
      setLoading(false);
      navigate(`/post/${newPost._id}`);
    } catch (err) {
      setError('Failed to create post. Please try again.');
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

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Create a New Post</h1>
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
            disabled={loading || !title || !content}
            className="w-full py-3 px-4 text-white font-semibold rounded-md bg-[#00A8E8] hover:bg-opacity-80 transition-all duration-300 disabled:bg-gray-500"
          >
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;