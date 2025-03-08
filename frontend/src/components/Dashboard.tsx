import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Button, Tabs, Tab, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Completed';
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'To Do' | 'In Progress' | 'Completed'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' as const });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
    fetchUsername();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const fetchUsername = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error('Failed to fetch username', error);
    }
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5001/api/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
      setNewTask({ title: '', description: '', status: 'To Do' });
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5001/api/tasks/${editingTask.id}`,
        editingTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
      setIsEditModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const filteredTasks = activeTab === 'All' ? tasks : tasks.filter((task) => task.status === activeTab);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
      <Navbar username={username} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="bold">Tasks</Typography>
          <Button variant="contained" color="primary" onClick={() => setIsAddModalOpen(true)}>
            Add Task
          </Button>
        </Box>

        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 4 }}>
          {['All', 'To Do', 'In Progress', 'Completed'].map((tab) => (
            <Tab key={tab} label={tab} value={tab} />
          ))}
        </Tabs>

        <Grid container spacing={3}>
          {filteredTasks.length === 0 ? (
            <Typography variant="body1" color="textSecondary" sx={{ width: '100%', textAlign: 'center' }}>
              No tasks found.
            </Typography>
          ) : (
            filteredTasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <TaskCard
                  task={task}
                  onEdit={(task) => {
                    setEditingTask(task);
                    setIsEditModalOpen(true);
                  }}
                  onDelete={deleteTask}
                />
              </Grid>
            ))
          )}
        </Grid>

        <TaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={createTask}
          task={newTask}
          setTask={setNewTask}
          title="Add New Task"
          submitText="Create"
        />

        {editingTask && (
          <TaskModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={updateTask}
            task={editingTask}
            setTask={setEditingTask}
            title="Edit Task"
            submitText="Save"
          />
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;