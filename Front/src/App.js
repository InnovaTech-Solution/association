import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ColorModeContext, useMode} from "./Theme/theme";
import {ThemeProvider, CssBaseline} from "@mui/material";

import Main from "./Layout/Main";
import Login from "./Pages/Login";

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
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
