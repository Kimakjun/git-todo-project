const pool = require('../database/poll');

const Card = {};

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

module.exports = Card;