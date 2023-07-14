import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from '../Pages/Home';
import Inventory from '../Pages/Inventory';
import FeedBack from '../Pages/FeedBack';
import Contact from '../Pages/Contact';
import Sidebar from "../Component/Headers/SideBar";

export default function Main() {
    return (
        // <ThemeProvider>
        <div>
            <Sidebar/>
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