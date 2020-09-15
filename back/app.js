const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const sessionOption = require('./config/session');
require('dotenv').config();

const rootRouter = require('./route');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.set('port', process.env.PORT || 8001);
app.use(session(sessionOption));

// 현재 v1 의 api 개발중..추후 v2 변경 할 수 도있음.
app.use('/api/v1/', rootRouter);


// TODO: ERROR 처리 라우터


app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 대기중`)
})


