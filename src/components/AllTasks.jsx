import React from 'react';
import Task1 from './Task1';
import Task2 from './Task2';
import Task3 from './Task3';
import Task4 from './Task4';
import Task5 from './Task5';
import Task6 from './Task6';
import Task7 from './Task7';
import Task8 from './Task8';
import Task9 from './Task9';
import Task10 from './Task10';
import Task11_12 from './Task11_12';
import Task13_1 from './Task13_1';
import Task14_1 from './Task14_1';
import Task14_2 from './Task14_2';

const AllTasks = ({ answers, onAnswer }) => {
  return (
    <div>
      <div id="task1"><Task1 savedData={answers[1]} onAnswer={onAnswer} /></div>
      <div id="task2"><Task2 savedData={answers[2]} onAnswer={onAnswer} /></div>
      <div id="task3"><Task3 savedData={answers[3]} onAnswer={onAnswer} /></div>
      <div id="task4"><Task4 savedData={answers[4]} onAnswer={onAnswer} /></div>
      <div id="task5"><Task5 savedData={answers[5]} onAnswer={onAnswer} /></div>
      <div id="task6"><Task6 savedData={answers[6]} onAnswer={onAnswer} /></div>
      <div id="task7"><Task7 savedData={answers[7]} onAnswer={onAnswer} /></div>
      <div id="task8"><Task8 savedData={answers[8]} onAnswer={onAnswer} /></div>
      <div id="task9"><Task9 savedData={answers[9]} onAnswer={onAnswer} /></div>
      <div id="task10"><Task10 savedData={answers[10]} onAnswer={onAnswer} /></div>
      <div id="task11_12"><Task11_12 savedData={answers['11_12']} onAnswer={onAnswer} /></div>
      <div id="task13"><Task13_1 savedData={answers[13_1]} onAnswer={onAnswer} /></div>
      <div id="task14_1"><Task14_1 savedData={answers['14_1']} onAnswer={onAnswer} /></div>
      <div id="task14_2"><Task14_2 savedData={answers['14_2']} onAnswer={onAnswer} /></div>
    </div>
  );
};

export default AllTasks;