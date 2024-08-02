import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { showErrorMessage } from './toast';

const UserAuth = ({children}) => {
    try {
        const navigate = useNavigate();
        const token = localStorage.getItem('token');
        useEffect(() =>{
          if (!token || token === 'undefined')  return  navigate('/signin') 
        }, [token])
        return children;
        } catch (error) {
          showErrorMessage(error.message);
        }
}

export default UserAuth