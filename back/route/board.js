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
router.get('/', getBoard);
router.post('/', postBoard);
router.post('/:id/card', postCard); 
router.delete('/:id', deleteBoard);
router.patch('/:id/title', updateBoardTitle);
router.patch('/:id/card', moveCard);

module.exports = router;