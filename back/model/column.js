const pool = require('../database/poll');

const Column = {};
const initColumnTitles = ['해야할일', '하는중', '다했어'];

Column.create = async ({userId, type, title})=>{
    try{
        // type 0 이면 초기 컬럼 세팅.
        // type 1 이면 column 추가
        if(type === 'init'){
            const result = await pool.query('SELECT * FROM colunm');
            console.log(result);
            //await pool.query('INSERT INTO column (user_id, title) VALUES(?, ?)', [7, "test"]);        
            return;
        }
        // const user = await poll.query('INSERT INTO user (email, password, nick) VALUES(?, ?, ?)',
        // [email, password, nick]);

    }catch(err){
        console.error(err);
    }
}


module.exports = Column;