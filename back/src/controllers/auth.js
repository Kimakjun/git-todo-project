const User = require('../model/user');
const Board = require('../model/board');
const createError = require('http-errors');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
    try{
        const {email, password, nick} = req.body;
        const checkUser = await User.findByEmail(email); 
        if(checkUser[0]) return next(createError(400, 'already Existed'));
        
        const hash = await bcrypt.hash(password, 12);
        newUser = await User.create({ email, password: hash, nick});
        await Board.create({userId: newUser.insertId, type: "init"});
        
        res.status(200).json({message: 'login success'});
    }catch(err){
        console.error(err);
        next(createError(500, 'server Error'));
    }
      
}

exports.login = async(req, res, next) => {

    const {email, password} = req.body;
    console.log('test');
    try{
        const checkUser = await User.findByEmail(email);
        if(!checkUser[0]) return next(createError(400, 'none exist'));
        
        const result = await bcrypt.compare(password, checkUser[0].password);
        console.log(result);
        if(!result) return next(createError(400, 'password incorrect'));
    
        // session 설정.
        req.session.userId = checkUser[0].id;
        res.status(200).json({message: 'login success'});
    }catch(err){
        next(createError(500, 'server Error'));
    }

};


exports.logout = (req, res, next) => {

    req.session = null;
    res.clearCookie('sid').status(200).json({message: 'logout success'}); // fix : cookie 안지워지는 문제있음.

};

exports.routing = (req, res, next) => {

    // TODO : front 작업시 필요하면 작성.

}

exports.isLoggedIn = async(req, res, next) => {
    // login 된 사용자면 user 정보 복구해서 next;
    if(!req.session.userId) return next(createError(400, 'require login'));
    const result = await User.findById(req.session.userId);
    req.user = result[0];
    next();

}

exports.isNotLoggedIn = (req, res, next) => {

    if(!req.session.userId) return next();
    return next(createError(404, 'require logout'));

}
