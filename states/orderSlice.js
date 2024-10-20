import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userOrders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addToOrder: (state, action) => {
      const newOrder = action.payload;
      
      const existingOrder = state.userOrders.find(order => order.orderId === newOrder.orderId);
      if (!existingOrder) {
        state.userOrders.push(newOrder);
      }
       
    },
    removeFromOrder: (state, action) => {
      const orderId = action.payload;
      state.userOrders = state.userOrders.filter((order) => order.orderId !== orderId);
    },
    updateTheOrder: (state, action) => {
      const { orderId, ...updatedFields } = action.payload;
      const existingOrder = state.userOrders.find((order) => order.orderId === orderId);
      if (existingOrder) {
        Object.assign(existingOrder, updatedFields);
      }
    },

    clearOrders: (state) => {
      state.userOrders = [];
    },
  },
});

export const { addToOrder, removeFromOrder, updateTheOrder, clearOrders } = orderSlice.actions;
export const selectUserOrders = (state) => state.orders.userOrders;
export default orderSlice.reducer;