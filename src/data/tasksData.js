// tasksData.js - генератор всех заданий ОГЭ по информатике

export const generateTask1 = () => {
  const categories = [
    {
      common: 'животные',
      subject: 'название животного',
      items: {
        2: ['ёж', 'уж', 'як'],
        3: ['кот', 'пёс', 'рак'],
        4: ['осёл', 'удав', 'овца'],
        5: ['песец', 'олень', 'хомяк'],
        6: ['сайгак', 'свинья', 'собака'],
        7: ['альпака', 'носорог', 'утконос'],
        8: ['крокодил', 'хамелеон', 'шимпанзе'],
        9: ['аллигатор', 'горностай', 'иглошерст']
      }
    },
    {
      common: 'города',
      subject: 'название города',
      items: {
        3: ['Уфа', 'Бор', 'Шуя'],
        4: ['Ухта', 'Чита', 'Сочи'],
        5: ['Томск', 'Ревда', 'Псков'],
        6: ['Самара', 'Москва', 'Рязань'],
        7: ['Сызрань', 'Балашов', 'Саранск'],
        8: ['Тольятти', 'Владимир', 'Улан-Удэ'],
        9: ['Астрахань', 'Череповец', 'Ярославль'],
        10: ['Красноярск', 'Ставрополь', 'Кисловодск']
      }
    },
    {
      common: 'игры',
      subject: 'название игры',
      items: {
        3: ['NBA', 'WWE'],
        4: ['DayZ', 'Doom', 'FIFA'],
        5: ['Knack', 'Metro', 'Sonic'],
        6: ['FarCry', 'MadMax', 'Mortal'],
        7: ['Outlast', 'Horizon', 'Hotline'],
        8: ['Broforce', 'Terraria', 'GodOfWar'],
        9: ['Minecraft', 'Days_Gone', 'Destiny_2'],
        10: ['Dead_Space', 'Dishonored', 'BioShock_2']
      }
    }
  ];

  const category = categories[Math.floor(Math.random() * categories.length)];
  const encodingSizes = ['8 битами', '16 битами', '2 байтами', '4 байтами'];
  const symbolEncodingSize = encodingSizes[Math.floor(Math.random() * encodingSizes.length)];
  
  const symbolEncodingSizeInBits = symbolEncodingSize.includes('байтами') 
    ? parseInt(symbolEncodingSize) * 8 
    : parseInt(symbolEncodingSize);

  const lengths = Object.keys(category.items).map(Number);
  const symbolsRemoved = lengths[Math.floor(Math.random() * lengths.length)];
  
  const itemsList = [];
  for (const length of lengths) {
    const possibleWords = category.items[length];
    itemsList.push(possibleWords[Math.floor(Math.random() * possibleWords.length)]);
  }

  const answer = itemsList.find(item => item.length === symbolsRemoved);
  const removedNameBits = (symbolsRemoved + 2) * symbolEncodingSizeInBits;
  const writtenText = `${itemsList.join(', ')} – ${category.common}`;

  return {
    question: '',
    answer: answer,
    explanation: `Решение:
    \n1. Размер кодировки: ${symbolEncodingSize} (${symbolEncodingSizeInBits} бит)
    \n2. Удалено: ${answer} (${symbolsRemoved} символов) + запятая и пробел
    \n3. Общее уменьшение: (${symbolsRemoved} + 2) × ${symbolEncodingSizeInBits} бит = ${removedNameBits} бит`,
    symbolEncodingSize,
    writtenText,
    subject: category.subject,
    removedNameBits,
    common: category.common
  };
};
  
  // Задание 2. Расшифровка циферного послания по таблице
  export const generateTask2 = () => {
    const letters = {
      'А': '01',
      'Б': '100',
      'К': '101',
      'Л': '111',
      'О': '00',
      'С': '110'
    };
  
    // Генерируем случайное сообщение длиной 4-8 букв
    const messageLength = Math.floor(Math.random() * 5) + 4;
    let decodedMessage = '';
    let encodedMessage = '';
  
    for (let i = 0; i < messageLength; i++) {
      const letter = Object.keys(letters)[Math.floor(Math.random() * Object.keys(letters).length)];
      decodedMessage += letter;
      encodedMessage += letters[letter];
    }
  
    // Проверяем альтернативные варианты расшифровки
    let alternativeSolution = null;
    const reversedEncoded = encodedMessage.split('').reverse().join('');
  
    // Функция для поиска альтернативных решений
    const findSolution = (code) => {
      let solution = '';
      let buffer = '';
      
      for (let digit of code) {
        buffer += digit;
        for (const [letter, pattern] of Object.entries(letters)) {
          if (buffer === pattern) {
            solution += letter;
            buffer = '';
            break;
          }
        }
      }
      
      return buffer === '' ? solution : null;
    };
  
    alternativeSolution = findSolution(reversedEncoded);
  
    return {
      question: '',
      answer: decodedMessage,
      explanation: `Решение:
      \n1. Разбиваем код ${encodedMessage} на части согласно таблице:
      ${encodedMessage.match(new RegExp(Object.values(letters).join('|'), 'g'))?.join(' ')}
      \n2. Получаем последовательность букв: ${decodedMessage}
      ${alternativeSolution ? `\n\nАльтернативный вариант (при обратном чтении): ${alternativeSolution}` : ''}`,
      encodedMessage,
      letters,
      alternativeSolution
    };
  };
  
