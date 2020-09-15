const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const sessionOption = require('./config/session');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.set('port', process.env.PORT || 8001);
app.use(session(sessionOption));


app.get('/', (req, res, next)=> {
    res.json('welcome');
})



// TODO: ERROR 처리 라우터

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 대기중`)
})


