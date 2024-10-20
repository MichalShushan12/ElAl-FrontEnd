import React,  { useState, useEffect }  from 'react'
import '/src/css/Auth.css';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { logout, setUser } from '../../states/userSlice';
import { useDispatch } from 'react-redux';
import { clearOrders } from '../../states/orderSlice';

const Auth = () => {
    

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate= useNavigate();

  

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      navigate('/signin');
      handleMenuClose();
      dispatch(setUser(user));
    } catch (error) {
      console.log(error);
    }
  };


const handleSignUp = async (e) => {
  e.preventDefault();
  try {
    navigate('/signup');
    handleMenuClose();
  } catch (error) {
    console.log(error);
  }
};

const handleSignOut = () => {
  dispatch(logout()); // יציאת המשתמש מהאתר
  dispatch(clearOrders()); // ניקוי הזמנות של המשתמש הקודם, לאחר יציאתו
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
  navigate('/auth'); // מעבר לדף הכניסה
  handleMenuClose();
};



useEffect(() => {
  const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  if ( storedToken) {
    dispatch(setUser({ token: storedToken }));
  } else {
    dispatch(logout()); // Optional: Log out if no token
  }
}, [dispatch]);


  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };


  return (
<>
<div>
<IconButton onClick={handleMenuOpen}>
  <AccountCircle fontSize="large" />
</IconButton>
<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
>
  <MenuItem onClick={() => handleNavigation('/auth')}>
    <Typography variant="body1">Login</Typography>
  </MenuItem>
  <MenuItem onClick={() => handleNavigation('/auth/update-password')}>
    <Typography variant="body1">Update Password</Typography>
  </MenuItem>
  <MenuItem onClick={() => handleNavigation('/auth/signup')}>
    <Typography variant="body1">Sign Up</Typography>
  </MenuItem>
  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
  <MenuItem onClick={() => handleNavigation('/orders')}>
    <Typography variant="body1">My Orders</Typography>
  </MenuItem>
</Menu>
</div>


</>

    
  )
}

export default Auth