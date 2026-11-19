
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("miniverse-theme") || "dark";
    });

    const isDark = theme === "dark";

    // Apply theme globally to the entire application
    useEffect(() => {
        const root = document.documentElement;

        root.classList.toggle("dark", isDark);
        root.dataset.theme = theme;

        localStorage.setItem("miniverse-theme", theme);

        root.style.colorScheme = theme;
    }, [theme, isDark]);

    const toggleTheme = () => {
        setTheme((current) =>
            current === "dark" ? "light" : "dark"
        );
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                isDark,
                setTheme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useTheme must be used inside ThemeProvider"
        );
    }

    return context;
};
