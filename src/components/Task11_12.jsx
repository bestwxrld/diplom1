import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  IconButton,
  Divider
} from '@mui/material';
import { Folder, InsertDriveFile, Search, Refresh } from '@mui/icons-material';
import { fileSystem } from '../data/fileSystem';

const Task11_12 = ({ onAnswer }) => {
  const [currentPath, setCurrentPath] = useState('/');
  const [searchTerm, setSearchTerm] = useState('');
  const [extension, setExtension] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [fileContent, setFileContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [task11Answer, setTask11Answer] = useState('');
  const [task12Answer, setTask12Answer] = useState('');
  const [result, setResult] = useState(null);

  const navigateTo = (path) => {
    setCurrentPath(path);
    setSelectedFile(null);
    setFileContent('');
  };

  const getCurrentDirectory = () => {
    const pathParts = currentPath.split('/').filter(Boolean);
    let current = fileSystem;
    
    for (const part of pathParts) {
      current = current.children.find(item => item.name === part);
      if (!current) return { children: [] };
    }
    
    return current;
  };

  const searchFiles = () => {
    const results = [];
    const searchInDirectory = (dir, path) => {
      for (const item of dir.children) {
        const itemPath = `${path}/${item.name}`;
        if (item.type === 'file') {
          if (item.name.includes(searchTerm) || 
              (item.content && item.content.includes(searchTerm))) {
            results.push({ ...item, path: itemPath });
          }
        } else {
          searchInDirectory(item, itemPath);
        }
      }
    };
    
    searchInDirectory(fileSystem, '');
    setSearchResults(results);
  };

  const countFilesByExtension = () => {
    const count = {};
    const countInDirectory = (dir) => {
      for (const item of dir.children) {
        if (item.type === 'file') {
          const ext = item.name.split('.').pop();
          count[ext] = (count[ext] || 0) + 1;
        } else {
          countInDirectory(item);
        }
      }
    };
    
    countInDirectory(fileSystem);
    return extension ? count[extension] || 0 : count;
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setFileContent(file.content || 'Содержимое файла недоступно');
  };

  const handleSubmitTask11 = (e) => {
    e.preventDefault();
    const count = searchResults.length;
    const isCorrect = parseInt(task11Answer) === count;
    setResult(isCorrect ? 'Правильно!' : 'Неправильно, попробуйте еще');
    onAnswer(11, { question: 'Найти файлы по содержанию', userAnswer: task11Answer, isCorrect });
  };

  const handleSubmitTask12 = (e) => {
    e.preventDefault();
    const count = countFilesByExtension();
    const isCorrect = parseInt(task12Answer) === count;
    setResult(isCorrect ? 'Правильно!' : 'Неправильно, попробуйте еще');
    onAnswer(12, { question: 'Найти файлы по расширению', userAnswer: task12Answer, isCorrect });
  };

  const currentDir = getCurrentDirectory();

  return (
    <Paper elevation={3} className="task-paper">
      <Typography variant="h5">Задания 11-12. Файловый браузер</Typography>
      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          <Typography variant="h6">Текущий путь: {currentPath}</Typography>
          
          <List>
            {currentPath !== '/' && (
              <ListItem button onClick={() => {
                const newPath = currentPath.split('/').slice(0, -1).join('/') || '/';
                navigateTo(newPath);
              }}>
                <ListItemIcon><Folder /></ListItemIcon>
                <ListItemText primary=".." />
              </ListItem>
            )}
            
            {currentDir.children.map((item, index) => (
              <ListItem 
                button 
                key={index} 
                onClick={() => {
                  if (item.type === 'directory') {
                    navigateTo(`${currentPath === '/' ? '' : currentPath}/${item.name}`);
                  } else {
                    handleFileClick(item);
                  }
                }}
              >
                <ListItemIcon>
                  {item.type === 'directory' ? <Folder /> : <InsertDriveFile />}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </div>
        
        <div style={{ flex: 1 }}>
          <Typography variant="h6">Поиск по содержанию</Typography>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <TextField
              label="Поиск по содержимому"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              margin="normal"
            />
            <IconButton onClick={searchFiles} color="primary">
              <Search />
            </IconButton>
          </div>
          
          <Typography variant="h6">Результаты поиска:</Typography>
          <List>
            {searchResults.map((file, index) => (
              <ListItem button key={index} onClick={() => handleFileClick(file)}>
                <ListItemIcon><InsertDriveFile /></ListItemIcon>
                <ListItemText primary={file.path} />
              </ListItem>
            ))}
          </List>
          
          <form onSubmit={handleSubmitTask11} style={{ marginTop: '20px' }}>
            <TextField
              label="Сколько файлов найдено?"
              type="number"
              value={task11Answer}
              onChange={(e) => setTask11Answer(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Проверить (задание 11)
            </Button>
          </form>
          
          <Divider style={{ margin: '20px 0' }} />
          
          <Typography variant="h6">Поиск по расширению</Typography>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <TextField
              label="Расширение файла (например, txt)"
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
              fullWidth
              margin="normal"
            />
            <IconButton onClick={() => setTask12Answer(countFilesByExtension())} color="primary">
              <Refresh />
            </IconButton>
          </div>
          
          <form onSubmit={handleSubmitTask12}>
            <TextField
              label="Сколько файлов с таким расширением?"
              type="number"
              value={task12Answer}
              onChange={(e) => setTask12Answer(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Проверить (задание 12)
            </Button>
          </form>
        </div>
        
        {selectedFile && (
          <div style={{ flex: 1, marginLeft: '20px' }}>
            <Typography variant="h6">Содержимое файла: {selectedFile.name}</Typography>
            <Paper style={{ padding: '10px', height: '300px', overflow: 'auto' }}>
              <pre>{fileContent}</pre>
            </Paper>
          </div>
        )}
      </div>
      
      {result && <Typography paragraph>{result}</Typography>}
    </Paper>
  );
};

export default Task11_12;