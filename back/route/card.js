const express = require('express');
const {updateCard,
       deleteCard} = require('../controllers/card');
const router = express.Router();

// 카드 삭제 =>
router.delete('/:id', deleteCard);
router.put('/:id/content', updateCard);





module.exports = router;