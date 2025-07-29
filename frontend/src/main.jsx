import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import PostPage from './pages/PostPage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx'; 
import ProtectedRoute from './components/ProtectedRoute.jsx';


import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="post/:postId" element={<PostPage />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="create-post" element={<CreatePostPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);