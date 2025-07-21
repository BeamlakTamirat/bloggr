const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users' , userRoutes);
app.use('/api/posts' , postRoutes);
const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));
