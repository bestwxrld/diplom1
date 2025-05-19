import React, { useState } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { generateTask5 } from '../data/tasksData';

const Task5 = ({ onAnswer }) => {
  const [task, setTask] = useState(generateTask5());
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
    
    onAnswer(5, {
      question: task.question,
      userAnswer: userAnswer,
      isCorrect,
      correctAnswer: task.answer
    });
  };

  const handleNewTask = () => {
    setTask(generateTask5());
    setUserAnswer('');
    setResult(null);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
      <Typography variant="h5" gutterBottom>
        Задание 5. Определение множителя в алгоритме
      </Typography>
      
      <Typography paragraph>
        У исполнителя Альфа две команды, которым присвоены номера:
      </Typography>

      <Typography component="div" style={{ marginLeft: '20px' }}>
        <pre style={{ margin: '5px 0' }}>1. прибавь 1</pre>
        <pre style={{ margin: '5px 0' }}>2. умножь на b</pre>
      </Typography>

      <Typography paragraph>
        (b — неизвестное натуральное число; b ≥ 2).
      </Typography>

      <Typography paragraph>
        Первая команда увеличивает число на экране на 1, вторая умножает его на b.
      </Typography>

      <Typography paragraph>
        Алгоритм для исполнителя Альфа — это последовательность номеров команд.
      </Typography>

      <Typography paragraph>
        Найдите значение числа b, при котором из <b>числа {task.startNumber}</b> по <b>алгоритму {task.algorithm}</b> будет получено <b>число {task.endNumber}</b>.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Значение b"
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          fullWidth
          margin="normal"
          inputProps={{ min: 2 }}
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

export default Task5;