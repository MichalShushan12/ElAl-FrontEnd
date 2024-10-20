import React, {useState} from 'react'
import { TextField, Button, Typography, IconButton} from '@mui/material';
import {Visibility, VisibilityOff } from '@mui/icons-material';
import { createUser } from '../services/usersService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../states/userSlice';

const SignUp = () => {

  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // אפשרות למשתמש לראות את הסיסמא ואז להסתירה שוב
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false); // אפשרות למשתמש לראות את הסיסמא לאימות ואז להסתירה שוב
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
       

    try {
      const createdAt = new Date().toISOString();   

      
      const userDto ={
        FullName : fullName,
        UserName : userName,
        Email : email,
        Password : password,
        CreatedAt : createdAt
      }
        
      
      const response = await createUser(userDto);
      dispatch(setUser({ userId: response.userId, ...response }));
      navigate('/auth'); // מעבר לדף כניסה 
      console.log('Signed up successfully:', response);
    
    } 
   catch (error) {
    console.error('Sign-up error:', error);
  }
};



  


  
  /*
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the sign-up function here
    try {
      // Replace with your sign-up logic
      console.log('Signing up:', { signUpData,  confirmPassword });
      navigate('/login'); // Redirect to login page after sign-up
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };

  const handleSocialSignIn = (platform) => {
    // Implement your social sign-in logic here
    console.log(`Signing in with ${platform}`);
  };

   <div className="signup-container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
    <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        value={signUpData}
        onChange={(e) => setSignUpData(e.target.value)}
        required
      />
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        value={signUpData}
        onChange={(e) => setSignUpData (e.target.value)}
        required
      />
        <TextField
        fullWidth
        label="UserName"
        variant="outlined"
        margin="normal"
        type="userName"
        value={signUpData}
        onChange={(e) => setSignUpData (e.target.value)}
      />
      <TextField
        fullWidth
        label="Confirm Password"
        variant="outlined"
        margin="normal"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
    </form>

  */


  return (

    <div className="signup-container" style={{ maxWidth: '400px', margin: 'auto', padding: '30px'}}>
      <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
      <form onSubmit={handleSubmit}>

      <TextField
          fullWidth
          label="FullName"
          id='FullName'
          variant="outlined"
          margin="normal"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
          label="Username"
          id='Username'
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
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <TextField
          fullWidth
          label="Confirm Password"
          id='Confirm Password'
          variant="outlined"
          margin="normal"
          type={showPasswordConfirmed ? 'text' : 'password'} // כפתור מיתוג לראיית הסיסמא והסתרתה
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          InputProps={{
            style: { borderRadius: '4px ' },
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPasswordConfirmed(!showPasswordConfirmed)} // אי מתן ראיית הסיסמא כשאר כותבים אותה
                edge="end"
              >
                {showPasswordConfirmed ? <Visibility/>: <VisibilityOff />}
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
        <br/>
        <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
      </form>
   
   
  </div>  
)
}

export default SignUp