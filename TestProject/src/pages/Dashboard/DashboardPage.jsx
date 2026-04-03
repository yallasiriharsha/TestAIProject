import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  Grid,
  Button,
  Stack,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material'
import { studentAPI, classAPI } from '../../services/api'

const DashboardPage = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState([
    { id: 1, label: 'Total Students', value: '0', icon: '👥', color: '#667eea' },
    { id: 2, label: 'Total Classes', value: '0', icon: '🏫', color: '#764ba2' },
    { id: 3, label: 'Active Students', value: '0', icon: '✅', color: '#4facfe' },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [studentsRes, classesRes] = await Promise.all([
        studentAPI.getAll(),
        classAPI.getAll(),
      ])

      const students = studentsRes.data || []
      const classes = classesRes.data || []
      const activeStudents = students.filter((s) => s.status === 'Active').length

      setStats([
        { id: 1, label: 'Total Students', value: students.length.toString(), icon: '👥', color: '#667eea' },
        { id: 2, label: 'Total Classes', value: classes.length.toString(), icon: '🏫', color: '#764ba2' },
        { id: 3, label: 'Active Students', value: activeStudents.toString(), icon: '✅', color: '#4facfe' },
      ])
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
      {/* Header */}
      <Box sx={{ width: '100%', pb: { xs: 1, sm: 1.5, md: 2 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' } }}>
          Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
          Welcome to Student Management System
        </Typography>
      </Box>

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Statistics Grid */}
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 2 }} sx={{ width: '100%' }}>
            {stats.map((stat) => (
              <Grid item xs={12} sm={6} md={4} key={stat.id} flexGrow={1} sx={{ display: 'flex' }}>
                <Card
                  sx={{
                    width: '100%',
                    p: { xs: 1.5, sm: 2, md: 2 },
                    borderLeft: `4px solid ${stat.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1, sm: 1.5, md: 2 },
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3,
                    },
                  }}
                >
                  <Box sx={{ fontSize: { xs: '2rem', sm: '2.25rem', md: '2.5rem' } }}>{stat.icon}</Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                      {stat.label}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Quick Actions */}
          <Card sx={{ p: { xs: 2, sm: 2.5, md: 3 }, width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
              Quick Actions
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1.5, sm: 2 }} sx={{ width: '100%' }}>
              <Button
                variant="contained"
                onClick={() => navigate('/students')}
              >
                + Add New Student
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/classes')}
              >
                + Create New Class
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/reports')}
              >
                📋 Generate Report
              </Button>
              <Button
                variant="contained"
                onClick={() => alert('Settings coming soon!')}
              >
                ⚙️ Settings
              </Button>
            </Stack>
          </Card>
        </>
      )}
    </Box>
  )
}

export default DashboardPage
