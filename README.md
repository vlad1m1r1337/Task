##### Frontend task

1) Данное приложение написано на React + Typescript, в качестве шаблона был использован Create React App

2) Таблица содержит 5 полей

3) При загрузки данных используется Infinite Loader

4) Использовал в качестве стейт-менеджера Redux Toolkit, для ассинхронного Redux использовался createAsyncThunk

5) Были реализованы: валидация полей, соответствующий стейт кнопки, обработка ошибки от бэкенда

6) Форма отправляется по api. Запись добавляется в таблицу

7) Присутствует анимация загрузки

8) Код расположен в github. C github actions не знаком

9) Dockerfile приложен

10) Написаны тесты покрывающие сетевые запросы и асинхронные операции.

11) В качестве UI библиотеки был использован PrimeReact

Прилагаю ниже полезные команды для запуска приложения

### Available Scripts

# CRA scripts

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# my script scripts

## `npm run dev`

Запускает frontend и backend(сделанный с помощью сервиса json-placeholder) одновременно в одном терминале

### Docker

## `docker build -t app .`

Сборка

## `docker run -p 3000:3000 -p 3001:3001 app`

Запуск

