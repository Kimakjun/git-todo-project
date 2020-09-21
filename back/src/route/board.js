const express = require('express');
const { getBoard, 
        postBoard,
        postCard,
        deleteBoard,
        moveCard,
        updateBoardTitle,
        validateInputs
        } = require('../controllers/board');
const {postLog} = require('../controllers/logs');
const router = express.Router();

// // GET /BOARD   RESPONSE {STATUS, MESSAGE, DATA}
// // DATA board: {title, count, card{}[]}[] 
// TODO: api 설계 문서로 남기기.
router.get('/', getBoard);
router.post('/',validateInputs({type : "title"}), postBoard);
router.post('/:id/card',validateInputs({type : "content"}), postCard, postLog); 
router.delete('/:id', deleteBoard);
router.patch('/:id/title',validateInputs({type : "title"}), updateBoardTitle);
router.patch('/:id/card', moveCard, postLog);

module.exports = router;