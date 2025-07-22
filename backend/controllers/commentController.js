const asyncHandler = require('express-async-handler');
const Comment = require('../models/commentModel.js');
const Post = require('../models/postModel.js');

const getCommentsForPost = asyncHandler(async (req,res)=>{
    const post = await Post.findById(req.params.postId);
    if(!post){
        res.status(404);
        throw new Error("Post not found.");
    }

    const comments = await Comment.find({post: req.res.postId});
    res.status(200).json(comments);
});

const createComment = asyncHandler(async (req,res)=>{
    const {content} = req.body;
    if(!content){
        res.status(400);
        throw new Error("Please add a content");
    }

    const post = await Post.findById(req.params.postId);
    if(!post){
        res.status(404);
        throw new Error('Post not found.');
    }
    const comment = await Comment.create({
        content,
        user: req.user.id,
        post: req.params.postId,
    });
    res.status(201).json(comment);
});

module.exports = {getCommentsForPost, createComment};