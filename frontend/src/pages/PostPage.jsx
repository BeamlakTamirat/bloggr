import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaRegUserCircle, FaRegCalendarAlt } from 'react-icons/fa';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/posts/${postId}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch the post.');
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-3xl py-8 animate-pulse">
        <div className="h-12 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="flex items-center gap-4 text-gray-500 mb-8">
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="h-6 bg-gray-700 rounded w-full mb-4"></div>
        <div className="h-6 bg-gray-700 rounded w-full mb-4"></div>
        <div className="h-6 bg-gray-700 rounded w-5/6"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-20 text-red-400">{error}</div>;
  }

  if (!post) {
    return <div className="text-center mt-20">Post not found.</div>;
  }

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <article>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-6 text-gray-400 mb-8">
          <span className="flex items-center gap-2">
                <FaRegUserCircle />
                By {post.user ? post.user.username : 'Anonymous'}
          </span>
          <span className="flex items-center gap-2">
            <FaRegCalendarAlt />
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
          {post.content}
        </div>
      </article>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-6">Comments</h2>
      </section>
    </div>
  );
};

export default PostPage;
