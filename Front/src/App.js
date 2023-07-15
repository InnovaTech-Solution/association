import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Layout/Main";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/*" element={<Main/>}/>
                <Route path="*" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
