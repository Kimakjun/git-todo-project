const express = require('express');

const app = express();
const PORT = 8000;


app.listen(PORT, () => {
    console.log(`${PORT}번 포트에서 대기중`)
})


