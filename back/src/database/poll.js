const mysql = require('mysql2/promise');
require('dotenv').config();
// 참고
// http://blog.naver.com/PostView.nhn?blogId=pjt3591oo&logNo=221505148267&parentCategoryNo=&categoryNo=55&viewDate=&isShowPopularPosts=false&from=postView

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 4
})

// transaction, rollback, 등 이용하기위해 사용
// await pool.getConnection(async conn => conn);

module.exports = pool;