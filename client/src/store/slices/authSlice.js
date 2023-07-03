import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";
import { error, success } from "../../components/swal/swal";

const initialState = {
  registerLoading: false,
  isLoggedIn: !!localStorage.getItem("token"),
  loginLoading: false,
  token: localStorage.getItem("token") || null,
};

export const register = createAsyncThunk(
  "auth",
  async ({ name, email, password, token }) => {
    const res = await baseApi.post("/api/register", {
      name,
      email,
      password,
      token,
    });
    return res.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const res = await baseApi.post("/api/login", {
      email,
      password,
    });
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      //register
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerLoading = false;
        error(`Error: ${action.error.message}`);
      })
      .addCase(register.fulfilled, (state) => {
        state.registerLoading = false;
        success("You are registered.");
      })
      //login
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        error(`Error: ${action.error.message}`);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.loginLoading = false;
        state.token = action.payload.remember_token;
        localStorage.setItem("token", action.payload.remember_token);
        success("Welcome");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
