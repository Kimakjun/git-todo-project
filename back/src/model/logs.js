const pool = require('../database/poll');

const Log = {};

Log.create = async({userId, content, action, from, to}) => {
    console.log(content);
    try{
        await pool.query('insert into logs (user_id, action, content, pre, next) values (?, ?, ?, ?, ?)', 
        [userId, action, content, from, to]);
    }catch(err){
        console.error(err);
        throw new Error(err);
    }
}

Log.getLogsById = async({userId}) => {
    try{
        const [rows, field] = await pool.query('select * from logs where user_id = ? order by create_time',[userId]);
        return rows;
    }catch(err){
        throw new Error(err);
    }
}


module.exports = Log;