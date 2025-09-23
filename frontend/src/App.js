import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import lightBackground from '../src/assets/wa-background-light.png';
import darkBackground from '../src/assets/wa-background-dark.jpg';
import { ptBR } from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";
import { SocketContext, SocketManager } from './context/Socket/SocketContext';

import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = createTheme(
        {
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '8px',
                    height: '8px',
					borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: "#2e4e94",
					borderRadius: "8px",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "8px",
					borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "#F3F3F3" : "#333333",
					borderRadius: "8px",
                },
            },
            palette: {
                type: mode,
                primary: { main: mode === "light" ? "#2e4e94" : "#FFFFFF" },
                quicktags: { main: mode === "light" ? "#2e4e94" : "#2e4e94" },
                sair: { main: mode === "light" ? "#2e4e94" : "#1A1A1A" },
                vcard: { main: mode === "light" ? "#1e3361" : "#2D2D2D" },
                textPrimary: mode === "light" ? "#1e3361" : "#FFFFFF",
                borderPrimary: mode === "light" ? "#2e4e94" : "#FFFFFF",
                dark: { main: mode === "light" ? "#1e3361" : "#FFFFFF" },
                light: { main: mode === "light" ? "#FFFFFF" : "#1A1A1A" },
                tabHeaderBackground: mode === "light" ? "#f0f4fb" : "#2D2D2D",
                ticketlist: mode === "light" ? "#e6ecf9" : "#1A1A1A",
                optionsBackground: mode === "light" ? "#e6ecf9" : "#1A1A1A",
                options: mode === "light" ? "#d9e3f7" : "#2D2D2D",
                fontecor: mode === "light" ? "#4576e0" : "#FFFFFF",
                fancyBackground: mode === "light" ? "#f5f7fb" : "#1A1A1A",
                bordabox: mode === "light" ? "#d0daf0" : "#1A1A1A",
                newmessagebox: mode === "light" ? "#d0daf0" : "#1A1A1A",
                inputdigita: mode === "light" ? "#FFFFFF" : "#2D2D2D",
                contactdrawer: mode === "light" ? "#FFFFFF" : "#2D2D2D",
                announcements: mode === "light" ? "#edf1fa" : "#1A1A1A",
                login: mode === "light" ? "#FFFFFF" : "#0A0A0A",
                announcementspopover: mode === "light" ? "#FFFFFF" : "#2D2D2D",
                chatlist: mode === "light" ? "#d9e3f7" : "#2D2D2D",
                boxlist: mode === "light" ? "#edf1fa" : "#2D2D2D",
                boxchatlist: mode === "light" ? "#f0f4fb" : "#1A1A1A",
                total: mode === "light" ? "#FFFFFF" : "#141414",
                messageIcons: mode === "light" ? "#2e4e94" : "#FFFFFF",
                inputBackground: mode === "light" ? "#FFFFFF" : "#1A1A1A",
                barraSuperior: mode === "light" 
                ? "linear-gradient(to right, #4576e0, #2e4e94, #1e3361)" 
                : "#666",
                boxticket: mode === "light" ? "#f5f7fb" : "#2D2D2D",
                campaigntab: mode === "light" ? "#edf1fa" : "#2D2D2D",
                mediainput: mode === "light" ? "#e6ecf9" : "#0A0A0A",
                contadordash: mode === "light" ? "#FFFFFF" : "#FFFFFF",
            },
            mode,
        },
        locale
    );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale =
            i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

        if (browserLocale === "ptBR") {
            setLocale(ptBR);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);



    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                  <SocketContext.Provider value={SocketManager}>
                      <Routes />
                  </SocketContext.Provider>
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
