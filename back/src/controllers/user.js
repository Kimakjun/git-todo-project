const User = require('../model/user');


exports.getUserId = async(req, res, next)=>{
    if(req.session.userId){
        const user = await User.findById(req.session.userId);
        return res.status(200).json({message: 'success', user: user[0]});
    }else{
        return res.status(200).json({message: 'success', user: {}});
    }
    
}