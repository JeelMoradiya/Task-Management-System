import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(to bottom right, #eef2ff, #f3f4f6)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold" color="textPrimary" gutterBottom>
          Task Management
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
          Organize your tasks efficiently with our modern management system.
        </Typography>
        <Box display="flex" justifyContent="center" gap={2}>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="primary"
            size="large"
          >
            Get Started
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            color="primary"
            size="large"
          >
            Sign In
          </Button>
        </Box>
      </Container>
      <Box component="footer" sx={{ position: 'absolute', bottom: 16, color: 'textSecondary' }}>
        © 2025 Task Management. All rights reserved.
      </Box>
    </Box>
  );
}

export default LandingPage;