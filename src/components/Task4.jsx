import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { generateTask4 } from '../data/tasksData';

const Task4 = ({ onAnswer }) => {
  const [task, setTask] = useState(generateTask4());
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = parseInt(userAnswer) === task.answer;
    
    setResult({
      isCorrect,
      message: isCorrect ? 'Правильно!' : `Неправильно! Правильный ответ: ${task.answer}`,
      explanation: task.explanation
    });
    
    onAnswer(4, {
      question: task.question,
      userAnswer: userAnswer,
      isCorrect,
      correctAnswer: task.answer
    });
  };

  const handleNewTask = () => {
    setTask(generateTask4());
    setUserAnswer('');
    setResult(null);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
      <Typography variant="h5" gutterBottom>
        Задание 4. Кратчайший путь через промежуточный пункт
      </Typography>
      
      <Typography paragraph>
        Между населёнными пунктами {task.points.join(', ')} построены дороги, протяжённость которых (в километрах) приведена в таблице:
      </Typography>

      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Дорога</TableCell>
              <TableCell>Протяжённость (км)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {task.roads.map((road, index) => (
              <TableRow key={index}>
                <TableCell>{road.path}</TableCell>
                <TableCell>{road.distance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography paragraph>
        Определите длину кратчайшего пути между пунктами {task.start} и {task.end}, проходящего через пункт {task.through}.
        Передвигаться можно только по указанным дорогам. Каждый пункт можно посетить только один раз.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Длина кратчайшего пути (км)"
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          fullWidth
          margin="normal"
          inputProps={{ min: 1 }}
        />
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <Button type="submit" variant="contained" color="primary">
            Проверить
          </Button>
          <Button onClick={handleNewTask} variant="outlined">
            Новое задание
          </Button>
        </div>
      </form>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <Typography color={result.isCorrect ? 'green' : 'red'}>
            {result.message}
          </Typography>
          {!result.isCorrect && (
            <Typography variant="body2" style={{ whiteSpace: 'pre-line', marginTop: '10px' }}>
              {result.explanation}
            </Typography>
          )}
        </div>
      )}
    </Paper>
  );
};

export default Task4;