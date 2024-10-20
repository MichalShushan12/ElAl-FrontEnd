import React, { useState } from 'react';
import { Button, Menu, MenuItem, ListItemText } from '@mui/material';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { useLanguage } from './LanguageContext';
import '/src/css/Accessibility.css'

const AccessibilityButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const applyAccessibilityOption = (option) => {
      switch (option) {
        case 'highContrast':
          document.body.classList.toggle('high-contrast');
          break;
        case 'grayscale':
          document.body.classList.toggle('grayscale');
          break;
        case 'reducedMotion':
          document.body.classList.toggle('reduced-motion');
          break;
        case 'textSize':
          document.body.classList.toggle('text-size');
          break;
        default:
          break;
      }
      handleClose();
    };
  
    return (
      <>

        <Button
          aria-controls={open ? 'accessibility-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          color="primary"
          startIcon={<AccessibilityIcon />}
          aria-label="Accessibility options"
        >
         
        </Button>
        <Menu
          id="accessibility-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          aria-labelledby="accessibility-button"
        >
          {['highContrast', 'grayscale', 'reducedMotion', 'textSize'].map(option => (
            <MenuItem key={option} onClick={() => applyAccessibilityOption(option)}>
              <ListItemText primary={option.replace(/([A-Z])/g, ' $1').toUpperCase()} />
            </MenuItem>
          ))}
        </Menu>

      </>
  );
};

export default AccessibilityButton;