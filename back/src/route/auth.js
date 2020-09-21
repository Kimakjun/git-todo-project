const express = require('express');
const {register, 
       login, 
       logout, 
       isLoggedIn,
       isNotLoggedIn,
       } = require('../controllers/auth');
const {validateInputs} = require('../controllers/board')
const router = express.Router();

router.post('/register', isNotLoggedIn, validateInputs({type : "register"}), register);
router.post('/login', isNotLoggedIn, validateInputs({type : "login"}), login);
router.get('/logout', isLoggedIn, logout);


module.exports = router;
