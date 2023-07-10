import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";
import { error, success } from "../../components/swal/swal";
import { APP_BASE_URL, getAxiosConfig } from "../../apis/config";

const initialState = {
  registerLoading: false,
  isLoggedIn: !!localStorage.getItem("token"),
  loginLoading: false,
  token: localStorage.getItem("token") || null,
  userInfo: null,
  userImg: null,
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

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const { data } = await baseApi.post("/api/logout", getAxiosConfig());
    return data;
  } catch (err) {
    console.log(`Logout Error: ${err.message}`);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserImg: (state, action) => {
      state.userImg = action.payload;
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
      .addCase(register.fulfilled, (state, action) => {
        state.registerLoading = false;
        success(action.payload.message);
        if (action.payload.status === true) {
          setTimeout(() => {
            window.location.replace(`${APP_BASE_URL}/login`);
          }, 1000);
        }
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
        state.userInfo = action.payload.data.user;
        state.token = action.payload.data.access_token;
        localStorage.setItem("token", action.payload.data.access_token);
        success("Welcome");
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.userImg = null;
        // localStorage.removeItem("token");
        sessionStorage.removeItem("blogPage");
        // console.log(action.payload.message); //
      });
  },
});

export const { setUserImg } = authSlice.actions;
export default authSlice.reducer;
