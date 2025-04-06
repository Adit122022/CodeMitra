const answerModel = require('../models/answerModel');
const questionModel = require('../models/questionModel');

exports.addAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { content } = req.body;

    const answer = await answerModel.create({
      questionId,
      content,
      authorId: req.user._id,
    });
    await questionModel.findByIdAndUpdate(
        questionId,
        { $push: { answers: answer._id } },
        { new: true }
      );
 
    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { content } = req.body;

    const answer = await answerModel.findById(answerId);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    if (!answer.authorId.equals(req.user._id))
      return res.status(403).json({ message: 'Unauthorized' });

    answer.content = content;
    await answer.save();
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;

    const answer = await answerModel.findById(answerId);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    if (!answer.authorId.equals(req.user._id))
      return res.status(403).json({ message: 'Unauthorized' });

    await answer.deleteOne();
    res.status(200).json({ message: 'Answer deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.voteAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { voteType } = req.body; // "up" or "down"

    const answer = await answerModel.findById(answerId);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    answer.votes += voteType === 'up' ? 1 : -1;
    await answer.save();

    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.upvoteAnswer = async function (req, res) {
  try {
    const answer = await answerModel.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    answer.votes = (answer.votes || 0) + 1;
    await answer.save();

    res.json({ message: 'Upvoted', votes: answer.votes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.downvoteAnswer = async function (req, res) {
  try {
    const answer = await answerModel.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    answer.votes = (answer.votes || 0) - 1;
    await answer.save();

    res.json({ message: 'Downvoted', votes: answer.votes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
