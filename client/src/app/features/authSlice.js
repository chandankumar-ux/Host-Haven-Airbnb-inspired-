import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../api/axios.js"
// 🔹 Signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("auth/register", formData);
      if (!data.success) return rejectWithValue(data.message);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 🔹 Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", formData);
      if (!data.success) return rejectWithValue(data.message);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 🔹 Check Authentication (page refresh pe)
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/is-auth");
      if (!data.success) return rejectWithValue("Not authenticated");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 🔹 Logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/logout");
      if (!data.success) return rejectWithValue(data.message);
      return data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//Send Otp to user to verify
export const verifyUser=createAsyncThunk(
  "auth/verifyUser",
  async(_,{rejectWithValue})=>{
    try{
      const {data}=await api.post("/auth/generate-otp");
      if(!data.success) return rejectWithValue(data.message);
      return data;
    }
    catch(err){
       return rejectWithValue(err.response?.data?.message || err.message);
 
    }
  }
)

//verify Email
export const verifyOtp=createAsyncThunk(
"auth/verifyOtp",
async(formData,{rejectWithValue})=>{
  try{
    console.log("from authSlice verifyOtp", formData);
    const{data}= await api.post("/auth/verify-account",{otp:formData.otp.join("")});
    if(!data.success) return rejectWithValue(data.message);
    return data;
  }
  catch(err){
    return rejectWithValue(err.response?.data?.message || err.message);
  }
}
)

// Reset Password Request (send OTP)
export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("from authSlice--")
      console.log(formData.email);
      const { data } = await api.post(`auth/send-reset-otp`,  formData );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Reset request failed");
    }
  }
);

// Reset Password (with OTP)
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ( formData, { rejectWithValue }) => {
    try {
      console.log("from authSlice");
      console.log(formData);
      const { data } = await api.post("/auth/reset-password", formData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Password reset failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
  user: null,
  loading: false,
  error: null,
  resetEmail: null,
  isAuthChecked: false, 
},

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state,action) => {
        state.loading = false;
        toast.success(action.payload.message || "Signup successful 🎉");
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Signup failed ❌");
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // ⚡ backend ko ensure karna hoga ki login ke baad user bheje
        toast.success(action.payload.message || "Login successful ✅");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Login failed ❌");
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isAuthChecked = false;
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user || null;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.loading = false;
        state.isAuthChecked = true;
      })


      // Logout
      .addCase(logoutUser.fulfilled, (state,action) => {
        state.user = null;
        toast.info(action.payload || "Logged out successfully 👋");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        toast.error(action.payload || "Logout failed ❌");
      })

           
      //  Verify OTP Send
      .addCase(verifyUser.fulfilled, (_, action) => {
        toast.success(action.payload.message || "OTP sent to email 📧");
      })
      .addCase(verifyUser.rejected, (_, action) => {
        toast.error(action.payload || "Failed to send OTP ❌");
      })

      //  Verify OTP Confirm
      .addCase(verifyOtp.fulfilled, (_, action) => {
        toast.success(action.payload.message || "Email verified 🎉");
      })
      .addCase(verifyOtp.rejected, (_, action) => {
        toast.error(action.payload || "Invalid OTP ❌");
      })

      //  Reseset password request
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
          state.resetEmail = action.meta.arg.email; 
        toast.success(action.payload.message || "OTP sent to email 📧");
      })
      .addCase(requestPasswordReset.rejected, (_, action) => {
        toast.error(action.payload || "Failed to send OTP ❌");
      })

      //  Resetting password
      .addCase(resetPassword.fulfilled, (_, action) => {
        toast.success(action.payload.message || "Password Changed 🎉");
      })
      .addCase(resetPassword.rejected, (_, action) => {
        toast.error(action.payload || "Invalid OTP ❌");
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
