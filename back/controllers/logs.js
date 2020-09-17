const Log = require('../model/logs');
const createError = require('http-errors');

exports.getLog = async(req, res, next) => {

    try{        
        const userId = req.user.id;
        const logs = await Log.getLogsById({userId});
        res.status(200).json({success: true, message: 'send logos ', data: {logs}});
    }catch(err){
        next(createError(500, 'server error'));
    }
};


exports.postLog = async(req, res, next)=>{
    try{
        console.log('testtete');
        const logInfo = req.logInfo;
        console.log(logInfo);
        await Log.create({...logInfo});
        res.status(200).json({success: true, message: 'log is updated'});
    }catch(err){
        console.error(err);
        next(createError(500, 'server error'));
    }
};

