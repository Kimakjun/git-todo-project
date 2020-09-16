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
router.get('/test', isLoggedIn, (req, res, next)=>{
       res.json({success: "true"})
});

module.exports = router;
