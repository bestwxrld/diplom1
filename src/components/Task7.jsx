import React, { useState } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { generateTask7 } from '../data/tasksData';

const Task7 = ({ onAnswer }) => {
  const [task, setTask] = useState(generateTask7());
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = userAnswer.toLowerCase() === task.answer.toLowerCase();
    
    setResult({
      isCorrect,
      message: isCorrect ? 'Правильно!' : `Неправильно! Правильный ответ: ${task.answer}`,
      explanation: task.explanation
    });
    
    onAnswer(7, {
      question: task.question,
      userAnswer: userAnswer,
      isCorrect,
      correctAnswer: task.answer
    });
  };

  const handleNewTask = () => {
    setTask(generateTask7());
    setUserAnswer('');
    setResult(null);
  };

  return (
    <Paper elevation={3} className="task-paper" style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Задание 7. Составление URL адреса до файла по частям
      </Typography>
      
      <Typography paragraph style={{ whiteSpace: 'pre-line' }}>
        {task.question}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Ваш ответ (полный URL)"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          fullWidth
          margin="normal"
          style={{ marginBottom: '20px' }}
        />
        
        <div style={{ display: 'flex', gap: '10px' }}>
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
          <Typography 
            color={result.isCorrect ? 'success.main' : 'error.main'}
            style={{ fontWeight: 'bold', marginBottom: '10px' }}
          >
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

export default Task7;