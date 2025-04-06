const express = require('express');
const {
  addAnswer,
  updateAnswer,
  deleteAnswer,
  voteAnswer,
  upvoteAnswer,
  downvoteAnswer,
} = require('../controllers/answerController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:questionId', protect, addAnswer);
router.put('/:answerId', protect, updateAnswer);
router.delete('/:answerId', protect, deleteAnswer);
router.post('/:answerId/vote', protect, voteAnswer);

router.post('/:id/upvote', protect, upvoteAnswer);
router.post('/:id/downvote', protect, downvoteAnswer);


module.exports = router;
