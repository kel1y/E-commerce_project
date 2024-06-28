/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import '../styles/dashboardHeader.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Logo, notification } from '../assets';
import user from '../assets/user.jpg';
import { getUser } from '../redux/slices/profile/updateProfile';
import { Notifications } from '../views/notifications/Notifications';
import { notificationActions } from '../redux/slices/notifications/notificationSlice';

const DashboardHeader = ({ text, className }) => {
  const dispatch = useDispatch();

  const notificationDisplay = useSelector(
    (state) => state.notifications.display
  );
  const notificationCounter = useSelector(
    (state) => state.notifications.counter
  );
  const handleDisplay = () => {
    dispatch(notificationActions.setDisplay());
  };
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className="dashboard-header">
      <img src={Logo} alt="falcons" className="logo-dashboard" />
      <p className={className}>{text}</p>
      <div className="dashboard-avatar">
        <div className="notification">
          <img src={notification} alt="notification" onClick={handleDisplay} />
          <span>{notificationCounter ? notificationCounter : 0}</span>
          {localStorage.getItem('token') && (
            <Notifications
              top={30}
              leftMargin="0"
              display={notificationDisplay ? 'flex' : 'none'}
            />
          )}
        </div>
        <Link to="/profile">
          <img src={user} alt="notification" className="user-profile" />
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
