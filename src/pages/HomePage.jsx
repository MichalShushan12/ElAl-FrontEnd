import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllContinents } from '../services/continentsService';
import { Grid, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faSnapchat, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCcVisa, faCcMastercard, faCcAmex, faCcPaypal, faGooglePay } from '@fortawesome/free-brands-svg-icons';

const HomePage = () => {
  const [selectedContinent, setSelectedContinent] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedContinent) {
      navigate(`/continents/${selectedContinent}`);
    } else {
      console.error('Please select a continent.');
    }
  };

  return (
    <StyledContainer>
      <Grid container direction="column" alignItems="center" justifyContent="center" className="content">
        <Grid item>
          <Typography variant="h1" className="title">Welcome</Typography>
        </Grid>
        <Grid item className="background-video">
          <video autoPlay loop muted className="video">
            <source src={'/clip/בואו להכיר את הדרימליינר החדש של אל על.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Grid>
        <br/><br/>
        <Grid item className="destination-form">
          <Typography variant="h3">Find Your Destination</Typography>
          <br/>

          <form onSubmit={handleSubmit}>
            <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="continent-select">Select A Continent</InputLabel>
            <Select
            label="Select A Continent"
            id='continent-select'
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value)}
            

                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 400, // Adjust dropdown height if needed
                      marginTop: '40px', // Space between label and dropdown options
                    },
                  },
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                }}
              >
                <MenuItem value="">
                <em>Select a continent</em>
                </MenuItem>
                <MenuItem value="asia">Asia</MenuItem>
                <MenuItem value="africa">Africa</MenuItem>
                <MenuItem value="southAmerica">South America</MenuItem>
                <MenuItem value="northAmerica">North America</MenuItem>
                <MenuItem value="europe">Europe</MenuItem>  
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" className="search-button">
              Search
            </Button>
            </form>
        </Grid>
        <Grid item className="social-icons">
          <FontAwesomeIcon icon={faInstagram} className="icon" />
          <FontAwesomeIcon icon={faFacebook} className="icon" />
          <FontAwesomeIcon icon={faSnapchat} className="icon" />
          <FontAwesomeIcon icon={faTwitter} className="icon" />
        </Grid>
        <Grid item className="payment-icons">
          <FontAwesomeIcon icon={faCcVisa} className="icon" />
          <FontAwesomeIcon icon={faCcMastercard} className="icon" />
          <FontAwesomeIcon icon={faCcAmex} className="icon" />
          <FontAwesomeIcon icon={faGooglePay} className="icon" />
          <FontAwesomeIcon icon={faCcPaypal} className="icon" />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

const StyledContainer = styled('div')(({ theme }) => ({
  height: '220vh',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
  '.content': {
    height: '100%',
    textAlign: 'center',
    padding: theme.spacing(4),
    color: theme.palette.text.primary,
  },
  '.title': {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.main,
  },
  '.background-video': {
    position: 'relative',
    width: '100vh',
    height: '50%',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    marginBottom: theme.spacing(4),
    minHeight: '600px', // Ensure the container has a minimum height
    '.video': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  '.destination-form': {
    background: theme.palette.background.paper,
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    Width: '10000px', // Increase width to make the form wider
    width: '100%',
    margin: '50px auto',
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '.search-button': {
      marginTop: theme.spacing(2),
      padding: theme.spacing(1.5, 4),
      fontSize: '1.2rem',
    },
  },
  '.payment-icons': {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
    '.icon': {
      fontSize: '2rem',
      color: theme.palette.text.primary,
    },
  },
}));
  
  export default HomePage;
