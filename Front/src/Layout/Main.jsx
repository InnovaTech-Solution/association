import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from '../Pages/Home';
import Inventory from '../Pages/Inventory';
import Report from '../Pages/Report';
import Contact from '../Pages/Contact';
import Sidebar from "../Component/Headers/SideBar";
import {Box} from "@mui/material";

export default function Main() {
    return (
        // <ThemeProvider>
        <div>

            <Box sx={{display: "flex", height: "100%", minHeight: "100vh"}}>
                <Sidebar/>
                <div>
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/inventory" element={<Inventory/>}/>
                        <Route path="/report" element={<Report/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                    </Routes>
                </div>
            </Box>
        </div>
        // </ThemeProvider>
    );
}