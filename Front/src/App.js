import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

// import Home from "./Pages/Home";
// import Inventory from "./Pages/Inventory";
// import Contact from "./Pages/Contact";
// import FeedBack from "./Pages/FeedBack";
import Main from "./Layout/Main";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Main/>}/>
                <Route path="*" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
