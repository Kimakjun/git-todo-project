const mysql = require('mysql2/promise');

// 참고
// http://blog.naver.com/PostView.nhn?blogId=pjt3591oo&logNo=221505148267&parentCategoryNo=&categoryNo=55&viewDate=&isShowPopularPosts=false&from=postView

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'todolist',
    connectionLimit: 4
})

// transaction, rollback, 등 이용하기위해 사용
// await pool.getConnection(async conn => conn);

module.exports = pool;