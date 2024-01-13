import { configureStore } from '@reduxjs/toolkit';
import blogReducer from "../MainPages/AllBlogs/blogSlice";
import userReducer from "../MainPages/UserProfile/UserSlice"

const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: userReducer
  },
});

export default store;