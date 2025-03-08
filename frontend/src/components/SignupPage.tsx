import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, Alert, Paper } from '@mui/material';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Create Account
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Create Account
          </Button>
        </form>
        <Typography textAlign="center" mt={2}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignupPage;