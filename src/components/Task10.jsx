import React, { useState } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { generateTask10 } from '../data/tasksData';

const Task10 = ({ onAnswer }) => {
  const [task, setTask] = useState(generateTask10());
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
    
    onAnswer(10, {
      question: task.question,
      userAnswer: userAnswer,
      isCorrect,
      correctAnswer: task.answer
    });
  };

  const handleNewTask = () => {
    setTask(generateTask10());
    setUserAnswer('');
    setResult(null);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
      <Typography variant="h5" gutterBottom>
        Задание 10. Сравнение чисел в разных системах счисления
      </Typography>
      
      <Typography paragraph>
        Среди приведённых ниже трёх чисел, записанных в различных системах счисления,
        найдите максимальное и запишите его в ответе в десятичной системе счисления.
      </Typography>

      <Typography paragraph>
        В ответе запишите только число, основание системы счисления указывать не нужно.
      </Typography>

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        {task.numbers.map((num, index) => (
          <Typography key={index} style={{ fontFamily: 'monospace' }}>
            {num.str}<sub>{num.base}</sub>
            {index < task.numbers.length - 1 ? ', ' : ''}
          </Typography>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Максимальное число (в десятичной системе)"
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          fullWidth
          margin="normal"
          inputProps={{ min: 0 }}
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

export default Task10;