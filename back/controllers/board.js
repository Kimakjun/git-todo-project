const Card = require('../model/card');
const Board = require('../model/board');

exports.getBoard = async (req, res, next) => {

    // 페이지 초기에 사용자가 요청하는 정보.
    // responseDate const res = board:{...data, card{}[] }[]
    



};

exports.deleteBoard = async (req, res, next) => {
    
    const boardId = req.params.id;
    try{
        await Board.deleteById({id: boardId});
        res.status(200).json({success: true, message: 'board is deleted'});
    }catch(err){
        console.error(err);
        next(err);
    }

}


exports.postCard = async (req, res, next) => {
    
    const boardId = req.params.id;
    const {content} = req.body;

    // 만약 board 의 첫번째 card 라면 라면 ? 
    // position 값 1로 설정.
    const [cards, fileds] = await Card.getCards(req.user.id, boardId);
    const INITPOSITION = 1;
    if(cards.length === 0){
        await Card.create({userId: req.user.id, boardId: boardId, content: content, position: INITPOSITION});
        res.status(200).json({success: true, message: 'card id created'});
    }

    const firstPosition = cards[0].position;
    const MAKEHALF = 2;
    await Card.create({userId: req.user.id, boardId: boardId, content: content, position: (firstPosition / MAKEHALF)});

    res.status(200).json({success: true, message: 'card id created'});
    // 첫번째 카드가 아니라면 ?
    // board 에 포함된 첫번째 position 값 / 2  

}
