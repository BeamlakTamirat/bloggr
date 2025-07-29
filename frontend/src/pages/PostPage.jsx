import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle, FaRegUserCircle, FaRegCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import CommentForm from '../components/CommentForm';

const PostPage = () => {
  const { postId } = useParams();
  const { userInfo } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setLoading(true);
        const postRes = await axios.get(`/api/posts/${postId}`);
        const commentsRes = await axios.get(`/api/posts/${postId}/comments`);
        
        setPost(postRes.data);
        setComments(commentsRes.data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch the post and comments.');
        setLoading(false);
      }
    };
    fetchPostAndComments();
  }, [postId]); 

  const handleCommentPosted = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

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

  if (error) return <div className="text-center mt-20 text-red-400">{error}</div>;
  if (!post) return <div className="text-center mt-20">Post not found.</div>;

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
        <div
          className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <section className="mt-16 border-t border-gray-800 pt-8">
        <h2 className="text-3xl font-bold text-white mb-6">Comments ({comments.length})</h2>
        
        {userInfo && (
          <CommentForm postId={postId} onCommentPosted={handleCommentPosted} />
        )}

        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="bg-[#1E1E1E] p-4 rounded-lg flex items-start gap-4">
                <FaUserCircle className="text-gray-500 mt-1 text-xl" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-white">
                      {comment.user ? comment.user.username : 'Anonymous'}
                    </span>
                    <span className="text-gray-500">
                      - {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-300 mt-1">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default PostPage;