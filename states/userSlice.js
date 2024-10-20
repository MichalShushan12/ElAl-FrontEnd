import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.currentUser = action.payload;
        state.userId = action.payload.userId;
        state.token = action.payload.token;
    },

    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.userId = null;
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
    },
  
    updateUser: (state, action) => {
      const { userId, ...updatedFields } = action.payload;
      if (state.currentUser && state.currentUser.userId === userId) {
        state.currentUser = { ...state.currentUser, ...updatedFields };
      }
    },
   
  },
});

export const { setUser, updateUser, logout } = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectUserId = (state) => state.user.currentUser?.userId;
export default userSlice.reducer;

