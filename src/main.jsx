import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import routes from './routes.jsx';
import { CartProvider } from './context/cartcontext.jsx';

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </CartProvider>
);
