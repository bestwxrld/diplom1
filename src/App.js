import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';  // Можно оставить для навигации по якорям
import Navigation from './components/Navigation';
import AllTasks from './components/AllTasks';
import Results from './components/Results';
import Timer from './components/Timer';
import './styles.css';

function App() {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(150 * 60); // 150 минут в секундах

  const handleAnswer = (taskNumber, answer) => {
    setAnswers(prev => ({ ...prev, [taskNumber]: answer }));
  };

  return (
    <Router>
      <div className="app">
        <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
        <Navigation />
        <div className="content" style={{ maxHeight: 'auto', overflowY: 'auto' }}>
          <AllTasks answers={answers} onAnswer={handleAnswer} />
          {/* Можно добавить кнопку "Показать результаты" */}
          <Results answers={answers} />
        </div>
      </div>
    </Router>
  );
}

export default App;
