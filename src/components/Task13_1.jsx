import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material';
import { generateTask13 } from '../data/tasksData';

const Task13 = ({ onAnswer }) => {
  const [task, setTask] = useState(generateTask13());
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = userAnswer === task.answer;
    
    setResult({
      isCorrect,
      message: isCorrect ? 'Правильно!' : `Неправильно! Правильный ответ: ${task.answer}`,
      explanation: task.explanation
    });
    
    onAnswer(13, {
      question: task.question,
      userAnswer: userAnswer,
      isCorrect,
      correctAnswer: task.answer
    });
  };

  const handleNewTask = () => {
    setTask(generateTask13());
    setUserAnswer('');
    setResult(null);
  };

  return (
    <Paper elevation={3} className="task-paper" style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>Задание 13. Работа с таблицей</Typography>
      
      <Typography paragraph>
        Дана таблица с данными:
      </Typography>

      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              {task.headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {task.rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography paragraph>
        {task.question}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Ваш ответ"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          fullWidth
          margin="normal"
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

export default Task13;