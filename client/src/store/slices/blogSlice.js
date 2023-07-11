import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";
import { error, success } from "../../components/swal/swal";
import { APP_BASE_URL, getAxiosConfig } from "../../apis/config";

const initialState = {
  getLoading: false,
  getInfo: null,
  viewInfo: null,
};

export const getBlogInfo = createAsyncThunk("blog", async ({ page }) => {
  try {
    const { data } = await baseApi.get(`/api/blog?page=${page}`, getAxiosConfig());
    return data;
  } catch (err) {
    console.log(`Get Blog Info Error: ${err.message}`);
  }
});

export const viewBlogInfo = createAsyncThunk("blog/view", async ({ id }) => {
  try {
    const { data } = await baseApi.get(`api/blog/${id}`, getAxiosConfig());
    return data;
  } catch (err) {
    console.log(`View Blog Info Error: ${err.message}`);
    throw err;
  }
});

export const editBlogInfo = createAsyncThunk(
  "blog/edit",
  async ({ id, edited }) => {
    try {
      const { data } = await baseApi.put(
        `api/blog/${id}`,
        edited,
        getAxiosConfig()
      );
      return data;
    } catch (err) {
      console.log(`Edit Blog Info Error: ${err.message}`);
      throw err;
    }
  }
);

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
      // edit
      .addCase(editBlogInfo.rejected, (state, action) => {
        error(`Error: ${action.error.message}`);
      })
      .addCase(editBlogInfo.fulfilled, (state, action) => {
        success(action.payload.message);
        if (action.payload.status === true) {
          setTimeout(() => {
            window.location.replace(`${APP_BASE_URL}/blog`);
          }, 1000);
        }
      })
      // delete
      .addCase(deleteBlogInfo.fulfilled, (state, action) => {
        success(action.payload.message);
        if (action.payload.status === true) {
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        }
      });
  },
});

//   export const { setUserImg } = authSlice.actions;
export default blogSlice.reducer;
