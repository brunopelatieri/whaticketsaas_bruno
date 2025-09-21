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
                    backgroundColor: "#2DDD7F",
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
                primary: { main: mode === "light" ? "#8B5CF6" : "#00FFFF" },
                quicktags: { main: mode === "light" ? "#8B5CF6" : "#8B5CF6" },
                sair: { main: mode === "light" ? "#8B5CF6" : "#1A1A1A" },
                vcard: { main: mode === "light" ? "#8B5CF6" : "#2D2D2D" },
                textPrimary: mode === "light" ? "#8B5CF6" : "#00FFFF",
                borderPrimary: mode === "light" ? "#8B5CF6" : "#00FFFF",
                dark: { main: mode === "light" ? "#1A1A1A" : "#FFFFFF" },
                light: { main: mode === "light" ? "#FFFFFF" : "#1A1A1A" },
                tabHeaderBackground: mode === "light" ? "#F8F8F8" : "#2D2D2D",
                ticketlist: mode === "light" ? "#F5F5F5" : "#1A1A1A",
                optionsBackground: mode === "light" ? "#F5F5F5" : "#1A1A1A",
                options: mode === "light" ? "#F5F5F5" : "#2D2D2D",
                fontecor: mode === "light" ? "#6D28D9" : "#00FFFF",
                fancyBackground: mode === "light" ? "#F5F5F5" : "#1A1A1A",
                bordabox: mode === "light" ? "#E5E5E5" : "#1A1A1A",
                newmessagebox: mode === "light" ? "#E5E5E5" : "#1A1A1A",
                inputdigita: mode === "light" ? "#FFFFFF" : "#2D2D2D",
                contactdrawer: mode === "light" ? "#FFFFFF" : "#2D2D2D",
                announcements: mode === "light" ? "#F0F0F0" : "#1A1A1A",
                login: mode === "light" ? "#FFFFFF" : "#0A0A0A",
                announcementspopover: mode === "light" ? "#FFFFFF" : "#2D2D2D",
                chatlist: mode === "light" ? "#E5E5E5" : "#2D2D2D",
                boxlist: mode === "light" ? "#F0F0F0" : "#2D2D2D",
                boxchatlist: mode === "light" ? "#F0F0F0" : "#1A1A1A",
                total: mode === "light" ? "#FFFFFF" : "#141414",
                messageIcons: mode === "light" ? "#6B7280" : "#00FFFF",
                inputBackground: mode === "light" ? "#FFFFFF" : "#1A1A1A",
                barraSuperior: mode === "light" ? "linear-gradient(to right, #8B5CF6, #A855F7, #C084FC)" : "linear-gradient(to right, #00FFFF, #0EA5E9, #8B5CF6)",
                boxticket: mode === "light" ? "#F8F8F8" : "#2D2D2D",
                campaigntab: mode === "light" ? "#F0F0F0" : "#2D2D2D",
                mediainput: mode === "light" ? "#F0F0F0" : "#0A0A0A",
                contadordash: mode == "light" ? "#FFFFFF" : "#00FFFF",
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
