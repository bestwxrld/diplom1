import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { PlayArrow, Replay } from '@mui/icons-material';
import { generateTask14_1 } from '../data/tasksData';

const Task14_1 = ({ onAnswer }) => {
  const [task, setTask] = useState(generateTask14_1());
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 });
  const [robotDir, setRobotDir] = useState('→');
  const [isRunning, setIsRunning] = useState(false);
  const [grid, setGrid] = useState(Array(3).fill().map(() => Array(3).fill('')));
  const [currentStep, setCurrentStep] = useState(0);

  const initializeGrid = () => {
    const newGrid = Array(3).fill().map(() => Array(3).fill(''));
    
    if (task.question.includes('(2,1)')) {
      newGrid[0][1] = '★';
    }
    if (task.question.includes('(1,3)')) {
      newGrid[2][0] = '★';
    }
    if (task.question.includes('(3,3)')) {
      newGrid[2][2] = '★';
    }
    
    return newGrid;
  };

  useEffect(() => {
    setGrid(initializeGrid());
    resetRobot();
  }, [task]);

  const resetRobot = () => {
    setRobotPos({ x: 0, y: 0 });
    setRobotDir('→');
    setCurrentStep(0);
    setGrid(initializeGrid());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const userCommands = userAnswer
        .split('\n')
        .map(cmd => cmd.trim().toLowerCase())
        .filter(cmd => cmd !== '');
      
      const isCorrect = task.possibleAnswers.some(correctAnswer => 
        JSON.stringify(userCommands) === JSON.stringify(correctAnswer)
      );
      
      setResult(isCorrect ? 'Правильно!' : 'Неправильно, попробуйте еще');
      onAnswer('14.1', { 
        question: task.question, 
        userAnswer,
        isCorrect,
        correctAnswers: task.possibleAnswers.map(arr => arr.join('\n'))
      });
    } catch (error) {
      console.error('Ошибка при проверке ответа:', error);
      setResult('Произошла ошибка при проверке');
    }
  };

  const handleNewTask = () => {
    setTask(generateTask14_1());
    setUserAnswer('');
    setResult(null);
  };

  const executeCommands = () => {
    if (isRunning) return;
    
    const commands = userAnswer
      .split('\n')
      .map(cmd => cmd.trim().toLowerCase())
      .filter(cmd => cmd !== '');
      
    if (commands.length === 0) return;

    setIsRunning(true);
    setCurrentStep(0);
    setRobotPos({ x: 0, y: 0 });
    setRobotDir('→');
    setGrid(initializeGrid());

    const executeStep = (index) => {
      if (index >= commands.length) {
        setIsRunning(false);
        return;
      }

      setCurrentStep(index + 1);
      const command = commands[index];

      switch(command) {
        case 'вправо':
          setRobotDir('→');
          setRobotPos(p => ({ ...p, x: Math.min(2, p.x + 1) }));
          break;
        case 'влево':
          setRobotDir('←');
          setRobotPos(p => ({ ...p, x: Math.max(0, p.x - 1) }));
          break;
        case 'вверх':
          setRobotDir('↑');
          setRobotPos(p => ({ ...p, y: Math.max(0, p.y - 1) }));
          break;
        case 'вниз':
          setRobotDir('↓');
          setRobotPos(p => ({ ...p, y: Math.min(2, p.y + 1) }));
          break;
        case 'поднять':
          setGrid(g => {
            const newGrid = [...g];
            if (newGrid[robotPos.y][robotPos.x] === '★') {
              newGrid[robotPos.y][robotPos.x] = '';
            }
            return newGrid;
          });
          break;
        case 'положить':
          setGrid(g => {
            const newGrid = [...g];
            if (newGrid[robotPos.y][robotPos.x] === '') {
              newGrid[robotPos.y][robotPos.x] = '★';
            }
            return newGrid;
          });
          break;
        default:
          break;
      }

      setTimeout(() => executeStep(index + 1), 800);
    };

    executeStep(0);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>Задание 14.1. Написание программы для "Робота"</Typography>
      
      <Typography paragraph style={{ marginBottom: '20px' }}>
        {task.question}
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ border: '2px solid #333', borderRadius: '5px', padding: '10px', backgroundColor: '#f5f5f5' }}>
          {grid.map((row, y) => (
            <div key={y} style={{ display: 'flex' }}>
              {row.map((cell, x) => (
                <div
                  key={x}
                  style={{
                    width: '60px',
                    height: '60px',
                    border: '1px solid #ddd',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    position: 'relative'
                  }}
                >
                  {robotPos.x === x && robotPos.y === y && (
                    <span style={{ 
                      fontSize: '24px',
                      transform: `rotate(${
                        robotDir === '→' ? '0deg' :
                        robotDir === '←' ? '180deg' :
                        robotDir === '↑' ? '-90deg' : '90deg'
                      })`,
                      transition: 'transform 0.3s'
                    }}>
                      🤖
                    </span>
                  )}
                  {cell && !(robotPos.x === x && robotPos.y === y) && (
                    <span style={{ position: 'absolute', fontSize: '20px' }}>
                      {cell}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlayArrow />}
          onClick={executeCommands}
          disabled={isRunning || !userAnswer.trim()}
        >
          Запустить
        </Button>
        <Button
          variant="outlined"
          startIcon={<Replay />}
          onClick={resetRobot}
        >
          Сбросить
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Введите программу для робота (каждая команда с новой строки)"
          multiline
          rows={4}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          fullWidth
          margin="normal"
          helperText="Доступные команды: вправо, влево, вверх, вниз, поднять, положить"
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
        <div>
          <Typography paragraph style={{ 
            marginTop: '20px',
            color: result === 'Правильно!' ? 'green' : 'red',
            fontWeight: 'bold'
          }}>
            {result}
          </Typography>
          
          {result === 'Неправильно, попробуйте еще' && (
            <div>
              <Typography variant="body2" style={{ marginTop: '10px' }}>
                Возможные варианты решения:
              </Typography>
              {task.possibleAnswers.map((answer, i) => (
                <Typography key={i} variant="body2" style={{ marginTop: '5px' }}>
                  Вариант {i+1}:<br/>{answer.join('\n')}
                </Typography>
              ))}
            </div>
          )}
        </div>
      )}

      <Typography variant="body2" color="text.secondary" style={{ marginTop: '20px' }}>
        Текущий шаг: {currentStep}
      </Typography>
    </Paper>
  );
};

export default Task14_1;