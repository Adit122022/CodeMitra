const mongoose = require('mongoose');

const answerSchema  = new mongoose.Schema({
    body: { type: String, required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
})
 module.exports.answerModel = new mongoose.model('Answer', answerSchema);