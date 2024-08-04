import { logoutUser } from '../services/authService';

export const logout = async (req, res) => {
  try {
    logoutUser(req.headers.authorization);
    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: 'Error when Authorizing the user'
    });
  }
};
