import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Divider,
  Grid
} from '@mui/material';
import { generateTask14_2 } from '../data/tasksData';

const Task14_2 = ({ onAnswer }) => {
  const [task, setTask] = useState(generateTask14_2());
  const [userCode, setUserCode] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pyodide, setPyodide] = useState(null);
  const [inputValue, setInputValue] = useState(task.exactInput);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const loadPyodide = async () => {
      setIsLoading(true);
      try {
        if (!window.pyodide) {
          window.pyodide = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/'
          });
        }
        setPyodide(window.pyodide);
      } catch (error) {
        console.error('Ошибка загрузки Pyodide:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPyodide();
  }, []);

  useEffect(() => {
    setInputValue(task.exactInput);
    setExpectedOutput(task.exactOutput);
    setUserCode('');
    setUserAnswer('');
    setResult(null);
  }, [task]);

  const handleRunCode = async () => {
    if (!pyodide) return;

    try {
      setIsLoading(true);
      const fullCode = `
${userCode}
result = solution(${inputValue})
`;
      await pyodide.runPythonAsync(fullCode);
      const output = pyodide.globals.get('result');
      setUserAnswer(output.toString());
    } catch (error) {
      console.error('Ошибка выполнения:', error);
      setUserAnswer(`Ошибка выполнения: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckAnswer = () => {
    const isCorrect = userAnswer.trim() === expectedOutput;
    setResult(isCorrect ? 'Правильно!' : `Неправильно. Ожидалось: ${expectedOutput}`);

    onAnswer('14.2', {
      question: task.question,
      input: inputValue,
      expected: expectedOutput,
      userCode,
      userAnswer,
      isCorrect
    });
  };

  const handleNewTask = () => {
    setTask(generateTask14_2());
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Задание 14.2. Предсказание вывода Python-программы
      </Typography>

      <Typography paragraph sx={{ mb: 3, whiteSpace: 'pre-line' }}>
        {task.question}
      </Typography>

      <Box sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        p: 2,
        mb: 3,
        backgroundColor: 'background.paper'
      }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Python Компилятор
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              label="Введите ваше решение (функция solution(n))"
              multiline
              minRows={8}
              maxRows={12}
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="def solution(n):\n    # Ваш код здесь\n    return result"
              InputProps={{
                style: {
                  fontFamily: 'monospace',
                  fontSize: '0.875rem'
                }
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <TextField
                label="Тестовое значение (n)"
                type="number"
                value={inputValue}
                disabled
                sx={{ mb: 2 }}
              />

              <TextField
                label="Ваш ответ"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                onClick={handleRunCode}
                disabled={isLoading}
                sx={{ mb: 1 }}
              >
                Выполнить код
              </Button>

              <Button
                variant="outlined"
                onClick={handleCheckAnswer}
                disabled={isLoading || !userAnswer}
              >
                Проверить ответ
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button onClick={handleNewTask} variant="outlined">
          Новое задание
        </Button>

        {result && (
          <Typography
            variant="body1"
            sx={{
              fontWeight: 'bold',
              color: result.startsWith('Правильно') ? 'success.main' : 'error.main'
            }}
          >
            {result}
          </Typography>
        )}
      </Box>

      {isLoading && !pyodide && (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mt: 2,
          p: 2,
          bgcolor: 'action.hover',
          borderRadius: 1
        }}>
          <CircularProgress size={20} />
          <Typography variant="body2">
            Инициализация Python среды...
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default Task14_2;
