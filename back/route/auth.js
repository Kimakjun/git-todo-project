const express = require('express');
const {register, 
       login, 
       logout, 
       isLoggedIn,
       isNotLoggedIn,
       routing} = require('../controllers/auth');
const router = express.Router();

router.post('/register', isNotLoggedIn, register);
router.post('/login', isNotLoggedIn, login);
router.get('/logout', isLoggedIn, logout);


module.exports = router;
