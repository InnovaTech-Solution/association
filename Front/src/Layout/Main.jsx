import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from '../Pages/Home';
import Inventory from '../Pages/Inventory';
import Sidebar from "../Component/Headers/SideBar";
import Calendrier from "../Pages/Calendrier";
import Comptabilite from "../Pages/Comptabilite";
import {Box} from "@mui/material";
import ReportButton from "../Component/Report/ReportButton";

export default function Main() {
    return (
        // <ThemeProvider>
        <div>

            <Box sx={{display: "flex", height: "100%", minHeight: "100vh"}}>
                <Sidebar/>
                <ReportButton/>
                <div>
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/inventory" element={<Inventory/>}/>
                        <Route path="/calendrier" element={<Calendrier/>}/>
                        <Route path="/comptabilite" element={<Comptabilite/>}/>
                    </Routes>
                </div>
            </Box>
        </div>
        // </ThemeProvider>
    );
}