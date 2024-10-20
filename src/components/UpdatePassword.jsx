import React, { useState } from 'react';
import { TextField, Button, Typography, IconButton} from '@mui/material';
import { updateUserPassword } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import {Visibility, VisibilityOff } from '@mui/icons-material';


const UpdatePassword = () => {
  
  const [userName, setUserName] = useState('');
  const [currentpassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // אפשרות למשתמש לראות את הסיסמא הנוכחית ואז להסתירה שוב
  const [showNewPassword, setShowNewPassword] = useState(false); // אפשרות למשתמש לראות את הסיסמא החדשה ואז להסתירה שוב
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false); // אפשרות למשתמש לראות את הסיסמא לאישור ואז להסתירה שוב

  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (loading) return;

    setError('');
    setSuccessMessage('');


    if (newPassword !== confirmNewPassword) {
      setError('New password and confirm password do not match.');
      setLoading(false);
      return;
    }

    const updatePasswordData = {
      UserName: userName, 
      CurrentPassword: currentpassword,
      NewPassword: newPassword,
      ConfirmNewPassword: confirmNewPassword
    };

    try {
      const success = await updateUserPassword(updatePasswordData);
      if (success) {
        setSuccessMessage('Password updated successfully!');
        navigate('/'); // Redirect to home or another page
      } else {
        setError('Failed to update the password.');
      }
    } catch (error) {
      setError(error.response?.data || 'Error updating password.');
  } finally {
      setLoading(false);
  }
};

    /*
    try {
      const success = await updateUserPassword(updatePasswordData);
      if (success) {
        setSuccessMessage('Password updated successfully!');
        navigate('/'); // Redirect to home or another page
      } else {
        setError('Failed to update the password.');
      }
    } catch (error) {
      setError(error.response?.data || 'Error updating password.');
    }
  };
*/
  

  return (
    <div className="update-password-container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>Update Password</Typography>
      {error && <Typography color="error" align="center">{error}</Typography>}
      {successMessage && <Typography color="primary" align="center">{successMessage}</Typography>}
      <form onSubmit={handleSubmit}>

      <TextField
          fullWidth
          label="User Name"
          id='User Name'
          variant="outlined"
          margin="normal"
          type="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          InputProps={{
            style: { borderRadius: '4px ' },
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
          label="Current Password"
          id='Current Password'
          variant="outlined"
          margin="normal"
          type={showPassword ? 'text' : 'password'} // כפתור מיתוג לראיית הסיסמא והסתרתה
          value={currentpassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
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
          label="New Password"
          id='New Password'
          variant="outlined"
          margin="normal"
          type={showNewPassword ? 'text' : 'password'} // כפתור מיתוג לראיית הסיסמא והסתרתה
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          InputProps={{
            style: { borderRadius: '4px ' },
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowNewPassword(!showNewPassword)} // אי מתן ראיית הסיסמא כשאר כותבים אותה
                edge="end"
              >
                {showNewPassword ? <Visibility/>: <VisibilityOff />}
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
          label="Confirm New Password"
          id='Confirm New Password'
          variant="outlined"
          margin="normal"
          type={showPasswordConfirm ? 'text' : 'password'} // כפתור מיתוג לראיית הסיסמא והסתרתה
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
          InputProps={{
            style: { borderRadius: '4px ' },
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} // אי מתן ראיית הסיסמא כשאר כותבים אותה
                edge="end"
              >
                {showPasswordConfirm ? <Visibility/>: <VisibilityOff />}
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
        <Button type="submit" variant="contained" color="primary" fullWidth>Update Password</Button>
      </form>
    </div>
  );
};

export default UpdatePassword;