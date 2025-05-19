import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { generateTask6 } from '../data/tasksData';

const Task6 = ({ onAnswer }) => {
  const [task, setTask] = useState(generateTask6());
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
    
    onAnswer(6, {
      question: task.question,
      userAnswer: userAnswer,
      isCorrect,
      correctAnswer: task.answer
    });
  };

  const handleNewTask = () => {
    setTask(generateTask6());
    setUserAnswer('');
    setResult(null);
  };

  return (
    <Paper elevation={3} className="task-paper" style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>Задание 6. Анализ программы</Typography>
      
      <Typography paragraph>
        Ниже приведена программа, записанная на трёх языках программирования:
      </Typography>

      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Алгоритмический язык</TableCell>
              <TableCell>Pascal</TableCell>
              <TableCell>Python</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
                {task.algorithmCode}
              </TableCell>
              <TableCell style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
                {task.pascalCode}
              </TableCell>
              <TableCell style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
                {task.pythonCode}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography paragraph>
        Было проведено {task.executionsCount} запусков программы, при которых вводились следующие пары чисел:
      </Typography>
      
      <Typography paragraph style={{ fontFamily: 'monospace', backgroundColor: '#f5f5f5', padding: '10px' }}>
        {task.executions}
      </Typography>

      <Typography paragraph>
        Сколько было запусков, при которых программа напечатала «{task.neededOutput}»?
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Ваш ответ"
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          fullWidth
          margin="normal"
          inputProps={{ min: 0, max: task.executionsCount }}
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
          <Typography color={result.isCorrect ? 'success.main' : 'error.main'}>
            {result.message}
          </Typography>
          {!result.isCorrect && (
            <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
              {result.explanation}
            </Typography>
          )}
        </div>
      )}
    </Paper>
  );
};

export default Task6;