import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { generateTask8 } from '../data/tasksData';

const Task8 = ({ onAnswer }) => {
  const [task, setTask] = useState(() => {
    const generatedTask = generateTask8();
    return {
      ...generatedTask,
      requests: generatedTask.requests || [],
      responses: generatedTask.responses || []
    };
  });
  
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = userAnswer.trim() === task.answer;
    
    setResult({
      isCorrect,
      message: isCorrect ? 'Правильно!' : `Неправильно! Правильный ответ: ${task.answer}`,
      explanation: task.explanation
    });
    
    onAnswer(8, {
      question: task.question,
      userAnswer,
      isCorrect,
      correctAnswer: task.answer
    });
  };

  const handleNewTask = () => {
    const newTask = generateTask8();
    setTask({
      ...newTask,
      requests: newTask.requests || [],
      responses: newTask.responses || []
    });
    setUserAnswer('');
    setResult(null);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
      <Typography variant="h5" gutterBottom>
        Задание 8. Поисковые запросы
      </Typography>
      
      <Typography paragraph>
        В языке запросов поискового сервера для обозначения логической операции «ИЛИ»
        используется символ «|», а для обозначения логической операции «И» – символ «&».
      </Typography>

      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Запрос</TableCell>
              <TableCell>Найдено страниц (в тысячах)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {task.requests.map((request, index) => (
              <TableRow key={index}>
                <TableCell style={{ fontFamily: 'monospace' }}>{request}</TableCell>
                <TableCell style={{ fontFamily: 'monospace' }}>{task.responses[index]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography paragraph>
        Какое количество страниц (в тысячах) будет найдено по запросу "{task.targetTerm}"?
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Ваш ответ (в тысячах)"
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

export default Task8;