import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'; 
import App from './App.jsx';
import MainContent from './components/MainContent.jsx';
import CartPage from './components/CartPage.jsx';
import ProductDetailsPage from './components/ProductDetailsPage.jsx';
import CheckOut from './components/CheckOut.jsx';
import OrderConfirmationPage from './components/OrderConfirmationPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      {
        index: true,
        element: <MainContent />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'product/:productId',
        element: <ProductDetailsPage />,
      },
      {
        path: 'order-confirmation',
        element: <OrderConfirmationPage />,
      },
      {
        path: 'checkout',
        element: <CheckOut />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);