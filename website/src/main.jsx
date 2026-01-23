import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import "./index.css";
import App from "./App.jsx";
import MainContent from "./components/MainContent.jsx";
import CartPage from "./components/CartPage.jsx";
import ProductDetailsPage from "./components/ProductDetailsPage.jsx";
import CheckOut from "./components/CheckOut.jsx";
import OrderConfirmationPage from "./components/OrderConfirmationPage.jsx";
import Profilepage from "./components/Profilepage.jsx";
import SettingPage from "./components/SettingPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://my-ecommerce-backend-blond.vercel.app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainContent />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "main",
        element: <MainContent />,
      },
      {
        path: "product/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "order-confirmation/:orderId",
        element: <OrderConfirmationPage />,
      },
      {
        path: "checkout",
        element: <CheckOut />,
      },
      {
        path: "profile",
        element: <Profilepage />,
      },
      {
        path: "settings",
        element: <SettingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <SignupPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
