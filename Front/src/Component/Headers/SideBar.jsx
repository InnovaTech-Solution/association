import React from 'react';
import {Box, List, ListItem, ListItemIcon, ListItemText, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import WorkIcon from '@mui/icons-material/Work';
import ServicesIcon from '@mui/icons-material/EmojiObjects';
import ContactIcon from '@mui/icons-material/ContactMail';

const Sidebar = () => {

    return (
        <Box sx={{backgroundColor: '#AAA', height: '100%'}}>
            <List sx={{width: 200}}>
                <ListItem sx={{pl: 3}}>
                    <Typography variant="subtitle2" color="textSecondary">
                        Information
                    </Typography>
                </ListItem>
                <ListItem button component={Link} to="/home">
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="home" sx={{marginLeft: '-2vh'}}/>
                </ListItem>
                <ListItem button component={Link} to="/home">
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
                <ListItem button component={Link} to="/inventory">
                    <ListItemIcon>
                        <WorkIcon/>
                    </ListItemIcon>
                    <ListItemText primary="inventory" sx={{marginLeft: '-2vh'}}/>
                </ListItem>
                <ListItem button component={Link} to="/feedback">
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
                <ListItem button component={Link} to="/contact">
                    <ListItemIcon>
                        <ContactIcon/>
                    </ListItemIcon>
                    <ListItemText primary="contact" sx={{marginLeft: '-2vh'}}/>
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
