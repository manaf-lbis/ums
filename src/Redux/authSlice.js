import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";

let savedAuth = null;
try {
  const storedAuth = localStorage.getItem("auth");
  if (storedAuth) {
    savedAuth = JSON.parse(storedAuth);
  }
} catch (error) {
  console.error("Error parsing auth data:", error);
  localStorage.removeItem("auth");
}

//api call
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const response = await fetch(API_URL + "/auth/user", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to authenticate");
    }

    const data = await response.json();
    localStorage.setItem("auth", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
    return null; 
  }
});



const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: savedAuth, 
    loading: false,
    error: null,
  },
  reducers: {
    updateAuth: (state, action) => {
      state.auth = action.payload;
      localStorage.setItem("auth", JSON.stringify(action.payload)); 
    },
    logout: (state) => {
      state.auth = null;
      localStorage.removeItem("auth"); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.auth = null;
        state.loading = false;
        state.error = action.error?.message || "Authentication failed";
      });
  },
});

export const { updateAuth, logout } = authSlice.actions;
export default authSlice.reducer;
