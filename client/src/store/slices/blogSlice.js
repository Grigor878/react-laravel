import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";
import { error, success } from "../../components/swal/swal";
import { APP_BASE_URL, getAxiosConfig } from "../../apis/config";

const initialState = {
  getLoading: false,
  getError: null,
  getInfo: null,
};

export const getBlogInfo = createAsyncThunk("blog", async () => {
  try {
    const { data } = await baseApi.get("/api/blog", getAxiosConfig());
    return data;
  } catch (err) {
    console.log(`Get Blog Info Error: ${err.message}`);
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogInfo.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(getBlogInfo.rejected, (state, action) => {
        state.registerLoading = false;
        error(`Error: ${action.error.message}`);
      })
      .addCase(getBlogInfo.fulfilled, (state, action) => {
        state.getLoading = false;
        state.getInfo = action.payload;
        // success(action.payload.message);
        // if (action.payload.status === true) {
        //   setTimeout(() => {
        //     window.location.replace(`${APP_BASE_URL}/login`);
        //   }, 1000);
        // }
      });
  },
});

//   export const { setUserImg } = authSlice.actions;
export default blogSlice.reducer;
