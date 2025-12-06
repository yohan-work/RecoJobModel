import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3182F6",
      light: "#4BA0FF",
      dark: "#1B64DA",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#26C281",
      light: "#33CF9F",
      dark: "#1A8459",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#F04452",
      light: "#FF5A6A",
      dark: "#D63342",
    },
    warning: {
      main: "#FF9500",
      light: "#FFA733",
      dark: "#CC7700",
    },
    success: {
      main: "#26C281",
      light: "#33CF9F",
      dark: "#1A8459",
    },
    grey: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
    text: {
      primary: "#111827",
      secondary: "#4B5563",
      disabled: "#9CA3AF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.25rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "1.875rem",
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 20px",
          fontSize: "1rem",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        sizeLarge: {
          padding: "14px 28px",
          fontSize: "1.125rem",
        },
        sizeSmall: {
          padding: "6px 16px",
          fontSize: "0.875rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
          },
          transition: "box-shadow 0.2s ease-in-out",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;

