// const express = require('express');
// const { isLoggedIn } = require('../controllers/auth');
// const { getBoard } = require('../controllers/board');
// const router = express.Router();

// // GET /BOARD   RESPONSE {STATUS, MESSAGE, DATA}
// // DATA board: {title, count, card{}[]}[] 
// router.get('/', isLoggedIn, getBoard);

// // POST /BOARD RESPONSE {STATUS, MESSAGE, DATA}
// router.post('/', isLoggedIn, postBoard);

// // POST /BOARD/5/CARDS
// router.post('/:id/card', isLoggedIn, postCard);

// // PATCH /BOARD/5 REQ PARAMFS.BOARDID  
// router.patch('/:id/title', isLoggedIn, updateBoard);
// router.patch('/:id/count', isLoggedIn, updateBoard);

// // DELETE /BOARD/1 REQ PARAMS.BOARDID 
// router.delete('/:id', isLoggedIn, deleteBoard);

// // 카드이동 PATCH/2/CARD REQ
// router.patch('/:id/card', isLoggedIn, moveCard);

// module.exports = router;