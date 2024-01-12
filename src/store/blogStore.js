import { configureStore } from '@reduxjs/toolkit';
import blogReducer from "../MainPages/AllBlogs/blogSlice";

const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

export default store;