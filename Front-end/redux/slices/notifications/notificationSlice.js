import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    counter: 0,
    notifications: [],
    notificationsOnDisplay: [],
    display: false,
  },
  reducers: {
    setNotifications(state, action) {
      state.notifications = [...state.notifications, action.payload];
    },
    incrementCounter(state, action) {
      state.counter += 1;
    },
    setDisplay(state, action) {
      state.display = !state.display;
      if (state.display == false) {
        state.counter = 0;
        for (const notification of state.notifications) {
          notification.read = true;
        }
      }
    },
    markRead(state, action) {
      let lastIndex = state.notifications.length - 1;
      let offset = action.payload;

      for (let i = lastIndex; i > lastIndex - offset; i--) {
        state.notifications[i].read = true;
      }
    },
    adjustCounter(state, action) {
      state.counter = 0;
      for (const item of state.notifications) {
        if (!item.read) state.counter += 1;
      }
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
