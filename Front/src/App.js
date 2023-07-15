import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Layout/Main";
import Login from "./Pages/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/*" element={<Main/>}/>
                <Route path="*" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
