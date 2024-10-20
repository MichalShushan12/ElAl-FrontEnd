import React, {useState} from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom'; 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from './ShoppingCartIcon';
import Auth from '../components/Auth';
import AccessibilityButton from './AccessibilityButton';
import { Menu, MenuItem, Button, ListItemText } from '@mui/material';
import { useLanguage } from './LanguageContext';
import LanguageIcon from '@mui/icons-material/Language';
import Logo from '/images/EL_AL_logo_old.svg.png'; // ייבוא הלוגו לדף הבית



const Layout = () => {

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null); 
  const { language, switchLanguage } = useLanguage(); 
  const languageOpen = Boolean(languageAnchorEl);

    const handleLanguageMenuClick = (event) => {
        setLanguageAnchorEl(event.currentTarget);
    };

    const handleLanguageMenuClose = () => {
        setLanguageAnchorEl(null);
    };

    const handleLanguageChange = (lang) => {
        switchLanguage(lang);
        handleLanguageMenuClose();
    };


  const handleLogoClick = () => {
    navigate('/');
  };


  return (
    <>
    <div className="layout-container" style={{ width: '100vw%' }}>
      <AppBar
        position="absolute"
        sx={{
          backgroundColor: '#ffffff',
          boxShadow: 'none',
          borderBottom: '2px solid white',
          boxSizing: 'border-box',
          left: 0,
          right: 0,
          padding: 0,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px'}}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: '#0000FF', fontWeight: 'bold', marginLeft: '20px' }}
          >
             <IconButton onClick={handleLogoClick}>
            <img src={Logo} alt="Site Logo" style={{ height: '40px',  borderRadius: '0', border: 'none' }} />
          </IconButton>
          </Typography>

          <nav style={{ flexGrow: 1}}>
            <ul
              style={{
                display: 'flex',
                listStyleType: 'none',
                padding: 0,
                margin: 0,
                justifyContent: 'center',
                alignItems: 'center', 
              }}
            >
              {[ '/', '/about', '/contact', '/destinations', '/continents'].map(
                (path, index) => (
                  <li key={index} style={{ margin: '0 30px' }}>
                    <NavLink
                      to={path}
                      style={({ isActive }) => ({
                        color: '#0000FF',
                        fontWeight: isActive ? 'bold' : 'normal',
                        textDecoration: 'none',
                      })}
                    >
                      {path === '/' && (language === 'en' ? 'Home' : 'דף הבית')}
                      {path === '/about' && (language === 'en' ? 'About' : 'אודות')}
                      {path === '/contact' && (language === 'en' ?  'Contact' : 'צור קשר')}
                      {path === '/destinations' && (language === 'en'  ? 'Booking' : 'הזמנת טיסות')}
                      {path === '/continents' && (language === 'en' ? 'Continents' : 'יבשות')}
                    </NavLink>
                  </li>
                )
              )}
              <li style={{ margin: '0 10px' }}>
                <AccessibilityButton sx={{ fontSize: 28, color: '#0000FF' }} />
              </li>
              <li style={{ margin: '0 10px' }}>
                <ShoppingCartIcon sx={{ fontSize: 28, color: '#0000FF' }} />
              </li>
              <li style={{ margin: '0 10px' }}>
                <Auth sx={{ fontSize: 28, color: '#0000FF' }} />
              </li>
             
             


            <li style={{ margin: '0 10px' }}>
              <Button
                aria-controls={languageOpen ? 'language-menu' : undefined}
                aria-haspopup="true"
                onClick={handleLanguageMenuClick}
                color="primary"
                startIcon={<LanguageIcon />}
                aria-label="Language options"
            >
                {language === 'en' ? 'English' : 'עברית'}
            </Button>
            <Menu
                id="language-menu"
                anchorEl={languageAnchorEl}
                open={languageOpen}
                onClose={handleLanguageMenuClose}
                aria-labelledby="language-button"
            >
                <MenuItem onClick={() => handleLanguageChange('en')}>
                    <ListItemText primary="English" />
                </MenuItem>
                <MenuItem onClick={() => handleLanguageChange('he')}>
                    <ListItemText primary="עברית" />
                </MenuItem>
            </Menu>
              </li>
            </ul>
          </nav>
        </Toolbar>
      </AppBar>

      <main className="main-content" style={{ paddingTop: '50px' }} >
        <Outlet />
      </main>
    </div>
</>
)

}
  

export default Layout