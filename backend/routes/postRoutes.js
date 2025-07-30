const express = require('express');
const router = express.Router();
const { getPosts, createPost ,getMyPosts, getPost ,updatePost, deletePost} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware.js');

const commentRouter = require('../routes/commentRoutes.js');
router.use('/:postId/comments', commentRouter);

router.route('/').get(getPosts).post(protect, createPost);
router.route('/myposts').get(protect, getMyPosts);
router.route('/:id').get(getPost).put(protect, updatePost).delete(protect, deletePost);


module.exports = router;