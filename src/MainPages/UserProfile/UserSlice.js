import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentBlogId: '',
    showPopup: false,
    showUserEditPopup: false
  },
  reducers: {
    togglePopup: (state, action) => {
        state.showPopup = action.payload
    },
    toggleUserEditPopup: (state, action) => {
        state.showUserEditPopup = action.payload
    },
    setCurrentBlog:(state, action)=>{
      state.currentBlogId = action.payload
    }
  }
});

export const { togglePopup, toggleUserEditPopup, setCurrentBlog } = userSlice.actions;
export const currentBlogId = (state) => state.user.currentBlogId;
export const showPopup = (state) => state.user.showPopup;
export const showPopupUserEdit = (state) => state.user.showUserEditPopup;
export default userSlice.reducer;