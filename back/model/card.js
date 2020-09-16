const pool = require('../database/poll');

const Card = {};


Card.create = async({userId, boardId, content, position})=> {
    try{
        const result = await pool.query('insert into card (user_id, column_id, content, position) values (?, ?, ?, ?)',
            [userId, boardId, content, position]);

        return result;        
    }catch(err){
        console.error(err);
    }
}


Card.getCards = async(userId, boardId)=>{
    try{
        const result =  await pool.query('select * from card where user_id = ? and column_id = ? order by position', [userId, boardId]);
        return result;
    }catch(err){
        console.error(err);
    }
}

Card.deleteCard = async(id)=> {
    try{
        await pool.query('delete from card where id = ?', [id]);
    }catch(err){
        console.error(err);
    }
}

Card.updateCard = async({id, content})=> {
    try{
        await pool.query('update card set content = ? where id = ?', [content, id]);
    }catch(err){
        console.error(err);
    }

}

Card.updatePosition = async({id, boardId,position})=>{
    try{
        await pool.query('update card set position = ?, column_id = ? where id = ?', [position, boardId, id]);
    }catch(err){
        console.error(err);
    }
}

Card.getCardById = async({cardId})=>{
    try{
        const [row, field] = await pool.query('select * from card where id = ?', [cardId]);
        return row[0];
    }catch(err){
        console.error(err);
    }
}

module.exports = Card;