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


## Event Delegation

- 이벤트 위임을 활용한 이벤트 등록
- 할일 카드를 생성 삭제 할때마다 이벤트를 생성 삭제 하는 것은 메모리 측면에 서비효율적
- 상위 컴포넌트에서 이벤트를 등록하고 하위컴포넌트에서 분기 처리하여 매번 이벤트를 등록 하지 않도록 구현
```
        this.el.addEventListener('click', (e)=>{
            const curTargetId = e.target.id.replace(/[a-zA-Z]+/,'');
            const $targetBoard = $el(`#board${curTargetId}`, this.el);
            switch(e.target.className){
                case 'todoHeaderPlus':
                    this.addFormCard($targetBoard, curTargetId);
                    break;
                case 'todoHeaderDelete':
                    this.deleteBoard(curTargetId);
                    break;
                case 'cardCancleButton':
                    this.deleteFormCard($targetBoard, curTargetId);
                    break;
            } 
        });
```
      



## 주요 기능

- 사용자 활동 기록 로그 구현

    ![](https://i.imgur.com/1RSqNQU.png)



- 할일 등록 기능, 카드 등록 기능

    ![](https://i.imgur.com/T4prlfI.png)
    ![](https://i.imgur.com/77HMc62.png)


- 드래그앤 드랍 기능

    ![](https://i.imgur.com/Z3eKaFG.png)


