import React, { useState, useEffect } from 'react';
import { Twitter, Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { setUser, logout} from '../../states/userSlice';
import { TextField, Button, Checkbox, FormControlLabel, Typography, IconButton} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {getUserByUserName} from '../services/usersService'

const SignIn = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // אפשרות למשתמש לראות את הסיסמא ואז להסתירה שוב
  const [rememberMe, setRememberMe] = useState(false); // כפתור ששומר את המתמש אחרי שנכנס לאתר כבר פעם אחת
  const navigate = useNavigate();
  const dispatch = useDispatch();



  // I've created a url and a clientId for the email login... if the user prefers to login with this app instead
  const handleSocialSignIn = (platform) => {
    let url = '';
  
    switch (platform) {
      case 'Twitter':
        //login with twitter
        url = 'https://api.twitter.com/oauth/authenticate'; 
        break;
      case 'Google':
        //login with email
        url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${"410883253504-8qom0ll3quetdmsbopk1tv9bsnroc17h.apps.googleusercontent.com"}&redirect_uri=${"http://localhost:5173"}&response_type=token&scope=openid%20profile%20email`; // Google authentication URL
        break;
      default:
        console.log('Unsupported platform');
        return;
    }
  
    window.location.href = url; // מעבר לדף האפליקציה
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await getUserByUserName(userName);


        if (user && user.password === password) {
          dispatch(setUser({ userId: user.userId, ...user }));

          //אם המשתמש זכור במערכת, הוא מכניס אותו לאחסון העדכני במערכת
          if (rememberMe) {
            localStorage.setItem('userId',JSON.stringify(user));
          } else {
            // אם לא, אינו זכור במערכת
            sessionStorage.setItem('user', JSON.stringify(user));
          }
          navigate('/');
        } else {
          alert('Invalid password. Please try again.');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    };

   
    
    

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="UserName"
          id='UserName'
          variant="outlined"
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          InputProps={{
            style: { borderRadius: '4px ' }
          }}
           InputLabelProps={{
            style: { 
              marginTop: '-7px',
              fontSize: '16px',
            },
           
          }}
        />
        <TextField
          fullWidth
          label="Password"
          id='Password'
          variant="outlined"
          margin="normal"
          type={showPassword ? 'text' : 'password'} // כפתור מיתוג לראיית הסיסמא והסתרתה
          value={password}        
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            style: { borderRadius: '4px ' },
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)} // אי מתן ראיית הסיסמא כשאר כותבים אותה
                edge="end"
              >
                {showPassword ? <Visibility/>: <VisibilityOff />}
              </IconButton>
            ),
          }}
          InputLabelProps={{
            style: { 
              marginTop: '-7px',
              fontSize: '16px',
            },
          }}
        />
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}  style={{ paddingLeft:'20vh' }}/>}
          label="Remember Me"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
      </form>


      <Typography align="center" variant="subtitle1" style={{ margin: '20px 0' }}>Or SignIn with:</Typography>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
      <IconButton onClick={() => handleSocialSignIn('Twitter')} color="primary">
        <Twitter />
      </IconButton>
      <IconButton onClick={() => handleSocialSignIn('Google')} color="primary">
        <Google />
      </IconButton>
      </div>
    </div>
  );
};

export default SignIn;