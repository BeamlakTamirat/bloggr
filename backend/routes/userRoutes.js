const express = require('express');
const router = express.Router();
const { registerUser , loginUser, getMe} = require('../controllers/userController.js');
const {protect} = require('../middleware/authMiddleware.js');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', protect, getMe);

module.exports = router;