
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../states/cartSlice'
import orderReducer from '../../states/orderSlice';
import userReducer from '../../states/userSlice';

export const Store = configureStore({
  reducer: {
    cart: cartReducer,   
    user: userReducer,
    orders: orderReducer,
    
}
});
