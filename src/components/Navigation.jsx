import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const Navigation = () => {
  return (
    <Paper elevation={3} className="navigation" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Меню заданий
      </Typography>
      <List>
        {[...Array(10).keys()].map(i => (
          <ListItem button key={`task${i+1}`} component="a" href={`#task${i+1}`}>
            <ListItemText primary={`Задание ${i+1}`} />
          </ListItem>
        ))}
        <ListItem button key="task11_12" component="a" href="#task11_12">
          <ListItemText primary="Задания 11-12 (Файловый браузер)" />
        </ListItem>
        <ListItem button key="task13" component="a" href="#task13">
          <ListItemText primary="Задание 13 (Таблица)" />
        </ListItem>
        <ListItem button key="task14_1" component="a" href="#task14_1">
          <ListItemText primary="Задание 14.1 (Робот)" />
        </ListItem>
        <ListItem button key="task14_2" component="a" href="#task14_2">
          <ListItemText primary="Задание 14.2 (Программирование)" />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Navigation;
