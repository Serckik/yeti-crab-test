## Запуск проекта
1. npm i
2. npm run dev

## Функционал проекта
1. Выводится таблица заявок и то сколько заявок находится на данный момент в таблице.<br/> 
Обычный пользователь может:<br/> 
  2.1 Сортировать заявки и искать заявку в поиске. Поиск выводит любое совпадение с любым столбцом.<br/> 
  2.2 Менять порядок столбцов. В правом углу шапки таблицы есть иконка решётки и при нажатии всплывает список с названиями столбцов. Столбец можно скрыть, либо ппереместить с помощью react-beautiful-dnd<br/> 
  2.3 Скрыть выполненные задачи.<br/> 
Администратор может:<br/> 
  3.1 Выполнять те же самые фунции, что и не администратор.<br/> 
  3.2 Выбрать определённые заявки для удаления, для этого надо нажать слева от шапки таблицы и выбрать все заявки, либо выбрать определённые. Когда выбрана одна из заявок, появляется кнопка для удаления выбранных заявок.<br/> 
  3.3 Редактировать заявки для этого нужно нажать на три точки справа от строки таблицы и выбрать редактировать.<br/> 
  3.4 Редактировать можно название фирмы, фио, номер телефона, комментарии и выбрать статус заявки.<br/> 
  3.5 Поля фирмы и фио не должны быть пустыми. Поле телефона должно соответствовать формату +7 и 10 цифр. Если какое-то поле будет не верно заполнено покажется предупреждение у нужного поля.<br/> 
  3.6 Добавлять новые задачи.<br/> 
4. Для дизайна использовался Gravity UI<br/> 

## Документация к к REST API
Все методы обращения к backend буду описаны ввиде методов, пути и полей
# Блок table - Endpoints for managing Table data
1. GET /table/get_requests_table без полей, возвращает таблицу заявок.
2. POST /table/add_requests - без полей, возвращает id созданной заявки.
3. DELETE /table/delete_requests - id: number, primary, возвращает ответ об успешном удалении заявки или ошибке, если такого id не существует
4. PATCH /table/change_requests - id:number, primary, FormData: {date: string, firm: string, number: string, comment:string, status: enum status, ATICode: number}, primary
для POST, DELETE и PATCH запросов в дальнейшем при регистрации важно в поле header для jwt токена для него потребуется блок auth, который выглядит так
# Блок auth - All about auth is here. Bearer transport
1. POST /auth/jwt/login
2. POST /auth/jwt/logout - token
3. POST /auth/forgot-password - email
4. POST /auth/reset-password - уникальный id для восстановления пароля, который пришёл в адресе ссылки с почты.
