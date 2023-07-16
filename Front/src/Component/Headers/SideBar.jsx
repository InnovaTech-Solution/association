import React from 'react';
import {Box, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {Sidebar, MenuItem, Menu} from "react-pro-sidebar";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import ContactIcon from '@mui/icons-material/ContactSupport';

function Item(props) {
    const {icon, title, to, ...other} = props;
    return (
        <Box>
            <MenuItem
                component={<Link to={to}/>}
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
                    Stock
                </Typography>

                <Item
                    icon={<WorkIcon/>}
                    title="Inventaire"
                    to="/inventory"
                />
                <Typography variant="subtitle2" color="textSecondary" sx={{pl: 3}}>
                    Comptabilité
                </Typography>
                <Item
                    icon={<ContactIcon/>}
                    title="Faire les comptes"
                    to="/comptabilite"
                />
                <Typography variant="subtitle2" color="textSecondary" sx={{pl: 3}}>
                    Gestion d'évènements
                </Typography>
                <Item
                    icon={<ContactIcon/>}
                    title="Calendrier"
                    to="/calendrier"
                />
                <Typography variant="subtitle2" color="textSecondary" sx={{pl: 3}}>
                    Aide
                </Typography>
                <Item
                    icon={<ContactIcon/>}
                    title="Report bug"
                    to="/report"
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
