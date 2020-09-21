const express = require('express');
const {getLog} = require('../controllers/logs');
const router = express.Router();

router.get('/', getLog);


module.exports = router;