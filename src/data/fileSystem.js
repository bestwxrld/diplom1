export const fileSystem = {
    name: '',
    type: 'directory',
    children: [
      {
        name: 'Documents',
        type: 'directory',
        children: [
          {
            name: 'report.txt',
            type: 'file',
            content: 'Этот отчет содержит важную информацию о проекте.\nСроки: до 15.12.2023\nОтветственный: Иванов И.И.'
          },
          {
            name: 'notes.docx',
            type: 'file',
            content: 'Заметки к совещанию:\n1. Обсудить бюджет\n2. Назначить ответственных\n3. Подготовить презентацию'
          },
          {
            name: 'data',
            type: 'directory',
            children: [
              {
                name: 'customers.csv',
                type: 'file',
                content: 'ID,Name,Email\n1,Иванов,ivanov@example.com\n2,Петров,petrov@example.com'
              },
              {
                name: 'products.json',
                type: 'file',
                content: '[\n  {"id": 1, "name": "Продукт 1", "price": 100},\n  {"id": 2, "name": "Продукт 2", "price": 200}\n]'
              }
            ]
          }
        ]
      },
      {
        name: 'Images',
        type: 'directory',
        children: [
          {
            name: 'photo1.jpg',
            type: 'file'
          },
          {
            name: 'photo2.png',
            type: 'file'
          },
          {
            name: 'vacation',
            type: 'directory',
            children: [
              {
                name: 'beach.jpg',
                type: 'file'
              },
              {
                name: 'mountains.png',
                type: 'file'
              }
            ]
          }
        ]
      },
      {
        name: 'system',
        type: 'directory',
        children: [
          {
            name: 'config.ini',
            type: 'file',
            content: '[settings]\nlanguage=ru\ntheme=dark\n'
          },
          {
            name: 'logs',
            type: 'directory',
            children: [
              {
                name: 'system.log',
                type: 'file',
                content: '2023-10-01 10:00: System started\n2023-10-01 10:05: User logged in\n2023-10-01 12:30: Backup created'
              },
              {
                name: 'errors.log',
                type: 'file',
                content: '2023-10-01 09:58: Warning: low disk space\n2023-10-01 11:23: Error: connection timeout'
              }
            ]
          }
        ]
      },
      {
        name: 'readme.txt',
        type: 'file',
        content: 'Это файл с инструкциями.\nПожалуйста, прочитайте внимательно перед использованием программы.'
      }
    ]
  };