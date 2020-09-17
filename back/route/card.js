const express = require('express');
const {updateCard,
       deleteCard} = require('../controllers/card');
const {postLog} = require('../controllers/logs');
const router = express.Router();

// 카드 삭제 =>
router.delete('/:id', deleteCard, postLog);
router.put('/:id/content', updateCard, postLog);





module.exports = router;