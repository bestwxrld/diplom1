import React from 'react';
import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';

const Results = ({ answers }) => {
  const calculateScore = () => {
    let correct = 0;
    for (const key in answers) {
      if (answers[key].isCorrect) correct++;
    }
    return { correct, total: Object.keys(answers).length };
  };

  const { correct, total } = calculateScore();

  return (
    <Paper elevation={3} className="task-paper">
      <Typography variant="h4" gutterBottom>Результаты</Typography>
      <Typography variant="h5" gutterBottom>
        Правильных ответов: {correct} из {total}
      </Typography>
      
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№ задания</TableCell>
              {/* Убрали колонку Вопрос */}
              <TableCell>Ваш ответ</TableCell>
              <TableCell>Результат</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(answers).map(([taskNumber, answerData]) => (
              <TableRow key={taskNumber}>
                <TableCell>{taskNumber}</TableCell>
                {/* Убрали вывод вопроса */}
                <TableCell>{answerData.userAnswer}</TableCell>
                <TableCell style={{ color: answerData.isCorrect ? 'green' : 'red' }}>
                  {answerData.isCorrect ? 'Правильно' : 'Неправильно'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Button 
        component={Link} 
        to="/task1" 
        variant="contained" 
        color="primary" 
        style={{ marginTop: '20px' }}
      >
        Вернуться к заданиям
      </Button>
    </Paper>
  );
};

export default Results;
