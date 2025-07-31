const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel.js');
const User = require('../models/userModel.js');
const Comment = require('../models/commentModel.js');

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate('user', 'username');
  res.status(200).json(posts);
});

const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Please include a title and content');
  }

  const post = await Post.create({
    title,
    content,
    user: req.user.id,
  });

  res.status(201).json(post);
});


const getPost = asyncHandler(async (req, res) => {
  const [post, comments] = await Promise.all([
    Post.findById(req.params.id).populate('user', 'username'),
    Comment.find({ post: req.params.id }).populate('user', 'username')
  ]);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  res.status(200).json({ ...post.toObject(), comments });
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await post.deleteOne();

  res.status(200).json({ id: req.params.id, message: 'Post removed' });
});

const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id });
  res.status(200).json(posts);
});

module.exports = {
  getPosts,
  createPost,
  getPost,
  getMyPosts,
  updatePost,
  deletePost,
};
