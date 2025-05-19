import React, { useState, useRef, useEffect } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { generateTask9 } from '../data/tasksData';

const Task9 = ({ onAnswer }) => {
  const [task, setTask] = useState(generateTask9());
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && task.canvasData) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      drawGraph(ctx, task.canvasData);
    }
  }, [task]);

  const drawGraph = (ctx, { nodes, edges }) => {
    // Очищаем canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Рисуем узлы
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI);
      ctx.fillStyle = '#1976d2';
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(node.name, node.x, node.y);
    });

    // Рисуем ребра
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.name === edge.from);
      const toNode = nodes.find(n => n.name === edge.to);
      
      // Линия
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.strokeStyle = '#1976d2';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Стрелка
      const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
      ctx.beginPath();
      ctx.moveTo(toNode.x - 15 * Math.cos(angle), toNode.y - 15 * Math.sin(angle));
      ctx.lineTo(
        toNode.x - 15 * Math.cos(angle) - 10 * Math.cos(angle - Math.PI / 6),
        toNode.y - 15 * Math.sin(angle) - 10 * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        toNode.x - 15 * Math.cos(angle) - 10 * Math.cos(angle + Math.PI / 6),
        toNode.y - 15 * Math.sin(angle) - 10 * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fillStyle = '#1976d2';
      ctx.fill();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = parseInt(userAnswer) === task.answer;
    
    setResult({
      isCorrect,
      message: isCorrect ? 'Правильно!' : `Неправильно! Правильный ответ: ${task.answer}`,
      explanation: task.explanation
    });
    
    onAnswer(9, {
      question: task.question,
      userAnswer: userAnswer,
      isCorrect,
      correctAnswer: task.answer
    });
  };

  const handleNewTask = () => {
    setTask(generateTask9());
    setUserAnswer('');
    setResult(null);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
      <Typography variant="h5" gutterBottom>
        Задание 9. Количество путей в графе
      </Typography>
      
      <Typography paragraph>
        На рисунке представлена схема дорог, связывающих города {task.points.join(', ')}.
        По каждой дороге можно двигаться только в одном направлении, указанном стрелкой.
      </Typography>

      <Typography paragraph>
        Сколько существует различных путей из города {task.start} в город {task.end}?
      </Typography>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={300}
          style={{ border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Количество путей"
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          fullWidth
          margin="normal"
          inputProps={{ min: 1 }}
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

export default Task9;