const Card = require('../model/card');
const Board = require('../model/board');
const createError = require('http-errors');
exports.getBoard = async (req, res, next) => {

    // 페이지 초기에 사용자가 요청하는 정보.
    // responseDate const res = board:{...data, card{}[] }[]
    // req.user.id 인 board   
    try{
        const boards = await Board.getBoard({userId: req.user.id});
        const resData =  await Promise.all(boards.map(async(board)=>{
             const {id, user_id} = board;
             const [cards, field] = await Card.getCards(user_id, id);
             return {...board, cards};
        }))
        // 초기 페이지 작성 데이터 전송.
        res.status(200).json({success: true, message: 'send all info', data: {resData}});
    }catch(err){
        next(createError(500, 'server error'));
    }

};


exports.postBoard = async(req, res, next) => {

    const {title} = req.body;
    try{
        await Board.create({userId: req.user.id,type: 'new', title: title});
        res.status(200).json({success: true, message: 'board is created'});
    }catch(err){
        next(createError(500, 'server error'));
    }

}


exports.updateBoardTitle = async (req, res, next)=> {
    const id = req.params.id;
    const {title} = req.body;
    try{
        await Board.updateTitleById({title, id});
        res.status(200).json({success: true, message: 'update success'});
    }catch(err){
        next(createError(500, 'server error'));
    }

}


exports.deleteBoard = async (req, res, next) => {

    const boardId = req.params.id;
    try{
        await Board.deleteById({id: boardId});
        res.status(200).json({success: true, message: 'board is deleted'});
    }catch(err){
        next(createError(500, 'server error'));
    }

}


exports.postCard = async (req, res, next) => {
    
    const boardId = req.params.id;
    const {content, boardTitle} = req.body;
    
    // 만약 board 의 첫번째 card 라면 라면 ? 
    // position 값 1로 설정.
    try{
        const [cards, fileds] = await Card.getCards(req.user.id, boardId);
        const INITPOSITION = 1;
        if(cards.length === 0){
            await Card.create({userId: req.user.id, boardId: boardId, content: content, position: INITPOSITION});            
        }
        if(cards.length !== 0){
            const firstPosition = cards[0].position;
            const MAKEHALF = 2;
            await Card.create({userId: req.user.id, boardId: boardId, content: content, position: (firstPosition / MAKEHALF)});
        } 
        await Board.updateCountById({count: 1, id: boardId})
        req.logInfo = {userId: req.user.id, content: content, action: 'added', from: '', to: boardTitle};
        next();
    }catch(err){
        console.error(err);
        next(createError(500, 'server error'));
    }
    // res.status(200).json({success: true, message: 'card id created'});
    // res.status(200).json({success: true, message: 'card id created'});
    // 첫번째 카드가 아니라면 ?
    // board 에 포함된 첫번째 position 값 / 2  
}


// TODO : 중복되는 코드 리펙토링하기.
exports.moveCard = async(req, res, next)=> {

    const [INITPOSITION, MAKEHALF, ADDONE] = [1, 2, 3]; 
    const {preCardId, cardId, nextCardId, preBoardId, content, preBoardTitle, boardTitle} = req.body;
    const boardId = req.params.id;
    // 카드가 아무것도 없는 곳으로 이동하는경우 => position 설정
    try{  
        const cards = await Card.getCards(req.user.id, boardId);
        if(cards.length === 0){
            await Card.updatePosition({id: cardId, boardId: boardId, position: INITPOSITION});
        }
        // 사이로 이동하는경우.
        if(preCardId && nextCardId){
            const preCard = await Card.getCardById({cardId: preCardId});
            const nextCard = await Card.getCardById({cardId: nextCardId});
            const newPosition = (preCard.position + nextCard.position) / MAKEHALF; 
            await Card.updatePosition({id: cardId, boardId: boardId, position: newPosition});
        }
        // 맨앞으로 이동하는경우
        if(!preCardId && nextCardId){
            const nextCard = await Card.getCardById({cardId: nextCardId});
            const newPosition = nextCard.position / MAKEHALF; 
            await Card.updatePosition({id: cardId, boardId: boardId, position: newPosition});
        }
        // 맨뒤로 이동하는경우
        if(preCardId && !nextCardId){
            const preCard = await Card.getCardById({cardId: preCardId});
            const newPosition = preCard.position + ADDONE; 
            await Card.updatePosition({id: cardId, boardId: boardId, position: newPosition});
        }
        
        // board count 수정.
        await Board.updateCountById({count: -1, id: preBoardId});
        await Board.updateCountById({count: 1, id: boardId})

        req.logInfo = {userId: req.user.id, content: content, action: 'moved', from: preBoardTitle, to: boardTitle};
        next();
        // return res.status(200).json({success: true, message: 'card moved !'});
        
    }catch(err){
        console.error(err);
        next(err);
    }
  
};