const Board = require('../model/board');
const Card = require('../model/card');
const createError = require('http-errors');

exports.updateCard = async (req, res, next)=> {
    try{
        // 카드 수정했을경우.
        const {content} = req.body 
        const id = req.params.id;
        await Card.updateCard({id, content});
        req.logInfo = {userId: req.user.id, content: content, action: 'updated', from: '', to: ''};
        next();
        // res.status(200).json({success : true, message : 'card title updated'});    
    }catch(err){
        next(createError(500, 'server error'));
    }

}
// {userId, content, action, from, to}
exports.deleteCard = async (req, res, next)=> {
    try{
        const {boardId, content, boardTitle} = req.body;
        const id = req.params.id;
        await Card.deleteCard(id);    //카드삭제
        await Board.updateCountById({count: -1, id : boardId}) //board Count update.
        req.logInfo = {userId: req.user.id, content: content, action: 'deleted', from: boardTitle, to: ''};
        next();
        // res.status(200).json({success : true, message : 'card deleted'});
    }catch(err){
        next(createError(500, 'server error'));
    }


}