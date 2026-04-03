import React, { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material'
import { studentAPI } from '../../services/api'

const StudentManagementPage = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    rollNo: '',
    email: '',
    phone: ''
  })

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await studentAPI.getAll()
      setStudents(data.data || [])
    } catch (err) {
      console.error('Error fetching students:', err)
      setError('Failed to load students. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddStudent = async () => {
    if (formData.name && formData.class && formData.rollNo) {
      try {
        setError(null)
        if (editingId) {
          // Update existing student
          await studentAPI.update(editingId, formData)
          alert('Student updated successfully!')
          setEditingId(null)
        } else {
          // Create new student
          await studentAPI.create(formData)
          alert('Student added successfully!')
        }
        setFormData({ name: '', class: '', rollNo: '', email: '', phone: '' })
        setShowForm(false)
        await fetchStudents()
      } catch (err) {
        console.error('Error saving student:', err)
        setError('Failed to save student. Please try again.')
      }
    } else {
      alert('Please fill all required fields')
    }
  }

  const handleEditStudent = (student) => {
    setFormData({
      name: student.name,
      class: student.class,
      rollNo: student.rollNo,
      email: student.email,
      phone: student.phone
    })
    setEditingId(student._id)
    setShowForm(true)
  }

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        setError(null)
        await studentAPI.delete(id)
        alert('Student deleted successfully!')
        await fetchStudents()
      } catch (err) {
        console.error('Error deleting student:', err)
        setError('Failed to delete student. Please try again.')
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.includes(searchQuery) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ name: '', class: '', rollNo: '', email: '', phone: '' })
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
      {/* Header */}
      <Box sx={{ width: '100%', pb: { xs: 1, sm: 1.5, md: 2 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' } }}>
          Student Management
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
          Manage and organize all student information
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Search and Action Bar */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1.5, sm: 2 }} sx={{ width: '100%', alignItems: { xs: 'stretch', sm: 'center' } }}>
            <TextField
              fullWidth
              placeholder="Search students by name, roll no, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              sx={{ height: '56px', flex: { xs: 1, sm: 'auto' } }}
              onClick={() => {
                if (showForm) {
                  handleCancel()
                } else {
                  setShowForm(true)
                }
              }}
            >
              {showForm ? '✕ Cancel' : '+ Add New Student'}
            </Button>
          </Stack>

      {/* Add Student Form */}
      {showForm && (
        <Card sx={{ p: { xs: 2, sm: 2.5, md: 3 }, mb: 3, width: '100%' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            {editingId ? 'Edit Student' : 'Add New Student'}
          </Typography>
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 2 }} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name *"
                name="name"
                placeholder="Enter student's full name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Class *"
                name="class"
                placeholder="e.g., 10-A"
                value={formData.class}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Roll No *"
                name="rollNo"
                placeholder="e.g., 001"
                value={formData.rollNo}
                onChange={handleInputChange}
                disabled={editingId ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="success"
            onClick={handleAddStudent}
          >
            {editingId ? 'Update Student' : 'Save Student'}
          </Button>
        </Card>
      )}

      {/* Students Table */}
      <TableContainer component={Paper} sx={{ mb: 3, width: '100%', flex: 1 }}>
        {filteredStudents.length > 0 ? (
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Roll No</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Class</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map(student => (
                <TableRow key={student._id} hover>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>
                    <Chip
                      label={student.status}
                      color={student.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEditStudent(student)}
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteStudent(student._id)}
                      >
                        🗑️ Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center', color: '#666' }}>
            No students found
          </Box>
        )}
      </TableContainer>

      {/* Summary */}
      <Card sx={{ p: { xs: 2, sm: 2.5, md: 2 }, width: '100%' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: '100%' }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Total Students
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {students.length}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Active Students
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {students.filter(s => s.status === 'Active').length}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Showing
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {filteredStudents.length}
            </Typography>
          </Box>
        </Stack>
      </Card>
        </>
      )}
    </Box>
  )
}

export default StudentManagementPage