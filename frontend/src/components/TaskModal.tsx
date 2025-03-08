import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  task: { title: string; description: string; status: 'To Do' | 'In Progress' | 'Completed' };
  setTask: (task: { title: string; description: string; status: 'To Do' | 'In Progress' | 'Completed' }) => void;
  title: string;
  submitText: string;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
  setTask,
  title,
  submitText,
}) => {
  const taskStatuses = ['To Do', 'In Progress', 'Completed'] as const;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
          <TextField
            select
            label="Status"
            fullWidth
            margin="normal"
            value={task.status}
            onChange={(e) =>
              setTask({ ...task, status: e.target.value as 'To Do' | 'In Progress' | 'Completed' })
            }
          >
            {taskStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={onSubmit} variant="contained" color="primary">{submitText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;