import jwtDecode from 'jwt-decode';

const getUserInfo = (token = localStorage.getItem('token')) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export default getUserInfo;