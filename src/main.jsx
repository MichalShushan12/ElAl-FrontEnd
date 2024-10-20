import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Store } from './app/Store';
import { CartProvider } from './pages/CartProvider';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={Store}>
      <CartProvider>
        <App />
      </CartProvider>
    </Provider>
  </StrictMode>
);