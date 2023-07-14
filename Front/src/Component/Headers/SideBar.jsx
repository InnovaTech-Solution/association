import React from 'react';
import {tokens} from "../../Theme/theme";
import {Box, Typography, useTheme} from '@mui/material';
import {Link} from 'react-router-dom';
import {Sidebar, MenuItem, Menu} from "react-pro-sidebar";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import ContactIcon from '@mui/icons-material/ContactSupport';

function Item(props) {
    const {icon, title, to, ...other} = props;
    const color = tokens(useTheme().palette.mode);
    return (
        <Box>
            <MenuItem
                component={<Link to={to}/>}
                style={{backgroundColor: color.blueAccent[900]}}
                sx={{backgroundColor: "transparent !important"}}
                icon={icon}
            >
                <Typography {...other}>
                    {title}
                </Typography>
            </MenuItem>
        </Box>
    );
}

const SidebarCustom = () => {

    return (
        <Sidebar
            border="none"
            height="100%"
        >
            <Menu iconshape="square">
                <Typography variant="subtitle2" color="textSecondary" sx={{pl: 3}}>
                    Information
                </Typography>
                <Item
                    icon={<HomeIcon/>}
                    title="Home"
                    to="/home"
                />

                <Typography variant="subtitle2" color="textSecondary" sx={{pl: 3}}>
                    Nos réalisations
                </Typography>

                <Item
                    icon={<WorkIcon/>}
                    title="Inventaire"
                    to="/inventory"
                />


                <Typography variant="subtitle2" color="textSecondary" sx={{pl: 3}}>
                    Contacts / Partenaires
                </Typography>
                <Item
                    icon={<ContactIcon/>}
                    title="FeedBack"
                    to="/feedback"
                />
                <Item
                    icon={<ContactIcon/>}
                    title="Contact"
                    to="/contact"
                />
            </Menu>
        </Sidebar>
    );
};

export default SidebarCustom;
