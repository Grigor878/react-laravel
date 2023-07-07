import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";
import { error, success } from "../../components/swal/swal";
import { APP_BASE_URL, getAxiosConfig } from "../../apis/config";

const initialState = {
  getLoading: false,
  getError: null,
  getInfo: null,
  viewLoading: false,
  viewError: null,
  viewInfo: null,
  // newBlogId: null,
};

export const getBlogInfo = createAsyncThunk("blog", async () => {
  try {
    const { data } = await baseApi.get("/api/blog", getAxiosConfig());
    return data;
  } catch (err) {
    console.log(`Get Blog Info Error: ${err.message}`);
  }
});

// export const addBlogInfo = createAsyncThunk(
//   "blog/add",
//   async ({ blogInfo }) => {
//     try {
//       const { data } = await baseApi.post(
//         "/api/blog",
//         blogInfo,
//         getAxiosConfig()
//       );
//       // console.log(data.data.id);
//       return data;
//     } catch (err) {
//       console.log(`Add Blog Info Error: ${err.message}`);
//       throw err;
//     }
//   }
// );

export const viewBlogInfo = createAsyncThunk("blog/view", async ({ id }) => {
  try {
    const { data } = await baseApi.get(`api/blog/${id}`, getAxiosConfig());
    return data;
  } catch (err) {
    console.log(`View Blog Info Error: ${err.message}`);
    throw err;
  }
});

export const deleteBlogInfo = createAsyncThunk(
  "blog/delete",
  async ({ id }) => {
    try {
      const { data } = await baseApi.delete(`api/blog/${id}`, getAxiosConfig());
      return data;
    } catch (err) {
      console.log(`Delete Blog Info Error: ${err.message}`);
      throw err;
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    // setNewBlogId: (state, action) => {
    //   state.newBlogId = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getBlogInfo.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(getBlogInfo.rejected, (state, action) => {
        error(`Error: ${action.error.message}`);
      })
      .addCase(getBlogInfo.fulfilled, (state, action) => {
        state.getLoading = false;
        state.getInfo = action.payload;
      })
      // view
      .addCase(viewBlogInfo.pending, (state) => {
        state.viewLoading = true;
      })
      .addCase(viewBlogInfo.rejected, (state, action) => {
        error(`Error: ${action.error.message}`);
      })
      .addCase(viewBlogInfo.fulfilled, (state, action) => {
        state.viewLoading = false;
        state.viewInfo = action.payload;
      })
      // delete
      .addCase(deleteBlogInfo.fulfilled, (state, action) => {
        success(action.payload.message);
        setTimeout(() => {
          window.location.reload(false);
          // window.location = `${APP_BASE_URL}/blog`;
        }, 1000);
      });
    // .addCase(addBlogInfo.fulfilled, (state, action) => {
    //   // console.log(action);
    //   // console.log(action.payload.data.id);
    //   // state.newBlogId = action.payload.data.id;
    //   // console.log(action);
    // });
  },
});

//   export const { setUserImg } = authSlice.actions;
export default blogSlice.reducer;
