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



## day1

1. express 기본 세팅
2. nCloud 에 서버 생성하기
3. 데이터 베이스 설계


## day2

1. mvc 패턴 적용하여 서버 구조 세팅
2. 회원가입, login, logout 구현
3. session 이용하여 login 검증


## day3

1. card, board 관련 api 작성.
2. board 추가, 삭제 미들웨어 작성
3. board card 생성하기 
4. board 에 card 추가하기(맨앞, 사이, 맨끝)
5. 임의로 값 생성후 구현라우터 테스트

## day4

1. logs middleware 작성
2. 데이터 유효성 판단 util 폴더 작성.
3. validate 미들웨어 연결 및 테스트 
4. api 동작 테스트 
5. pm2 cluster 사용해서 멀티코어로 돌아가도록 설정
6. redis 이용하여 session 디비에 저장. 세션 공유 안되는 문제 해결 


## day5

#### user api 추가 및 front  util 파일 작성
1. util폴더에  dom 생성 함수작성
2. user 정보 요청하는 api 추가

## day6

#### Intro page, Todo Page 구현

1. 초기접속시 로그인 페이지 렌더링.
2. 로그인시 회원의 카드 정보 Todo Page에 렌더링
3. 로그인 회원가입 페이지구현 및 라우팅.
4. 로그인, 회원가입 페이지 구현, # anchor 를 이용하여 routing

## day7

#### toDo 페이지 카드 생성 버튼 구현
1. 컬럼헤더의 + 버튼 클릭시 새로운 카드 입력란 생성

#### toDo 페이지 카드 생성 버튼 구현
2. 컬럼헤더의 + 버튼 클릭시 새로운 카드 입력란 생성



## todo front (day7 ~ 9)

|type |event |
|-----|------|
|TODO  | 카드추가영역 추가 삭제.  |
|TODO  | 카드 추가시 새로운카드 생성. |
|TODO  |  삭제시 카드 추가 영역 삭제.  |
|TODO  |  카드 제목 더블 클릭시 모달 등장, 변경내용 다시그리기. |
|TODO  | 칼럼추가 삭제 이벤트 |
|CARD  | 카드 삭제버튼, 삭제확인 팝업존재 다시카드그리기. |
|CARD  | 카드 더블클릭, 모달등장, 카드수정, 수정후 카드다시 그리기, 종료시 변화 x |
|CARD  |드래그앤드롭 이벤트   |
|LOG   |  모달창에 로그 보여주기  |


## day10

1. 코드리펙토링, 클래스 분리, 배포
