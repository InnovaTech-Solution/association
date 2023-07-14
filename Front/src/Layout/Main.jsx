import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from '../Pages/Home';
import Inventory from '../Pages/Inventory';
import FeedBack from '../Pages/FeedBack';
import Contact from '../Pages/Contact';
import Sidebar from "../Component/Headers/SideBar";
import {Box} from "@mui/material";

export default function Main() {
    return (
        // <ThemeProvider>
        <div>

            <Box sx={{display: "flex", flexDirection: "row", height: "100vh"}}>
                <Sidebar/>
            </Box>
            <div>
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/inventory" element={<Inventory/>}/>
                    <Route path="/feedback" element={<FeedBack/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                </Routes>
            </div>
        </div>
        // </ThemeProvider>
    );
}