// tasksData.js - исправленный генератор для задания 3
export const generateTask3 = () => {
  const conditions = [
    { 
      type: 'even', 
      text: 'чётное', 
      description: 'x делится на 2 без остатка',
      check: n => n % 2 === 0 
    },
    { 
      type: 'odd', 
      text: 'нечётное', 
      description: 'x не делится на 2 без остатка',
      check: n => n % 2 !== 0 
    },
    { 
      type: 'sameDigits', 
      text: 'цифры одинаковые', 
      description: 'первая и вторая цифры x одинаковые',
      check: n => {
        const s = String(n);
        return s.length > 1 && s[0] === s[1];
      }
    },
    { 
      type: 'notSameDigits', 
      text: 'цифры неодинаковые', 
      description: 'первая и вторая цифры x разные',
      check: n => {
        const s = String(n);
        return s.length > 1 && s[0] !== s[1];
      }
    }
  ];

  const minValue = 20;
  const maxValue = 70;
  const base = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  const useNegation = Math.random() > 0.5;

  // Находим наименьшее число, удовлетворяющее условиям
  let answer = base + 1;
  while (useNegation ? condition.check(answer) : !condition.check(answer)) {
    answer++;
  }

  const conditionText = useNegation 
    ? `НЕ (${condition.text})` 
    : condition.text;

  return {
    question: `Напишите наименьшее число x, для которого истинно высказывание:\n(x > ${base}) И (${conditionText})`,
    answer: answer,
    explanation: generateExplanation(base, answer, condition, useNegation),
    minValue: base + 1,
    condition,
    useNegation
  };
};

function generateExplanation(base, answer, condition, useNegation) {
  let explanation = `Условия:\n1. x > ${base}\n2. x ${useNegation ? 'НЕ ' : ''}${condition.description}\n\n`;
  
  explanation += `Проверяем числа после ${base}:\n`;
  
  const checkFunction = useNegation 
    ? n => !condition.check(n)
    : condition.check;
  
  let checkedNumbers = '';
  let count = 0;
  const maxShown = 5;
  
  for (let x = base + 1; x <= answer; x++) {
    if (count >= maxShown && x < answer) continue;
    
    const isValid = checkFunction(x);
    checkedNumbers += `${x} ${isValid ? '✓' : '✗'}`;
    
    if (x === answer) break;
    checkedNumbers += ', ';
    count++;
    
    if (count === maxShown && x < answer) {
      checkedNumbers += '..., ';
    }
  }
  
  explanation += checkedNumbers;
  explanation += `\n\nНаименьшее подходящее число: ${answer}`;
  
  return explanation;
}

