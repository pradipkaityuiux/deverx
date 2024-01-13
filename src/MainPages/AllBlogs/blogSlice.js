import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    visibleBlogs: [],
    currentUserAllBlogs:[],
    currentUserFavBlogs: [],
    blogs: [],
  },
  reducers: {
    toggleVisibility: (state, action) => {
      const blogId = action.payload;
      if (state.visibleBlogs.includes(blogId)) {
        state.visibleBlogs = state.visibleBlogs.filter((id) => id !== blogId);
      } else {
        state.visibleBlogs.push(blogId);
      }
    },
    setCurrentUserAllBlogs:(state, action)=>{
      state.currentUserAllBlogs = action.payload
    },
    setCurrentUserFavBlogs:(state, action)=>{
      state.currentUserFavBlogs = action.payload
    },
    likeBlog: (state, action) => {
      const { blogId, incrementLikes, incrementDislikes } = action.payload;
      const blogIndex = state.blogs.findIndex((blog) => blog.id === blogId);

      if (blogIndex !== -1) {
        state.blogs[blogIndex].totalLikes += incrementLikes;
        state.blogs[blogIndex].totalDislikes += incrementDislikes;
      }
    },
  },
});

export const { toggleVisibility, likeBlog, setCurrentUserAllBlogs, setCurrentUserFavBlogs } = blogSlice.actions;
export const selectVisibleBlogs = (state) => state.blog.visibleBlogs;
export const currentUserAllBlogs = (state) => state.blog.currentUserAllBlogs;
export const currentUserFavBlogs = (state) => state.blog.currentUserAllBlogs;
export const selectBlogs = (state) => state.blog.blogs;
export default blogSlice.reducer;