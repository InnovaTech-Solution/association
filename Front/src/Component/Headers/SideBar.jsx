import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import WorkIcon from '@mui/icons-material/Work';
import ServicesIcon from '@mui/icons-material/EmojiObjects';
import ContactIcon from '@mui/icons-material/ContactMail';
import ExampleImage from "../../../Layouts/Images/gn.jpg";

const Sidebar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ position: 'fixed', zIndex: 999, marginLeft: '2px' }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        {isDrawerOpen && (
          <Box sx={{ backgroundColor: '#AAA', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
              <img src={ExampleImage} alt="Logo" style={{ width: 80, height: 80, borderRadius: '50%' }} />
            </Box>
            <List sx={{ width: 200 }}>
              <ListItem sx={{ pl: 3 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Information
                </Typography>
              </ListItem>
              <ListItem button component={Link} to="/" onClick={toggleDrawer}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Accueil" sx={{ marginLeft: '-2vh' }} />
              </ListItem>
              <ListItem button component={Link} to="/about-us" onClick={toggleDrawer}>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Notre histoire" sx={{ marginLeft: '-2vh' }} />
              </ListItem>
              <ListItem sx={{ pl: 3 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Nos réalisations
                </Typography>
              </ListItem>
              <ListItem button component={Link} to="/our-projects" onClick={toggleDrawer}>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText primary="Nos projets" sx={{ marginLeft: '-2vh' }} />
              </ListItem>
              <ListItem button component={Link} to="/our-services" onClick={toggleDrawer}>
                <ListItemIcon>
                  <ServicesIcon />
                </ListItemIcon>
                <ListItemText primary="Nos Services" sx={{ marginLeft: '-2vh' }} />
              </ListItem>
              <ListItem sx={{ pl: 3 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  Contacts / Partenaires
                </Typography>
              </ListItem>
              <ListItem button component={Link} to="/contact" onClick={toggleDrawer}>
                <ListItemIcon>
                  <ContactIcon />
                </ListItemIcon>
                <ListItemText primary="Contact" sx={{ marginLeft: '-2vh' }} />
              </ListItem>
            </List>
          </Box>
        )}
      </Drawer>
    </>
  );
};

export default Sidebar;
