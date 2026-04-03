import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Typography,
  LinearProgress,
  Chip,
} from "@mui/material";

const ReportsPage = () => {
  const [filters, setFilters] = useState({
    month: "January 2026",
    class: "All Classes",
  });

  const [generatedReports, setGeneratedReports] = useState([]);

  const reportData = [
    {
      id: 1,
      title: "Student Attendance Report",
      description: "Monthly attendance statistics for all students",
      icon: "📊",
      date: "January 2026",
    },
    {
      id: 2,
      title: "Academic Performance",
      description: "Student grades and performance analysis",
      icon: "📈",
      date: "January 2026",
    },
    {
      id: 3,
      title: "Class-wise Summary",
      description: "Performance summary for each class",
      icon: "📋",
      date: "January 2026",
    },
    {
      id: 4,
      title: "Fee Collection Report",
      description: "Fee payment status and collection details",
      icon: "💳",
      date: "January 2026",
    },
    {
      id: 5,
      title: "Staff Performance",
      description: "Teacher evaluation and performance metrics",
      icon: "👥",
      date: "January 2026",
    },
    {
      id: 6,
      title: "Parent Communication",
      description: "Parent engagement and feedback summary",
      icon: "💬",
      date: "January 2026",
    },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleGenerateReport = () => {
    const newReport = {
      id: Date.now(),
      title: `Report - ${filters.month} - ${filters.class}`,
      description: `Generated report for ${filters.month}`,
      icon: "📊",
      date: filters.month,
      class: filters.class,
    };
    setGeneratedReports([newReport, ...generatedReports]);
    alert(`Report generated for ${filters.month} - ${filters.class}`);
  };

  const handleViewReport = (report) => {
    alert(`Viewing: ${report.title}`);
  };

  const handleDownloadReport = (report) => {
    alert(`Downloading: ${report.title}`);
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
          Reports & Analytics
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#666", fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          Generate and view comprehensive reports
        </Typography>
      </Box>

      {/* Filter Section */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1.5, sm: 2 }}
        sx={{ mb: { xs: 2, sm: 2.5, md: 3 }, width: "100%" }}
      >
        <FormControl sx={{ minWidth: 180, flex: { xs: 1, sm: "auto" } }}>
          <InputLabel>Month</InputLabel>
          <Select
            name="month"
            value={filters.month}
            onChange={handleFilterChange}
            label="Month"
          >
            <MenuItem value="January 2026">January 2026</MenuItem>
            <MenuItem value="December 2025">December 2025</MenuItem>
            <MenuItem value="November 2025">November 2025</MenuItem>
            <MenuItem value="October 2025">October 2025</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 180, flex: { xs: 1, sm: "auto" } }}>
          <InputLabel>Class</InputLabel>
          <Select
            name="class"
            value={filters.class}
            onChange={handleFilterChange}
            label="Class"
          >
            <MenuItem value="All Classes">All Classes</MenuItem>
            <MenuItem value="10-A">10-A</MenuItem>
            <MenuItem value="10-B">10-B</MenuItem>
            <MenuItem value="11-A">11-A</MenuItem>
            <MenuItem value="11-B">11-B</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleGenerateReport}
          sx={{ height: "56px", flex: { xs: 1, sm: "auto" } }}
        >
          📥 Generate Report
        </Button>
      </Stack>

      {/* Generated Reports Section */}
      {generatedReports.length > 0 && (
        <Box sx={{ mb: 3, width: "100%" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Generated Reports
          </Typography>
          <Grid
            container
            spacing={{ xs: 1.5, sm: 2, md: 2 }}
            sx={{ width: "100%", flex: 1 }}
          >
            {generatedReports.map((report) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={report.id}
                sx={{ display: "flex", flexGrow: 1 }}
              >
                <Card
                  sx={{
                    width: "100%",
                    p: 2,
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
                  <Box sx={{ fontSize: "2.5rem", mb: 1 }}>{report.icon}</Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    {report.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666", mb: 2 }}>
                    {report.description}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#999", mb: 2 }}>
                    {report.date}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: "auto" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleViewReport(report)}
                    >
                      👁️ View
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleDownloadReport(report)}
                    >
                      ⬇️ Download
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Reports Grid */}
      <Box sx={{ mb: 3, width: "100%", flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Available Reports
        </Typography>
        <Grid
          container
          spacing={{ xs: 1.5, sm: 2, md: 2 }}
          sx={{ width: "100%", flex: 1 }}
        >
          {reportData.map((report) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={report.id}
              sx={{ display: "flex" }}
              flexGrow={1}
            >
              <Card
                sx={{
                  width: "100%",
                  p: 2,
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
                <Box sx={{ fontSize: "2.5rem", mb: 1 }}>{report.icon}</Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  {report.title}
                </Typography>
                <Typography variant="caption" sx={{ color: "#666", mb: 2 }}>
                  {report.description}
                </Typography>
                <Typography variant="caption" sx={{ color: "#999", mb: 2 }}>
                  {report.date}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: "auto" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleViewReport(report)}
                  >
                    👁️ View
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleDownloadReport(report)}
                  >
                    ⬇️ Download
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Analytics Section */}
      <Box sx={{ width: "100%", flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Quick Analytics
        </Typography>
        <Grid
          container
          spacing={{ xs: 1.5, sm: 2, md: 2 }}
          sx={{ width: "100%", flex: 1 }}
        >
          {/* Attendance Chart */}
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            flexGrow={1}
            sx={{ display: "flex" }}
          >
            <Card sx={{ p: 2, width: "100%" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                Attendance Overview
              </Typography>
              <Box sx={{ mb: 1.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="caption">Average Attendance</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    94%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={94}
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </Box>
            </Card>
          </Grid>

          {/* Performance Chart */}
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            flexGrow={1}
            sx={{ display: "flex" }}
          >
            <Card sx={{ p: 2, width: "100%" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                Academic Performance
              </Typography>
              <Stack spacing={0.5}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Chip label="A+" size="small" variant="outlined" />
                  <Typography variant="caption">45 Students</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Chip label="A" size="small" variant="outlined" />
                  <Typography variant="caption">78 Students</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Chip label="B" size="small" variant="outlined" />
                  <Typography variant="caption">92 Students</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Chip label="C" size="small" variant="outlined" />
                  <Typography variant="caption">28 Students</Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>

          {/* Fee Collection */}
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            flexGrow={1}
            sx={{ display: "flex" }}
          >
            <Card sx={{ p: 2, width: "100%" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                Fee Collection Status
              </Typography>
              <Stack spacing={1}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="caption">Collected</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      85%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{ height: 6, borderRadius: 1 }}
                  />
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="caption">Pending</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      15%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={15}
                    sx={{ height: 6, borderRadius: 1, color: "#ff9800" }}
                  />
                </Box>
              </Stack>
            </Card>
          </Grid>

          {/* Student Growth */}
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            flexGrow={1}
            sx={{ display: "flex" }}
          >
            <Card sx={{ p: 2, width: "100%" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                Student Enrollment
              </Typography>
              <Stack spacing={1}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption">October</Typography>
                  <Chip label="220" size="small" />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption">November</Typography>
                  <Chip label="235" size="small" />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption">December</Typography>
                  <Chip label="245" size="small" />
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ReportsPage;
