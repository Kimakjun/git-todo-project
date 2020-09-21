const poll = require('../database/poll');

const User = {};

User.findByEmail = async (email) => {
    try{
        const data = await poll.query('select * from user where email = ?', [email]);
        return data[0];
    }catch(err){
        console.error(err);
    }
}


User.findById = async (id) => {
    try{
        const data = await poll.query('select * from user where id = ?', [id]);
        return data[0];
    }catch(err){
        console.error(err);
    }
}


User.create = async ({email, password, nick})=> {
    try{
        const user = await poll.query('INSERT INTO user (email, password, nick) VALUES(?, ?, ?)',
        [email, password, nick]);
        return user[0];
    }catch(err){
        console.log(err);
    }

}


module.exports = User;
