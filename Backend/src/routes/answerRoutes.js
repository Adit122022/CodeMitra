 const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { createAnswer, UpdateAnswer } = require('../controllers/answerController');
 const route = express.Router();

route.post('/:questionId' , protect ,createAnswer )
route.put('/:answerId' , protect ,UpdateAnswer )

 module.exports = route