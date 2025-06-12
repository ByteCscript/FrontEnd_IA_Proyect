// src/components/WorkoutsList.jsx
import React from 'react';
import {
  List, ListItem, ListItemAvatar, Avatar,
  ListItemText, ListItemSecondaryAction, Typography
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const workouts = [
  { name: 'Operario', target: 'Shoulders', reps: '20 reps', count: '39k' },
  { name: 'Contadora', target: 'Lower Back', reps: '15 reps', count: '31k' },
  { name: 'Ventas', target: 'Back', reps: '12 reps', count: '27k' },
  { name: 'Administrador', target: 'Back', reps: '12 reps', count: '27k' },
];

export default function WorkoutsList() {
  return (
    <List>
      {workouts.map((w, i) => (
        <ListItem key={i}>
          <ListItemAvatar>
            <Avatar>
              <FitnessCenterIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={w.name} secondary={`${w.target} • ${w.reps}`} />
          <ListItemSecondaryAction>
            <Typography variant="body2">{w.count}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
