
import { apiClient } from '../api/apiClient';

const getAllOrders = async () => {
    try {
        const res = await apiClient.get("Orders");
        return res.data
    } catch (error) {
        throw error;
    }
};

const getNewOrder = async (newOrderDetails) => {
    try {
        const res = await apiClient.post("Orders", newOrderDetails);
        return res.data
    } catch (error) {
        throw error;
    }
};

const getOrdersByUserId = async (userId) => {
    try {
        const res = await apiClient.get(`Orders/${userId}`);
        return res.data
    } catch (error) {
        throw error;   
    }
};

const deleteOrder = async (orderId) => {
    try {
      await apiClient.delete(`Orders/${orderId}`);
    } catch (error) {
      throw error;
    }
};

const updateOrder = async (orderDetails) => {
    try {
       const res = await apiClient.put("Orders", orderDetails);
       return res.data;
    } catch (error) {
        throw error;
    }
};

export { getAllOrders, getNewOrder, getOrdersByUserId, deleteOrder, updateOrder };

