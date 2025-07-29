import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegUserCircle, FaRegCalendarAlt } from 'react-icons/fa';

const PostCard = ({ post, index }) => {
  const getSnippet = (content) => {
    if (!content) return '';
    const words = content.split(' ');
    return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : content;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05, rotateY: 10, rotateX: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1E1E1E]/50 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-lg p-6 flex flex-col"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <h2 className="text-2xl font-bold text-white mb-3">{post.title}</h2>
      <p className="text-gray-400 mb-5 flex-grow">{getSnippet(post.content)}</p>
      <div className="border-t border-gray-800 pt-4 mt-auto">
        <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
          <span className="flex items-center gap-2">
            <FaRegUserCircle />
            By Author
          </span>
          <span className="flex items-center gap-2">
            <FaRegCalendarAlt />
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        <Link
          to={`/post/${post._id}`}
          className="text-center block w-full bg-[#00A8E8]/20 text-[#00A8E8] font-semibold py-2 rounded-lg hover:bg-[#00A8E8]/40 transition-colors"
        >
          Read Full Article
        </Link>
      </div>
    </motion.div>
  );
};

export default PostCard;
