import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';

const Timer = ({ timeLeft, setTimeLeft }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [setTimeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Box
      sx={{
        width: 120,
        margin: '0 auto',
        padding: 1,
        borderRadius: 2,
        backgroundColor: '#f5f5f7',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        userSelect: 'none',
      }}
    >
      <Typography
        variant="h6"
        align="center"
        gutterBottom={false}
        sx={{
          fontFamily: "'Roboto Mono', monospace",
          fontWeight: 700,
          color: '#333',
          letterSpacing: '0.05em',
        }}
      >
        Осталось времени
      </Typography>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontFamily: "'Roboto Mono', monospace",
          fontWeight: 'bold',
          color: '#1976d2',
          mt: 0.5,
        }}
      >
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Typography>
    </Box>
  );
};

export default Timer;
