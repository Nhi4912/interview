import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Progress', path: '/progress-tracker' },
    { label: 'Checklist', path: '/interview-checklist' },
    { label: 'Complete Guide', path: '/frontend-interview-complete-guide' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Frontend Interview Hub
      </Typography>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            sx={{ textAlign: 'center' }}
            onClick={() => window.open('https://github.com/nhi4912/interview', '_blank')}
          >
            <ListItemText primary="GitHub" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #334155',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            Frontend Interview Hub
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <IconButton
                color="inherit"
                onClick={() => window.open('https://github.com/nhi4912/interview', '_blank')}
                sx={{ color: 'text.secondary' }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            backgroundColor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;