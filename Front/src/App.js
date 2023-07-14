import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ColorModeContext, useMode} from "./Theme/theme";
import {ThemeProvider, CssBaseline} from "@mui/material";

// import Home from "./Pages/Home";
// import Inventory from "./Pages/Inventory";
// import Contact from "./Pages/Contact";
// import FeedBack from "./Pages/FeedBack";
import Main from "./Layout/Main";

function App() {
    const [theme, colorMode] = useMode();
    return (
        <ColorModeContext.Provider value={useMode()}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<Main/>}/>
                        <Route path="*" element={<Main/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
