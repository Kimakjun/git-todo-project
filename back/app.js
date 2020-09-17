const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const hpp = require('hpp');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const sessionOption = require('./config/session');
require('dotenv').config();

const rootRouter = require('./route');


const app = express();

app.set('port', process.env.PORT || 8001);

if(process.env.NODE_ENV === 'production'){
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
}else{
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({  
    key: 'sid',
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
    },
    store: new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        pass: process.env.REDIS_PASSWORD,
        logErrors: true,
    })
}));

// 현재 v1 의 api 개발중..추후 v2 변경 할 수 도있음.
app.use('/api/v1/', rootRouter);


// TODO: ERROR 처리 라우터

app.use((req, res, next) => {
    next(createError(404, 'page not found!'));
  });

app.use((err, req, res, next) => {
    const {status = 500, message = 'server error'} = err;
    res.status(status).send({message});
});



app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 대기중`)
})


