import React from 'react';
import { Card, CardContent, Typography, IconButton, Chip, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Completed';
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const statusColors = {
    'To Do': 'info',
    'In Progress': 'warning',
    'Completed': 'success',
  };

  return (
    <Card sx={{ boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h6" fontWeight="medium">{task.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {task.description || 'No description'}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => onEdit(task)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDelete(task.id)} color="error">
              <Delete />
            </IconButton>
          </Box>
        </Box>
        <Chip
          label={task.status}
          color={statusColors[task.status] as any}
          size="small"
          sx={{ mt: 2 }}
        />
      </CardContent>
    </Card>
  );
};

export default TaskCard;