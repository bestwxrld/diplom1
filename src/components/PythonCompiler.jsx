import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper, Typography, CircularProgress } from '@mui/material';

const PythonCompiler = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pyodide, setPyodide] = useState(null);

  // Инициализация Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
      setIsLoading(true);
      try {
        // Загружаем Pyodide
        const pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
        });
        
        // Устанавливаем стандартные библиотеки Python
        await pyodide.loadPackage('micropip');
        await pyodide.runPythonAsync(`
          import micropip
          await micropip.install('numpy')
        `);
        
        setPyodide(pyodide);
      } catch (error) {
        console.error("Error loading Pyodide:", error);
        setOutput(`Ошибка загрузки: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (!window.pyodide) {
      loadPyodide();
    } else {
      setPyodide(window.pyodide);
    }

    return () => {
      // Очистка при размонтировании
      if (window.pyodide) {
        window.pyodide = null;
      }
    };
  }, []);

  const executeCode = async () => {
    if (!pyodide) return;
    
    setIsLoading(true);
    setOutput('');
    
    try {
      // Выполняем код Python
      const result = await pyodide.runPythonAsync(code);
      setOutput(result !== undefined ? result.toString() : "Код выполнен (нет вывода)");
    } catch (error) {
      setOutput(`Ошибка: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h5" gutterBottom>Python Компилятор</Typography>
      
      {isLoading && !pyodide ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CircularProgress size={20} />
          <Typography>Загрузка Python среды...</Typography>
        </div>
      ) : (
        <>
          <TextField
            label="Введите Python код"
            multiline
            rows={10}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="print('Hello, World!')"
          />
          
          <Button
            variant="contained"
            color="primary"
            onClick={executeCode}
            disabled={isLoading || !pyodide}
            style={{ marginTop: '10px' }}
          >
            {isLoading ? 'Выполнение...' : 'Выполнить'}
          </Button>
          
          {output && (
            <div style={{ marginTop: '20px' }}>
              <Typography variant="subtitle1">Результат:</Typography>
              <Paper elevation={2} style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{output}</pre>
              </Paper>
            </div>
          )}
        </>
      )}
    </Paper>
  );
};

export default PythonCompiler;