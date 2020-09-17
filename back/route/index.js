const express = require('express');
const authRouter = require('./auth');
const boardRouter = require('./board');
const cardRouter = require('./card');
const { isLoggedIn } = require('../controllers/auth');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/board',isLoggedIn, boardRouter);
router.use('/card',isLoggedIn, cardRouter);

module.exports = router;