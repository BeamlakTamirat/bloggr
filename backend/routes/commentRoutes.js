const express = require('express');
const router = express.Router({mergeParams: true});

const {getCommentsForPost , createComment } = require('../controllers/commentController.js');
const {protect} = require('../middleware/authMiddleware.js');

router.route('/').get(getCommentsForPost).post(protect, createComment);

module.exports = router;