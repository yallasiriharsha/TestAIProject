import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#8b9ef5',
      dark: '#4c51c4',
    },
    secondary: {
      main: '#764ba2',
      light: '#9966cc',
      dark: '#5a3a7f',
    },
    success: {
      main: '#51cf66',
      light: '#7ce38b',
      dark: '#37b24d',
    },
    error: {
      main: '#ff6b6b',
      light: '#ff8787',
      dark: '#c92a2a',
    },
    warning: {
      main: '#ffa94d',
      light: '#ffc078',
      dark: '#fd7e14',
    },
    info: {
      main: '#4facfe',
      light: '#6fb5ff',
      dark: '#0a8fdc',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#333',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#333',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#333',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#333',
    },
    body1: {
      fontSize: '1rem',
      color: '#333',
    },
    body2: {
      fontSize: '0.95rem',
      color: '#666',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          borderRadius: 8,
          padding: '0.75rem 1.5rem',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          },
        },
        containedSuccess: {
          background: 'linear-gradient(135deg, #51cf66 0%, #37b24d 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #51cf66 0%, #37b24d 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})

export default theme
