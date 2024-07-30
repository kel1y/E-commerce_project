import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    active: null,
  },
  reducers: {
    setActiveTab(state, action) {
      state.active = action.payload;
    },
  },
});

export const sidebarActions = sidebarSlice.actions;
export default sidebarSlice;
