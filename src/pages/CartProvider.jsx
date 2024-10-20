import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../../states/cartSlice';

const CartContext = createContext();

export function CartProvider({ children }) {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    };

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <CartContext.Provider value={{ cart, addToCart: handleAddToCart, removeFromCart: handleRemoveFromCart, clearCart: handleClearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}