const express = require('express');
const { isLoggedIn } = require('../controllers/auth');
const { getBoard, 
        postBoard,
        postCard,
        deleteBoard,
        moveCard,
        updateBoardTitle
        } = require('../controllers/board');
const router = express.Router();

// // GET /BOARD   RESPONSE {STATUS, MESSAGE, DATA}
// // DATA board: {title, count, card{}[]}[] 
// TODO: api 설계 문서로 남기기.
router.get('/', isLoggedIn, getBoard);
router.post('/', isLoggedIn, postBoard);
router.post('/:id/card', isLoggedIn, postCard); 
router.patch('/:id/title', isLoggedIn, updateBoardTitle);
router.delete('/:id', isLoggedIn, deleteBoard);
router.patch('/:id/card', isLoggedIn, moveCard);

module.exports = router;