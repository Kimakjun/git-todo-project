const express = require('express');
const {getUserId} = require('../controllers/user');
const router = express.Router();

router.get('/', getUserId);


module.exports = router;