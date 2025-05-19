import React, { useState } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { generateTask1 } from '../data/tasksData';

const Task1 = ({ onAnswer }) => {
  const [task, setTask] = useState(generateTask1());
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
    
    onAnswer(1, {
      question: task.question,
      userAnswer: userAnswer,
      isCorrect,
      correctAnswer: task.answer
    });
  };

  const handleNewTask = () => {
    setTask(generateTask1());
    setUserAnswer('');
    setResult(null);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
      <Typography variant="h5" gutterBottom>
        Задание 1. Определение удаленного элемента
      </Typography>
      
      <Typography paragraph>
        В одной из кодировок Unicode каждый символ кодируется {task.symbolEncodingSize}.
        Ученик написал текст (в нём нет лишних пробелов):
      </Typography>

      <Typography paragraph style={{ 
        fontFamily: 'monospace', 
        backgroundColor: '#f5f5f5', 
        padding: '10px',
        borderRadius: '4px'
      }}>
        {task.writtenText}
      </Typography>

      <Typography paragraph>
        Ученик удалил из списка {task.subject}, а также лишние запятую и пробел – два пробела не должны идти подряд.
      </Typography>

      <Typography paragraph>
        При этом размер нового предложения в данной кодировке оказался на {task.removedNameBits} бит меньше, 
        чем размер исходного предложения. Напишите в ответе удалённое {task.subject}.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label={`Удаленное ${task.subject}`}
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

export default Task1;