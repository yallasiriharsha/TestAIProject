import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  Grid,
  Typography,
  Stack,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { classAPI } from "../../services/api";

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    section: "",
    capacity: "",
  });

  // Fetch classes on component mount
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await classAPI.getAll();
      setClasses(data.data || []);
    } catch (err) {
      console.error("Error fetching classes:", err);
      setError("Failed to load classes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddClass = async () => {
    if (formData.name && formData.grade && formData.section) {
      try {
        setError(null);
        if (editingId) {
          // Update existing class
          await classAPI.update(editingId, formData);
          alert("Class updated successfully!");
          setEditingId(null);
        } else {
          // Create new class
          await classAPI.create(formData);
          alert("Class created successfully!");
        }
        setFormData({
          name: "",
          grade: "",
          section: "",
          capacity: "",
        });
        setShowForm(false);
        await fetchClasses();
      } catch (err) {
        console.error("Error saving class:", err);
        setError("Failed to save class. Please try again.");
      }
    } else {
      alert("Please fill all required fields");
    }
  };

  const handleEditClass = (classItem) => {
    setFormData({
      name: classItem.name,
      grade: classItem.grade,
      section: classItem.section,
      capacity: classItem.capacity ? classItem.capacity.toString() : "",
    });
    setEditingId(classItem.id);
    setShowForm(true);
  };

  const handleDeleteClass = async (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        setError(null);
        await classAPI.delete(id);
        alert("Class deleted successfully!");
        await fetchClasses();
      } catch (err) {
        console.error("Error deleting class:", err);
        setError("Failed to delete class. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: "", grade: "", section: "", capacity: "" });
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        flex: 1,
      }}
    >
      {/* Header */}
      <Box sx={{ width: "100%", pb: { xs: 1, sm: 1.5, md: 2 } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Classes Management
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#666", fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          Manage classes and their information
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
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Action Bar */}
          <Box sx={{ width: "100%" }}>
            <Button
              variant="contained"
              onClick={() => {
                if (showForm) handleCancel();
                else setShowForm(true);
              }}
            >
              {showForm ? "✕ Cancel" : "+ Add New Class"}
            </Button>
          </Box>

      {/* Add Class Form */}
      {showForm && (
        <Card sx={{ p: { xs: 2, sm: 2.5, md: 3 }, mb: 3, width: "100%" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            {editingId ? "Edit Class" : "Add New Class"}
          </Typography>
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 2 }} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Class Name *"
                name="name"
                placeholder="Class Name (e.g., 10-A)"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Grade *"
                name="grade"
                placeholder="Grade (e.g., 10)"
                value={formData.grade}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Section *"
                name="section"
                placeholder="Section (e.g., A)"
                value={formData.section}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Capacity"
                name="capacity"
                placeholder="Capacity (e.g., 30)"
                value={formData.capacity}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="success" onClick={handleAddClass}>
            {editingId ? "Update Class" : "Create Class"}
          </Button>
        </Card>
      )}

      {/* Classes Grid */}
      <Grid
        container
        spacing={{ xs: 1.5, sm: 2, md: 2 }}
        sx={{ mb: 3, width: "100%", flex: 1 }}
      >
        {classes.map((classItem) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={classItem.id}
            sx={{ display: "flex", flexGrow: 1 }}
          >
            <Card
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 3,
                },
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  p: 2,
                  borderBottom: "1px solid #e0e0e0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {classItem.name}
                </Typography>
                <Stack direction="row" spacing={0.5}>
                  <IconButton
                    size="small"
                    onClick={() => handleEditClass(classItem)}
                  >
                    ✏️
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClass(classItem.id)}
                  >
                    🗑️
                  </IconButton>
                </Stack>
              </Box>

              {/* Content */}
              <Box sx={{ p: 2, flex: 1 }}>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="caption" sx={{ color: "#666" }}>
                      Grade
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {classItem.grade}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: "#666" }}>
                      Section
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {classItem.section}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: "#666" }}>
                      Capacity
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {classItem.capacity || "-"}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Footer */}
              <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => alert(`Viewing details for ${classItem.name}`)}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Statistics */}
      <Grid
        container
        spacing={{ xs: 1.5, sm: 2, md: 2 }}
        sx={{ width: "100%" }}
      >
        <Grid item xs={12} sm={6} md={4} flexGrow={1}>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
              Total Classes
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {classes.length}
            </Typography>
          </Card>
        </Grid>
      </Grid>
        </>
      )}
    </Box>
  );
};

export default ClassesPage;
