import React, {useState} from 'react'
import '/src/css/Contact.css'
import { Button, TextField, Typography, Box, Container, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary,
  color: theme.palette.primary,
  borderRadius: '30px',
  padding: '14px 50px',
  margin: '20px 0',
  fontSize: '1rem',
  transition: 'background-color 0.3s, transform 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.primary,
    transform: 'scale(1.05)',
  },
}));
const Contact = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); 


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, phone, message });

    setIsSubmitted(true);

    setName('');
    setEmail('');
    setPhone('');
    setMessage('');


    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };


  const choose = (select) => {
    setStatus(select);
  };

  const scrollToForm = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <Container maxWidth="md" className="contact-page">
    <Box
      className="contact-hero"
      sx={{
        textAlign: 'center',
        padding: '50px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #2b5876, #4e4376)',
        color: '#fff',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: '3.5rem',
          fontWeight: 700,
          textShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        Contact Us
      </Typography>
    </Box>

    <Box
      className="contact-content"
      sx={{ textAlign: 'center', padding: '20px', marginTop: '30px' }}
    >
      <Typography variant="h6" sx={{ marginBottom: '20px' }}>
        Please choose the correct option
      </Typography>
      <Box
        className="status-buttons"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <StyledButton
          onClick={() => choose('new')}
          variant={status === 'new' ? 'contained' : 'outlined'}
        >
          I'm a new member in Elal
        </StyledButton>
        <StyledButton
          onClick={() => choose('old')}
          variant={status === 'old' ? 'contained' : 'outlined'}
        >
          I'm an old member in Elal
        </StyledButton>
      </Box>
      {status && (
        <Typography
          variant="body1"
          sx={{ margin: '20px 0', color: '#007bff' }}
        >
          Thank you!
        </Typography>
      )}
      <StyledButton className="scroll-to-form" onClick={scrollToForm}>
        Fill the form
      </StyledButton>
    </Box>

    <Paper
      className="contact-form-section"
      sx={{
        padding: '40px',
        marginTop: '30px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        background: 'linear-gradient(to right, #ffffff, #e6e9f0)',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '2.5rem',
          color: '#4e4376',
          fontWeight: 'bold',
        }}
      >
        Leave your details and we will get back to you
      </Typography>
      <form onSubmit={handleSubmit} className="contact-form">
        <Box className="form-group" sx={{ marginBottom: '24px' }}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ borderRadius: '8px', fontSize: '1.1rem', width: '400px' }}
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
        </Box>
        <Box className="form-group" sx={{ marginBottom: '24px' }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ borderRadius: '8px', fontSize: '1.1rem', width: '400px'}}
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
        </Box>
        <Box className="form-group" sx={{ marginBottom: '24px'}}>
          <TextField
            label="Phone"
            type="tel"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            sx={{ borderRadius: '8px', fontSize: '1.1rem', width: '400px' }}
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
        </Box>
        <Box className="form-group" sx={{ marginBottom: '24px' }}>
          <TextField
            label="Add details"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ borderRadius: '8px', fontSize: '1.1rem',  width: '400px' }}
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
        </Box>
        <Box
          className="image-container"
          sx={{ textAlign: 'center', margin: '20px 0' }}
        >
          <img
            src="/images/images.jpeg"
            alt="Contact Image"
            title="Call Us: 03-977-1111"
            style={{
              width: '200px',
              borderRadius: '20px',
              transition: 'opacity 0.3s ease',
            }}
          />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <StyledButton type="submit">Submit</StyledButton>
        </Box>
      </form>
      {isSubmitted && (
        <Box
          className="popup-message"
          sx={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: 'white',
            color: '#4e4376',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            animation: 'popup 0.5s forwards',
          }}
        >
          <Typography variant="body1">
            Thank you for reaching out! We will get back to you soon.
          </Typography>
        </Box>
      )}
    </Paper>
  </Container>
);
};

export default Contact