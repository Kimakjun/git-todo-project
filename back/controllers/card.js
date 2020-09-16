const Card = require('../model/card');


exports.updateCard = async (req, res, next)=> {
    try{
        // 카드 수정했을경우.
        const {content} = req.body 
        const id = req.params.id;
        await Card.updateCard({id, content});
        res.status(200).json({success : true, message : 'card title updated'});

    }catch(err){
        console.error(err);
        next(err);
    }

}

exports.deleteCard = async (req, res, next)=> {
    try{
        const id = req.params.id;
        await Card.deleteCard(id); 
        res.status(200).json({success : true, message : 'card deleted'});
    }catch(err){
        console.error(err);
        next(err);
    }


}