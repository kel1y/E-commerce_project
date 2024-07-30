import React, { useEffect, useState } from 'react';
import '../../styles/notifications.css';
import { io } from 'socket.io-client';
import getUserInfo from '../../utils/getUserInfo';
import { useDispatch, useSelector } from 'react-redux';
import { notificationActions } from '../../redux/slices/notifications/notificationSlice';

const token = localStorage.getItem('token');
const { VITE_SOCKET_CHAT_URL } = process.env;

const socket = io.connect(VITE_SOCKET_CHAT_URL, {
  extraHeaders: {
    token,
  },
});
export const Notifications = ({
  top = 60,
  leftMargin = '35%',
  display = 'none',
  bottom = false,
}) => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const user = getUserInfo();

  const [offSet, setOffset] = useState(4);

  socket.emit('join', { id: user.payload.id });

  const markAsRead = (limit) => {
    dispatch(notificationActions.markRead(limit));
  };
  const recalculateCounter = () => {
    dispatch(notificationActions.adjustCounter());
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server, socket connection:', socket.connected);
    });

    socket.on('notification', (data) => {
      dispatch(notificationActions.setNotifications(data));
      dispatch(notificationActions.incrementCounter());
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('notification');
    };
  }, [socket]);

  return (
    <div
      className={`${
        !bottom ? 'notifications-container' : 'notifications-container-bottom'
      }`}
      style={{ top: top, marginLeft: leftMargin, display: display }}
    >
      <div className="notifications-header">
        <label>Notifications</label>
        <div className="notifications-divider-header" />
      </div>
      <div className="all-notifications">
        {notifications.length > 0 ? (
          [...notifications]
            .reverse()
            .slice(0, offSet)
            .map((notification, index) => (
              <div key={index}>
                <div
                  className={`single-notification ${
                    !notification.read && 'not-read'
                  }`}
                >
                  <div className="notification-details">
                    <label className="notification-header">
                      {notification.header}
                    </label>
                    <label className="notification-body">
                      {notification.body}
                    </label>
                  </div>
                  <label className="notification-date">
                    {notification.date}
                  </label>
                </div>
                <div className="notifications-divider" />
              </div>
            ))
        ) : (
          <label className='notifications-empty'>No notifications</label>
        )}
      </div>
      {notifications.length > 4 && (
        <div className="notifications-load-more">
          {notifications.length / offSet > 1 ? (
            <button
              onClick={() => {
                setOffset((prevState) => prevState + 4);
                markAsRead(offSet);
                recalculateCounter();
              }}
            >
              Load more
            </button>
          ) : (
            <button
              onClick={() => {
                if (notifications.length <= offSet) {
                  setOffset(4);
                } else {
                  setOffset((prevState) => prevState - 4);
                }
              }}
            >
              Load less
            </button>
          )}
        </div>
      )}
    </div>
  );
};
