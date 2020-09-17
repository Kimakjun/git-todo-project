const pool = require('../database/poll');

const Log = {};

// `id` int(11) NOT NULL AUTO_INCREMENT,
// `user_id` int(11) NOT NULL,
// `action` varchar(255) NOT NULL,
// `from` varchar(255),
// `to` varchar(255),
// `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
// PRIMARY KEY(`id`)

Log.create = async({userId, content, action, from, to}) => {
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
        console.log(rows);
        return rows;
    }catch(err){
        throw new Error(err);
    }
}


module.exports = Log;