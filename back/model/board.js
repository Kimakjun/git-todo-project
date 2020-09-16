const { query } = require('../database/poll');
const pool = require('../database/poll');

const Board = {};
const initColumnTitles = ['해야할일', '하는중', '다했어'];


Board.getBoard = async({userId})=>{
    try{
        const [rows, field] = await pool.query('select * from board where user_id = ? ', [userId]);
        return rows;
    }catch(err){
        console.error(err);
    }
}

Board.getBoardById = async({userId, boardId})=>{
    try{
        const [rows, field] = await pool.query(`select * from board where user_id = ? and id = ?`,[userId, boardId]);
        return rows;
    }catch(err){
        console.error(err);
    }
}

Board.create = async({userId, type, title})=>{
    try{
        // type 0 이면 초기 컬럼 세팅.
        // type 1 이면 column 추가
        const query = 'INSERT INTO board (user_id, title) VALUES(?, ?)';
        if(type === 'init'){
            // TODO: 고차함수로 실행.
            await pool.query(query, [userId, "해야할일"]);
            await pool.query(query, [userId, "하는중"]);
            await pool.query(query, [userId, "다했어"]);        
            return;
        }
        await pool.query(query, [userId, title]);
    }catch(err){
        console.error(err);
    }
}

Board.deleteById = async({id})=>{
    try{
        await pool.query('delete from board where id = ?', [id]);
    }catch(err){
        console.error(err);
    }
}


module.exports = Board;