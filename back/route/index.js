const express = require('express');
const authRouter = require('./auth');
const boardRouter = require('./board');
const cardRouter = require('./card');

const router = express.Router();

router.use('/auth', authRouter);
//router.use('/board', boardRouter);
router.use('/card', cardRouter);

module.exports = router;