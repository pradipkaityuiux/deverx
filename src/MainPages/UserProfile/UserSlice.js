import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentBlogId: '',
    showPopup: false
  },
  reducers: {
    togglePopup: (state, action) => {
        state.showPopup = action.payload
    },
    setCurrentBlog:(state, action)=>{
      state.currentBlogId = action.payload
    }
  }
});

export const { togglePopup, setCurrentBlog } = userSlice.actions;
export const currentBlogId = (state) => state.user.currentBlogId;
export const showPopup = (state) => state.user.showPopup;
export default userSlice.reducer;