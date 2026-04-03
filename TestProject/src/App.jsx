import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme/theme'
// Layouts
import MainLayout from './layouts/MainLayout/MainLayout'
// Pages
import DashboardPage from './pages/Dashboard/DashboardPage'
import StudentManagementPage from './pages/StudentManagement/StudentManagementPage'
import ClassesPage from './pages/Classes/ClassesPage'
import ReportsPage from './pages/Reports/ReportsPage'
import TodoPage from './pages/Todo/TodoPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="students" element={<StudentManagementPage />} />
            <Route path="classes" element={<ClassesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="tasks" element={<TodoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
