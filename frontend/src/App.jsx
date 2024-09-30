import { Suspense, lazy } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Layout from './components/MainLayout'; // Import the Layout component

import './App.css';
import Product from './pages/Product';
import Contactus from './pages/Contactus';
import Profile from './pages/Profile';
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const About = lazy(() => import('./pages/AboutUs'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Blog = lazy(() => import('./pages/Blog'));
const Cart = lazy(() => import('./pages/Cart')); // Example cart component

function App() {
  const [showLogin,setShowLogin] = React.useState(false);
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
        <Routes>
          {/* Routes with Layout (Header & Footer) */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path='/shop' element={<Product />} />
            <Route path='/contact' element={<Contactus />} />
            <Route path="/cart" element={<ProtectedRoute component={Cart} />} />
            <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
          </Route>

          {/* Routes without Layout (No Header & Footer) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