// задание 4. дороги
export const generateTask4 = () => {
  const points = ['A', 'B', 'C', 'D', 'E'];
  const selectedPoints = [...points].sort(() => Math.random() - 0.5).slice(0, 4 + Math.floor(Math.random() * 2));

  // Выбираем начальную, промежуточную и конечную точки
  let start, through, end;
  do {
    const shuffled = [...selectedPoints].sort(() => Math.random() - 0.5);
    [start, through, end] = shuffled.slice(0, 3);
  } while (start === end || start === through || through === end);

  // Строим граф дорог
  const roads = [];
  const graph = {};

  // Сначала создаем минимальное связующее дерево
  for (let i = 0; i < selectedPoints.length - 1; i++) {
    const from = selectedPoints[i];
    const to = selectedPoints[i + 1];
    const distance = Math.floor(Math.random() * 9) + 1;
    
    if (!graph[from]) graph[from] = {};
    if (!graph[to]) graph[to] = {};
    
    graph[from][to] = distance;
    graph[to][from] = distance;
    roads.push({ path: `${from}-${to}`, distance });
  }

  // Добавляем несколько случайных дополнительных дорог
  const extraRoadsCount = Math.floor(Math.random() * 3);
  for (let i = 0; i < extraRoadsCount; i++) {
    let from, to;
    do {
      from = selectedPoints[Math.floor(Math.random() * selectedPoints.length)];
      to = selectedPoints[Math.floor(Math.random() * selectedPoints.length)];
    } while (from === to || graph[from]?.[to] !== undefined);

    const distance = Math.floor(Math.random() * 9) + 1;
    graph[from][to] = distance;
    graph[to][from] = distance;
    roads.push({ path: `${from}-${to}`, distance });
  }

  // Функция для поиска кратчайшего пути между двумя точками
  const findShortestPath = (startNode, endNode) => {
    const distances = { [startNode]: 0 };
    const visited = new Set();
    const previous = {};
    let current = startNode;

    while (current && current !== endNode) {
      visited.add(current);
      
      for (const neighbor in graph[current]) {
        const newDist = distances[current] + graph[current][neighbor];
        if (distances[neighbor] === undefined || newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = current;
        }
      }

      current = Object.keys(distances)
        .filter(p => !visited.has(p))
        .sort((a, b) => (distances[a] || Infinity) - (distances[b] || Infinity))[0];
    }

    if (distances[endNode] === undefined) return { distance: Infinity, path: [] };

    // Восстанавливаем путь
    const path = [endNode];
    let node = endNode;
    while (node !== startNode) {
      node = previous[node];
      path.unshift(node);
    }

    return { distance: distances[endNode], path };
  };

  // Находим кратчайший путь через промежуточную точку
  const firstLeg = findShortestPath(start, through);
  const secondLeg = findShortestPath(through, end);

  // Проверяем, чтобы путь не содержал повторяющихся точек (кроме through)
  const hasDuplicatePoints = [...firstLeg.path.slice(0, -1), ...secondLeg.path]
    .some((point, index, arr) => arr.indexOf(point) !== index);

  let answer, explanation;
  
  if (firstLeg.distance === Infinity || secondLeg.distance === Infinity || hasDuplicatePoints) {
    // Если нет пути через указанную точку, находим любой возможный путь
    const fullPath = findShortestPath(start, end);
    answer = fullPath.distance;
    explanation = `Невозможно построить путь через ${through}. Кратчайший прямой путь: ${fullPath.path.join(' → ')} = ${fullPath.distance} км`;
  } else {
    answer = firstLeg.distance + secondLeg.distance;
    explanation = `Кратчайший путь: ${firstLeg.path.join(' → ')} → ${secondLeg.path.slice(1).join(' → ')} = ${firstLeg.distance} + ${secondLeg.distance} = ${answer} км`;
  }

  return {
    question: '',
    answer,
    explanation,
    points: selectedPoints,
    roads: roads.sort((a, b) => a.path.localeCompare(b.path)),
    start,
    through,
    end,
    graph
  };
};
  
  // Задание 5. Вычислить число по алгоритму
  export const generateTask5 = () => {
    const startNumber = Math.floor(Math.random() * 10);
    const minB = 2;
    const maxB = 5;
    const b = Math.floor(Math.random() * (maxB - minB + 1)) + minB;
  
    // Генерируем алгоритм из 5 команд (гарантируем хотя бы одно умножение)
    let algorithm = '';
    let currentValue = startNumber;
    let hasMultiplication = false;
  
    for (let i = 0; i < 5; i++) {
      let command;
      
      // На последнем шаге добавляем умножение, если его еще не было
      if (i === 4 && !hasMultiplication) {
        command = 2;
      } else {
        command = Math.random() > 0.5 ? 1 : 2;
      }
  
      algorithm += command;
      
      if (command === 1) {
        currentValue += 1;
      } else {
        currentValue *= b;
        hasMultiplication = true;
      }
    }
  
    // Формируем объяснение с пошаговым выполнением
    let explanation = `Пошаговое выполнение алгоритма ${algorithm}:\n\n`;
    let stepValue = startNumber;
    
    for (let i = 0; i < algorithm.length; i++) {
      const command = algorithm[i];
      const prevValue = stepValue;
      
      if (command === '1') {
        stepValue += 1;
        explanation += `${i+1}. ${prevValue} + 1 = ${stepValue}\n`;
      } else {
        stepValue *= b;
        explanation += `${i+1}. ${prevValue} × ${b} = ${stepValue}\n`;
      }
    }
  
    return {
      question: '',
      answer: b,
      explanation: explanation + `\nИскомое значение b: ${b}`,
      startNumber,
      algorithm,
      endNumber: currentValue
    };
  };

  // Задание 6. программа
  export const generateTask6 = () => {
    const comparisonTypes = ['>', '>=', '<', '<=', '=='];
    const min = -5, max = 20;
    const logicalOperators = ['and', 'or'];
  
    // Генерация условий
    const condition1 = {
      comparison: comparisonTypes[Math.floor(Math.random() * comparisonTypes.length)],
      with: Math.floor(Math.random() * (max - min + 1)) + min
    };
  
    const condition2 = {
      comparison: comparisonTypes[Math.floor(Math.random() * comparisonTypes.length)],
      with: Math.floor(Math.random() * (max - min + 1)) + min
    };
  
    const conditionsComparison = logicalOperators[Math.floor(Math.random() * logicalOperators.length)];
    const neededOutput = Math.random() > 0.5 ? 'YES' : 'NO';
  
    // Генерация тестовых данных
    const executionsCount = Math.floor(Math.random() * 11) + 5; // 5-15 запусков
    const executions = [];
    const executionsOutput = [];
    let correctCount = 0;
  
    for (let i = 0; i < executionsCount; i++) {
      const input1 = Math.floor(Math.random() * (max - min + 1)) + min;
      const input2 = Math.floor(Math.random() * (max - min + 1)) + min;
      executions.push([input1, input2]);
  
      const condition1True = eval(`${input1} ${condition1.comparison} ${condition1.with}`);
      const condition2True = eval(`${input2} ${condition2.comparison} ${condition2.with}`);
  
      let result;
      if (conditionsComparison === 'and') {
        result = condition1True && condition2True ? 'YES' : 'NO';
      } else {
        result = condition1True || condition2True ? 'YES' : 'NO';
      }
  
      executionsOutput.push(result);
      if (result === neededOutput) correctCount++;
    }
  
    // Формирование кода на разных языках
    const algorithmCode = `алг
  нач
  цел s, t
  ввод s
  ввод t
  если s ${condition1.comparison} ${condition1.with} ${conditionsComparison === 'and' ? 'и' : 'или'} t ${condition2.comparison} ${condition2.with}
  то вывод "YES"
  иначе вывод "NO"
  все
  кон`;
  
    const pascalCode = `var s, t: integer;
  begin
    readln(s);
    readln(t);
    if (s ${condition1.comparison} ${condition1.with}) ${conditionsComparison} (t ${condition2.comparison} ${condition2.with}) then
      writeln('YES')
    else
      writeln('NO');
  end.`;
  
    const pythonCode = `s = int(input())
  t = int(input())
  if (s ${condition1.comparison} ${condition1.with}) ${conditionsComparison} (t ${condition2.comparison} ${condition2.with}):
    print("YES")
  else:
    print("NO")`;
  
    return {
      question: '', // Не используется, так как вопрос формируется в компоненте
      answer: correctCount,
      explanation: `Программа выводит "${neededOutput}" при выполнении условия: (s ${condition1.comparison} ${condition1.with}) ${conditionsComparison} (t ${condition2.comparison} ${condition2.with})`,
      algorithmCode,
      pascalCode,
      pythonCode,
      executionsCount,
      executions: executions.map(e => `(${e[0]}, ${e[1]})`).join('; '),
      neededOutput,
      condition1,
      condition2,
      conditionsComparison
    };
  };

  // Задание 7. домен
  export const generateTask7 = () => {
    const protocols = ['http', 'https', 'ftp'];
    const domains = ['example.com', 'site.org', 'web.net', 'service.io'];
    const paths = ['images', 'documents', 'files', 'downloads'];
    const filenames = ['report.pdf', 'picture.jpg', 'data.xlsx', 'archive.zip'];
    
    const protocol = protocols[Math.floor(Math.random() * protocols.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const path = paths[Math.floor(Math.random() * paths.length)];
    const filename = filenames[Math.floor(Math.random() * filenames.length)];
    
    const answer = `${protocol}://${domain}/${path}/${filename}`;
    
    return {
      question: `Составьте полный URL адрес до файла, используя следующие компоненты:
      \nПротокол: ${protocol}
      \nДомен: ${domain}
      \nПуть: ${path}
      \nИмя файла: ${filename}`,
      answer: answer,
      explanation: `Правильный URL составляется по схеме: протокол://домен/путь/имя_файла
      \nДля данных компонентов получается: ${answer}`
    };
  };
  
  // Задание 8. Поисковые запросы
  export const generateTask8 = () => {
    const possibleTerms = [
      ['шинель', 'кофта'], ['рыбка', 'рыбак'], ['башня', 'замок'], ['лимон', 'лайм'],
      ['аэрофлот', 'аэропорт'], ['банка', 'банк'], ['лунка', 'луна'], ['решето', 'решетка'],
      ['блок', 'блог'], ['самара', 'саратов']
    ];
  
    const [term1, term2] = possibleTerms[Math.floor(Math.random() * possibleTerms.length)];
    const termShown = Math.floor(Math.random() * 2);
    const targetTerm = termShown ? term2 : term1;
  
    // Генерируем случайное количество страниц
    const pagesOverall = Math.floor(Math.random() * 86) + 5; // 5-90 тысяч
    const pages = [];
  
    for (let i = 0; i < pagesOverall; i++) {
      switch(Math.floor(Math.random() * 3)) {
        case 0: pages.push(term1); break;
        case 1: pages.push(term2); break;
        case 2: pages.push('both'); break;
      }
    }
  
    // Создаем запросы
    const requests = [
      `${term1} | ${term2}`,
      targetTerm,
      `${term1} & ${term2}`
    ].sort(() => Math.random() - 0.5);
  
    // Вычисляем ответы для каждого запроса
    const responses = requests.map(request => {
      if (request.includes('|')) {
        return pages.filter(page => [term1, term2, 'both'].includes(page)).length * 10;
      } else if (request.includes('&')) {
        return pages.filter(page => page === 'both').length * 10;
      } else {
        return pages.filter(page => page === request).length * 10;
      }
    });
  
    // Вычисляем правильный ответ
    const orCount = pages.filter(page => [term1, term2, 'both'].includes(page)).length;
    const bothCount = pages.filter(page => page === 'both').length;
    const termCount = pages.filter(page => page === targetTerm).length;
    const answer = (orCount - termCount + bothCount) * 10;
  
    return {
      question: `В таблице приведены запросы и количество найденных страниц. Какое количество страниц (в тысячах) будет найдено по запросу "${targetTerm}"?`,
      answer: answer.toString(),
      explanation: `Решение:
      \n1. ${term1} | ${term2}: ${orCount * 10} тыс. (все страницы с ${term1} или ${term2})
      \n2. ${term1} & ${term2}: ${bothCount * 10} тыс. (только страницы с обоими словами)
      \n3. ${targetTerm}: ${termCount * 10} тыс.
      \nФормула: (${term1}|${term2}) - ${targetTerm} + (${term1}&${term2}) = ${answer} тыс.`,
      requests,
      responses,
      targetTerm
    };
  };
  
  // Задание 9. Количество путей от точки до точки
export const generateTask9 = () => {
  const points = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const selectedPoints = points.slice(0, 4 + Math.floor(Math.random() * 3)); // 4-6 точек
  const start = selectedPoints[0];
  const end = selectedPoints[selectedPoints.length - 1];

  // Генерируем граф
  const edges = [];
  const graph = {};
  selectedPoints.forEach(point => graph[point] = []);

  // Базовые связи между соседями
  for (let i = 0; i < selectedPoints.length - 1; i++) {
    const from = selectedPoints[i];
    const to = selectedPoints[i + 1];
    edges.push({ from, to });
    graph[from].push(to);
  }

  // Добавляем случайные дополнительные связи
  const extraConnections = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < extraConnections; i++) {
    const fromIndex = Math.floor(Math.random() * (selectedPoints.length - 2));
    const toIndex = fromIndex + 2 + Math.floor(Math.random() * (selectedPoints.length - fromIndex - 2));
    
    if (toIndex < selectedPoints.length) {
      const from = selectedPoints[fromIndex];
      const to = selectedPoints[toIndex];
      
      if (!edges.some(e => e.from === from && e.to === to)) {
        edges.push({ from, to });
        graph[from].push(to);
      }
    }
  }

  // Вычисляем количество путей (динамическое программирование)
  const countPaths = (graph, start, end) => {
    const dp = {};
    selectedPoints.forEach(point => dp[point] = 0);
    dp[end] = 1;

    for (let i = selectedPoints.length - 2; i >= 0; i--) {
      const point = selectedPoints[i];
      dp[point] = graph[point].reduce((sum, neighbor) => sum + dp[neighbor], 0);
    }

    return dp[start];
  };

  const answer = countPaths(graph, start, end);

  // Улучшенное размещение узлов на холсте
  const canvasData = {
    nodes: selectedPoints.map((point, index) => ({
      name: point,
      // Равномерное распределение по горизонтали
      x: 100 + index * (600 / (selectedPoints.length - 1)),
      // Вертикальное смещение для лучшей визуализации
      y: 100 + (index % 2 === 0 ? 0 : 80)
    })),
    edges
  };

  // Формируем объяснение с визуализацией графа
  const explanation = (
    <div>
      <p><strong>Граф маршрутов:</strong></p>
      <ul>
        {edges.map((edge, i) => (
          <li key={i}>{edge.from} → {edge.to}</li>
        ))}
      </ul>
      <p><strong>Алгоритм решения:</strong></p>
      <ol>
        <li>Каждому пункту присваивается количество путей до конечного пункта</li>
        <li>Для конечного пункта {end} = 1 (один путь - ничего не делать)</li>
        <li>Для остальных пунктов: сумма путей всех следующих пунктов</li>
        <li>Итоговое количество путей из {start} в {end}: <strong>{answer}</strong></li>
      </ol>
    </div>
  );

  return {
    question: `Вам представлена схема односторонних маршрутов между пунктами. 
               Сколько существует различных путей из пункта ${start} в пункт ${end}?`,
    answer,
    explanation,
    points: selectedPoints,
    start,
    end,
    canvasData
  };
};
  
  // Задание 10. Наибольшее число среди систем счисления
  export const generateTask10 = () => {
    const bases = [2, 8, 10, 16];
    const numbers = [];
    
    // Генерируем 3 случайных числа в разных системах счисления
    for (let i = 0; i < 3; i++) {
      const base = bases[Math.floor(Math.random() * bases.length)];
      const value = Math.floor(Math.random() * 1000) + 1;
      const str = base === 10 ? value.toString() : value.toString(base).toUpperCase();
      
      numbers.push({ value, base, str });
    }
  
    // Находим максимальное число
    const maxValue = Math.max(...numbers.map(n => n.value));
    const maxNumber = numbers.find(n => n.value === maxValue);
  
    // Формируем объяснение с переводом всех чисел в десятичную систему
    const explanation = numbers.map(num => {
      const decimalValue = num.base === 10 ? num.value : parseInt(num.str, num.base);
      return `${num.str}_${num.base} = ${decimalValue}_10`;
    }).join('\n') + `\n\nНаибольшее число: ${maxValue}`;
  
    return {
      question: '',
      answer: maxValue,
      explanation,
      numbers,
      maxNumber
    };
  };
  
  // Задание 11-12. Файловый браузер (данные вынесены в отдельный файл fileSystem.js)
  
  // Задание 13. Работа с таблицей
export const generateTask13 = () => {
  const templates = [
    {
      headers: ['Фамилия', 'Предмет', 'Баллы'],
      rows: [
        ['Иванов', 'Математика', 85],
        ['Петров', 'Физика', 92],
        ['Сидоров', 'Информатика', 78],
        ['Смирнов', 'Математика', 90],
        ['Кузнецов', 'Физика', 88]
      ],
      question: "Сколько учеников получили более 85 баллов?",
      explanation: "Решение:\nИванов: 85 > 85? Нет\nПетров: 92 > 85? Да\nСидоров: 78 > 85? Нет\nСмирнов: 90 > 85? Да\nКузнецов: 88 > 85? Да\nИтого: 3"
    },
    {
      headers: ['Товар', 'Цена', 'Количество'],
      rows: [
        ['Молоко', 65, 3],
        ['Хлеб', 40, 2],
        ['Яйца', 80, 1],
        ['Сахар', 50, 4],
        ['Масло', 120, 2]
      ],
      question: "Какова общая стоимость всех товаров?",
      explanation: "Решение:\nМолоко: 65 × 3 = 195\nХлеб: 40 × 2 = 80\nЯйца: 80 × 1 = 80\nСахар: 50 × 4 = 200\nМасло: 120 × 2 = 240\nИтого: 195 + 80 + 80 + 200 + 240 = 795"
    },
    {
      headers: ['Город', 'Температура', 'Осадки'],
      rows: [
        ['Москва', 18, 'Дождь'],
        ['Санкт-Петербург', 16, 'Дождь'],
        ['Сочи', 25, 'Ясно'],
        ['Новосибирск', 12, 'Снег'],
        ['Екатеринбург', 14, 'Облачно']
      ],
      question: "В скольких городах температура была выше 15 градусов и были осадки?",
      explanation: "Решение:\nМосква: 18 > 15 и Дождь? Да\nСПб: 16 > 15 и Дождь? Да\nСочи: 25 > 15 и Ясно? Нет\nНовосибирск: 12 > 15? Нет\nЕкатеринбург: 14 > 15? Нет\nИтого: 2"
    }
  ];

  const template = templates[Math.floor(Math.random() * templates.length)];
  const answer = calculateAnswer(template);
  
  return {
    ...template,
    answer: answer.toString(),
    explanation: template.explanation + `\n\nПравильный ответ: ${answer}`
  };
};

function calculateAnswer(template) {
  if (template.question.includes('более 85 баллов')) {
    return template.rows.filter(row => row[2] > 85).length;
  }
  if (template.question.includes('общая стоимость')) {
    return template.rows.reduce((sum, row) => sum + (row[1] * row[2]), 0);
  }
  if (template.question.includes('температура была выше 15 градусов')) {
    return template.rows.filter(row => row[1] > 15 && row[2] === 'Дождь').length;
  }
  return 0;
}
  
// задание 14. робот
export const generateTask14_1 = () => {
  const tasks = [
    {
      question: "Робот 🤖 находится в левом верхнем углу (клетка 1,1), смотрит вправо. Напишите программу, чтобы он дошел до правой нижней клетки (3,3), поднял предмет ★ и вернулся в центр (2,2).",
      possibleAnswers: [
        // Варианты через право-вниз
        ["вправо", "вправо", "вниз", "вниз", "поднять", "вверх", "влево"],
        ["вправо", "вниз", "вправо", "вниз", "поднять", "вверх", "влево"],
        ["вправо", "вниз", "вниз", "вправо", "поднять", "вверх", "влево"],
        
        // Варианты через вниз-право
        ["вниз", "вниз", "вправо", "вправо", "поднять", "влево", "вверх"],
        ["вниз", "вправо", "вниз", "вправо", "поднять", "влево", "вверх"],
        ["вниз", "вправо", "вправо", "вниз", "поднять", "влево", "вверх"],
      ],
      explanation: "Робот должен дойти до (3,3), поднять предмет и вернуться в центр."
    },
    {
      question: "Робот 🤖 находится в левом верхнем углу (клетка 1,1), смотрит вправо. Перед ним в клетке (2,1) лежит предмет ★. Напишите программу, чтобы он поднял предмет и вернулся в начальную позицию.",
      possibleAnswers: [
        // Прямой путь
        ["вправо", "поднять", "влево"],
        
        // С дополнительными движениями
        ["вправо", "вправо", "поднять", "влево", "влево"],
        ["вправо", "вниз", "поднять", "вверх", "влево"],
        ["вправо", "вверх", "поднять", "вниз", "влево"],
        
        // С круговым движением
        ["вправо", "вниз", "вправо", "поднять", "влево", "вверх", "влево"],
      ],
      explanation: "Робот должен добраться до предмета, поднять его и вернуться назад."
    },
    {
      question: "Робот 🤖 находится в левом верхнем углу (клетка 1,1), смотрит вправо. Напишите программу, чтобы он обошёл все клетки по периметру поля по часовой стрелке.",
      possibleAnswers: [
        // По часовой стрелке (право-низ-лево-верх)
        ["вправо", "вправо", "вниз", "вниз", "влево", "влево", "вверх", "вверх"],
        ["вправо", "вниз", "вправо", "вниз", "влево", "вверх", "влево", "вверх"],
        
        // По часовой стрелке (низ-право-верх-лево)
        ["вниз", "вниз", "вправо", "вправо", "вверх", "вверх", "влево", "влево"],
        ["вниз", "вправо", "вниз", "вправо", "вверх", "влево", "вверх", "влево"],
        
        // Комбинированные варианты
        ["вправо", "вниз", "вниз", "влево", "влево", "вверх", "вверх", "вправо"],
        ["вниз", "вправо", "вправо", "вверх", "вверх", "влево", "влево", "вниз"],
      ],
      explanation: "Робот должен пройти по краям поля, возвращаясь в начальную точку."
    }
  ];
  
  const task = tasks[Math.floor(Math.random() * tasks.length)];
  
  return {
    question: task.question,
    possibleAnswers: task.possibleAnswers,
    explanation: task.explanation,
    answerString: task.possibleAnswers[0].join(' ') // Первый вариант как основной пример
  };
};
  
  
export const generateTask14_2 = () => {
  const tasks = [
    {
      type: 'factorial',
      question: `Напишите функцию на Python под названием 'solution', которая принимает целое число N и возвращает его факториал.`,
      testCases: [
        { input: 5, output: 120 },
        { input: 3, output: 6 },
        { input: 0, output: 1 }
      ],
      inputDescription: "Целое число N ≥ 0"
    },
    {
      type: 'fibonacci',
      question: `Напишите функцию на Python под названием 'solution', которая принимает целое число N и возвращает N-е число Фибоначчи.`,
      testCases: [
        { input: 6, output: 8 },
        { input: 4, output: 3 },
        { input: 0, output: 0 }
      ],
      inputDescription: "Целое число N ≥ 0"
    },
    {
      type: 'sum',
      question: `Напишите функцию на Python под названием 'solution', которая принимает целое число N и возвращает сумму всех целых чисел от 1 до N включительно.`,
      testCases: [
        { input: 10, output: 55 },
        { input: 5, output: 15 },
        { input: 1, output: 1 }
      ],
      inputDescription: "Целое число N ≥ 1"
    }
  ];

  const task = tasks[Math.floor(Math.random() * tasks.length)];
  const randomTestCase = task.testCases[Math.floor(Math.random() * task.testCases.length)];

  return {
    type: task.type,
    question: task.question,
    exactInput: randomTestCase.input.toString(),
    exactOutput: randomTestCase.output.toString(),
    inputDescription: task.inputDescription
  };
};