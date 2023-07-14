import React, {useState} from 'react';
import {Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import WorkIcon from '@mui/icons-material/Work';
import ServicesIcon from '@mui/icons-material/EmojiObjects';
import ContactIcon from '@mui/icons-material/ContactMail';

const Sidebar = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        // setDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{position: 'fixed', zIndex: 999, marginLeft: '2px'}}>
                <MenuIcon/>
            </IconButton>
            <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
                {isDrawerOpen && (
                    <Box sx={{backgroundColor: '#AAA', height: '100%'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2}}>
                            {/*<img src={ExampleImage} alt="Logo" style={{ width: 80, height: 80, borderRadius: '50%' }} />*/}
                        </Box>
                        <List sx={{width: 200}}>
                            <ListItem sx={{pl: 3}}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Information
                                </Typography>
                            </ListItem>
                            <ListItem button component={Link} to="/home" onClick={toggleDrawer}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="home" sx={{marginLeft: '-2vh'}}/>
                            </ListItem>
                            <ListItem button component={Link} to="/home" onClick={toggleDrawer}>
                                <ListItemIcon>
                                    <HistoryIcon/>
                                </ListItemIcon>
                                <ListItemText primary="home" sx={{marginLeft: '-2vh'}}/>
                            </ListItem>
                            <ListItem sx={{pl: 3}}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Nos réalisations
                                </Typography>
                            </ListItem>
                            <ListItem button component={Link} to="/inventory" onClick={toggleDrawer}>
                                <ListItemIcon>
                                    <WorkIcon/>
                                </ListItemIcon>
                                <ListItemText primary="inventory" sx={{marginLeft: '-2vh'}}/>
                            </ListItem>
                            <ListItem button component={Link} to="/feedback" onClick={toggleDrawer}>
                                <ListItemIcon>
                                    <ServicesIcon/>
                                </ListItemIcon>
                                <ListItemText primary="feedback" sx={{marginLeft: '-2vh'}}/>
                            </ListItem>
                            <ListItem sx={{pl: 3}}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Contacts / Partenaires
                                </Typography>
                            </ListItem>
                            <ListItem button component={Link} to="/contact" onClick={toggleDrawer}>
                                <ListItemIcon>
                                    <ContactIcon/>
                                </ListItemIcon>
                                <ListItemText primary="contact" sx={{marginLeft: '-2vh'}}/>
                            </ListItem>
                        </List>
                    </Box>
                )}
            </Drawer>
        </>
    );
};

export default Sidebar;
