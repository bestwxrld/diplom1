import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { generateTask2 } from '../data/tasksData';

const Task2 = ({ onAnswer }) => {
  const [task, setTask] = useState(generateTask2());
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalizedUserAnswer = userAnswer.toUpperCase().replace(/\s/g, '');
    const normalizedCorrectAnswer = task.answer.toUpperCase().replace(/\s/g, '');
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
    
    setResult({
      isCorrect,
      message: isCorrect ? 'Правильно!' : `Неправильно! Правильный ответ: ${task.answer}`,
      explanation: task.explanation
    });
    
    onAnswer(2, {
      question: task.question,
      userAnswer: userAnswer,
      isCorrect,
      correctAnswer: task.answer
    });
  };

  const handleNewTask = () => {
    setTask(generateTask2());
    setUserAnswer('');
    setResult(null);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
      <Typography variant="h5" gutterBottom>
        Задание 2. Расшифровка сообщения
      </Typography>
      
      <Typography paragraph>
        От разведчика было получено следующее сообщение:
      </Typography>

      <Typography paragraph style={{ 
        fontFamily: 'monospace', 
        backgroundColor: '#f5f5f5', 
        padding: '10px',
        borderRadius: '4px',
        fontSize: '1.2rem'
      }}>
        {task.encodedMessage}
      </Typography>

      <Typography paragraph>
        В этом сообщении зашифрован пароль – последовательность русских букв.
        В пароле использовались только буквы: А, Б, К, Л, О, С.
        Каждая буква кодировалась двоичным словом по следующей таблице:
      </Typography>

      <TableContainer component={Paper} style={{ marginBottom: '20px', maxWidth: '600px' }}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(task.letters).map(letter => (
                <TableCell key={letter} align="center">{letter}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {Object.values(task.letters).map((code, index) => (
                <TableCell key={index} align="center">{code}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography paragraph>
        Расшифруйте сообщение. Запишите в ответе пароль.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Пароль"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          fullWidth
          margin="normal"
          inputProps={{ 
            style: { textTransform: 'uppercase' },
            maxLength: 20
          }}
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

export default Task2;