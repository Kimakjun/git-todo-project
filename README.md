# javascript-w3-todo
스프린트 3-4주차 웹 프로젝트 - 할일관리

### [TODO SERVICE LINK](http://115.85.183.220/) 

### Getting Start 
    mysql -u root -p < mysql/seed.sql
    
    cd javascript-w3-todo\back
    npm i
    
    cd javascript-w3-todo\front
    npm i
    npm run build
    
    cd javascript-w3-todo\back
    npm run dev

    .env => javascript-w3-todo/back/.env.example 


## 폴더 구조

```
``
📦 front
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┣ 📂public
 ┃ ┣ 📂pages
 ┃ ┣ 📂util
 ┃ ┣ 📜App.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.html
 ┣ 📜pakage.json
 ┣ 📜webpack.config.js

📦back
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┣ 📂model
 ┃ ┃ ┣ 📂database
 ┃ ┃ ┣ 📂public
 ┃ ┃ ┣ 📂route
 ┃ ┃ ┣ 📂util
 ┃ ┃ ┣ 📜app.js
 ┃ ┣ 📜package.json

📦mysql
 ┃ ┣ 📜seed.sql

```


## 주요 기능

- 사용자 활동 기록 로그 구현

    ![](https://i.imgur.com/1RSqNQU.png)



- 할일 등록 기능, 카드 등록 기능

    ![](https://i.imgur.com/T4prlfI.png)
    ![](https://i.imgur.com/77HMc62.png)


- 드래그앤 드랍 기능

    ![](https://i.imgur.com/Z3eKaFG.png)


