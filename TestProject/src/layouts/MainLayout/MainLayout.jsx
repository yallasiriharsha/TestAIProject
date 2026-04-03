import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Stack,
  Container,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const isActive = (path) => location.pathname === path || (path === '/' && location.pathname === '')

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Students', path: '/students' },
    { label: 'Classes', path: '/classes' },
    { label: 'Reports', path: '/reports' },
    { label: 'Tasks', path: '/tasks' },
  ]

  return (
    <Stack
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#667eea' }}>
        <Container maxWidth="xl" disableGutters sx={{ width: '100%' }}>
          <Toolbar
            sx={{
              width: '100%',
              paddingX: { xs: 1, sm: 2, md: 3 },
              paddingY: 1.5,
            }}
          >
            <Box
              sx={{
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                fontWeight: 700,
                color: 'white',
                whiteSpace: 'nowrap',
                flex: isMobile ? 1 : 'auto',
              }}
            >
              📚 {isMobile ? 'SMS' : 'Student Management System'}
            </Box>
            <Stack
              direction="row"
              spacing={{ xs: 0.25, sm: 0.5, md: 1 }}
              sx={{
                marginLeft: 'auto',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  size={isMobile ? 'small' : 'medium'}
                  sx={{
                    color: 'white',
                    fontWeight: isActive(item.path) ? 700 : 500,
                    fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                    padding: { xs: '0.5rem 0.5rem', sm: '0.75rem 1rem', md: '0.75rem 1.5rem' },
                    borderBottom: isActive(item.path) ? '3px solid white' : 'none',
                    borderRadius: 0,
                    transition: 'all 0.3s ease',
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderBottom: '3px solid white',
                    },
                    '&:focus': {
                      outline: 'none',
                      backgroundColor: 'transparent',
                    },
                    '&:focus-visible': {
                      outline: 'none',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          overflow: 'auto',
          paddingX: { xs: 1, sm: 2, md: 3, lg: 4 },
          paddingY: { xs: 1.5, sm: 2, md: 3, lg: 4 },
          backgroundColor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          width: '100%',
          backgroundColor: 'white',
          padding: { xs: '1rem', sm: '1.5rem', md: '2rem' },
          textAlign: 'center',
          borderTop: '1px solid #e0e0e0',
          color: '#666',
          fontSize: { xs: '0.875rem', sm: '1rem' },
        }}
      >
        © 2026 Student Management System. All rights reserved.
      </Box>
    </Stack>
  )
}

export default MainLayout
