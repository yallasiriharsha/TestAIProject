import React, { useState } from 'react'
import {
  Box,
  Card,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Typography,
  Checkbox,
  Chip,
  FormControlLabel,
  Alert,
} from '@mui/material'

const TodoPage = () => {
  const [todos, setTodos] = useState([])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    category: 'Academic',
    status: 'pending'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAddTodo = () => {
    if (formData.title && formData.dueDate) {
      if (editingId) {
        setTodos(todos.map(t =>
          t.id === editingId ? { ...t, ...formData } : t
        ))
        alert('Todo updated successfully!')
        setEditingId(null)
      } else {
        const newId = Math.max(...todos.map(t => t.id), 0) + 1
        setTodos([...todos, {
          id: newId,
          ...formData
        }])
        alert('Todo added successfully!')
      }
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        category: 'Academic',
        status: 'pending'
      })
      setShowForm(false)
    } else {
      alert('Please fill title and due date')
    }
  }

  const handleEditTodo = (todo) => {
    setFormData({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      dueDate: todo.dueDate,
      category: todo.category,
      status: todo.status
    })
    setEditingId(todo.id)
    setShowForm(true)
  }

  const handleDeleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setTodos(todos.filter(t => t.id !== id))
      alert('Todo deleted successfully!')
    }
  }

  const handleToggleComplete = (id) => {
    setTodos(todos.map(t =>
      t.id === id
        ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
        : t
    ))
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
      category: 'Academic',
      status: 'pending'
    })
  }

  const filteredTodos = todos.filter(todo => {
    const statusMatch = filterStatus === 'all' || todo.status === filterStatus
    const priorityMatch = filterPriority === 'all' || todo.priority === filterPriority
    return statusMatch && priorityMatch
  })

  const completedCount = todos.filter(t => t.status === 'completed').length
  const pendingCount = todos.filter(t => t.status === 'pending').length

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error'
      case 'Medium': return 'warning'
      case 'Low': return 'success'
      default: return 'default'
    }
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
      {/* Header */}
      <Box sx={{ width: '100%', pb: { xs: 1, sm: 1.5, md: 2 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' } }}>
          Task Management
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
          Organize and track all your tasks and deadlines
        </Typography>
      </Box>

      {/* Statistics */}
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 2 }} sx={{ mb: { xs: 2, sm: 2.5, md: 3 }, width: '100%' }}>
        <Grid item xs={12} sm={6} md={3} flexGrow={1} sx={{ display: 'flex' }}>
          <Card sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center', width: '100%' }}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Total Tasks
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.75rem', sm: '2rem' } }}>
              {todos.length}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} flexGrow={1} sx={{ display: 'flex' }}>
          <Card sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center', width: '100%' }}>
            <Typography variant="body2" sx={{ color: '#51cf66', mb: 1, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Completed
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#51cf66', fontSize: { xs: '1.75rem', sm: '2rem' } }}>
              {completedCount}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} flexGrow={1} sx={{ display: 'flex' }}>
          <Card sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center', width: '100%' }}>
            <Typography variant="body2" sx={{ color: '#ff6b6b', mb: 1, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Pending
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#ff6b6b', fontSize: { xs: '1.75rem', sm: '2rem' } }}>
              {pendingCount}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} flexGrow={1} sx={{ display: 'flex' }}>
          <Card sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center', width: '100%' }}>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Completion Rate
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.75rem', sm: '2rem' } }}>
              {todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0}%
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Action Bar */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: { xs: 2, sm: 2.5, md: 3 }, width: '100%', alignItems: { xs: 'stretch', sm: 'center' } }}>
        <FormControl sx={{ minWidth: 150, flex: { xs: 1, sm: 'auto' } }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150, flex: { xs: 1, sm: 'auto' } }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="all">All Priorities</MenuItem>
            <MenuItem value="High">High Priority</MenuItem>
            <MenuItem value="Medium">Medium Priority</MenuItem>
            <MenuItem value="Low">Low Priority</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ ml: { xs: 0, sm: 'auto' }, height: '56px' }}
          onClick={() => {
            if (showForm) handleCancel()
            else setShowForm(true)
          }}
        >
          {showForm ? '✕ Cancel' : '+ Add New Task'}
        </Button>
      </Stack>

      {/* Add/Edit Form */}
      {showForm && (
        <Card sx={{ p: { xs: 2, sm: 2.5, md: 3 }, mb: 3, width: '100%' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            {editingId ? 'Edit Task' : 'Create New Task'}
          </Typography>
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 2 }} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Title *"
                name="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                placeholder="Enter task description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Due Date *"
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  label="Priority"
                >
                  <MenuItem value="Low">Low Priority</MenuItem>
                  <MenuItem value="Medium">Medium Priority</MenuItem>
                  <MenuItem value="High">High Priority</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  label="Category"
                >
                  <MenuItem value="Academic">Academic</MenuItem>
                  <MenuItem value="Administrative">Administrative</MenuItem>
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  label="Status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="contained" color="success" onClick={handleAddTodo}>
            {editingId ? 'Update Task' : 'Create Task'}
          </Button>
        </Card>
      )}

      {/* Todo List */}
      <Stack spacing={2} sx={{ width: '100%', flex: 1 }}>
        {filteredTodos.length > 0 ? (
          filteredTodos.map(todo => (
            <Card
              key={todo.id}
              sx={{
                p: 2,
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                opacity: todo.status === 'completed' ? 0.7 : 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 2,
                },
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={todo.status === 'completed'}
                    onChange={() => handleToggleComplete(todo.id)}
                  />
                }
                label=""
                sx={{ mt: 0.5 }}
              />

              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      textDecoration: todo.status === 'completed' ? 'line-through' : 'none',
                      color: todo.status === 'completed' ? '#999' : 'inherit',
                    }}
                  >
                    {todo.title}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={todo.priority}
                      color={getPriorityColor(todo.priority)}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={todo.category}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                </Box>

                <Typography variant="body2" sx={{ color: '#666', mb: 1.5 }}>
                  {todo.description}
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    📅 Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </Typography>
                  <Chip
                    label={todo.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                    color={todo.status === 'completed' ? 'success' : 'default'}
                    size="small"
                  />
                </Stack>
              </Box>

              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleEditTodo(todo)}
                >
                  ✏️
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  🗑️
                </Button>
              </Stack>
            </Card>
          ))
        ) : (
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: '#666' }}>
              No tasks found
            </Typography>
          </Card>
        )}
      </Stack>
    </Box>
  )
}

export default TodoPage