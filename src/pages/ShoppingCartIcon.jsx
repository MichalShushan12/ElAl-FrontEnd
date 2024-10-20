import React,{useState} from "react";
import { useCart } from "./CartProvider";
import Cart from "./Cart";


const ShoppingCartIcon = () => {
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
      setIsCartOpen(!isCartOpen);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={toggleCart} style={{ cursor: 'pointer', fontSize: '24px' }}>
        🛒 {cart.reduce((total, item) => total + item.quantity, 0)}
      </div>
      {isCartOpen && (
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '0',
            zIndex: 1000,
            borderRadius: '8px',
          }}
        >
          <Cart onClose={() => setIsCartOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default ShoppingCartIcon

