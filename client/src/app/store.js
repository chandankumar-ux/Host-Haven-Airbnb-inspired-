import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice.js'
 

const store = configureStore({
  reducer: {
    auth: authReducer, // ✅ auth slice ko register karo
  },
});
export default store;
