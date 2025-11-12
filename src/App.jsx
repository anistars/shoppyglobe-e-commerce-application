import { lazy, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './pages/Header.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

function App() {
  const Cart = lazy(() => import('./pages/cartPages/Cart.jsx'));
  const CartDetails = lazy(() => import('./pages/cartPages/CartDetails.jsx'));
  const ProductDetails = lazy(() => import('./pages/productPages/ProductDetails.jsx'));
  const ProductList = lazy(() => import('./pages/productPages/ProductList.jsx'));
  const NotFound = lazy(() => import('./pages/unknownPages/NotFound.jsx'));
  return (

    <Router>
      <Header />
      <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/cart-details/:id' element={<CartDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
