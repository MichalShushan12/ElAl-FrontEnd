import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.find(item => item.destinationId === newItem.destinationId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({ ...newItem, quantity: 1 });
            }
        },
        removeFromCart(state, action) {
            const itemToRemove = action.payload;
            const existingItem = state.find(item => item.destinationId === itemToRemove.destinationId);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    return state.filter(item => item.destinationId !== itemToRemove.destinationId);
                }
            }
        },
        clearCart() {
            return [];
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
