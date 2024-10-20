import React from 'react';
import { useCart } from './CartProvider';
import { Link } from 'react-router-dom';
import '/src/css/Cart.css';

const Cart = ({ onClose }) => {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className='cart-overlay'>
      <div className='cart-container'>
        <h2>Your Selected Flights</h2>
        {cart.length === 0 ? (
          <p>No flights selected</p>
        ) : (
          cart.map((item) => (
            <div key={item.destinationId} className='cart-item'>
              <img src={item.img} alt={item.name} className='cart-item-image' />
              <div className='cart-item-details'>
                <p><strong>{item.name}</strong></p>
                <p>From: {item.departureAirport} To: {item.returnAirport}</p>
                <p>Price: {item.price} {item.currencyPayment}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className='cart-item-actions'>
                <button onClick={() => removeFromCart(item)} className='remove-button'>Remove</button>
              </div>
            </div>
          ))
        )}
        {cart.length > 0 && (
          <div className='cart-footer'>
            <p><strong>Total Amount: {totalAmount.toFixed(2)} {cart.length > 0 ? cart[0].currencyPayment : ''}</strong></p>
            <button onClick={clearCart} className='clear-cart-button'>Clear Cart</button>
            <Link to='/payment' className='checkout-button'>Go to Payment</Link>
          </div>
        )}
        <button onClick={onClose} className='close-cart-button'>Close Cart</button>
      </div>
    </div>
  );
};

export default Cart;