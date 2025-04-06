const { answerModel } = require("../models/answerModel");
const questionModel = require("../models/questionModel");


module.exports.createAnswer  = async(req,res)=>{
    try{
         const{body} = req.body;
         const { questionId } = req.params;
         if(!body) return res.status(400).json({message:'Answer body is required'})
        const question = await questionModel.findById(questionId);
        if(!question) return res.status(404).json({message:'Question not found'})
        const answer = await answerModel.create({body, questionId , authorId : req.user.id});
     res.status(200).json({message:'Answer created successfully', answer})


    }catch(err){
        res.status(400).json({message:err.message})
    }

}


module.exports.UpdateAnswer = async (req, res) => {
    try {
        const {  body, } = req.body;
        const answerId = req.params.id;

        // Find question
        const answer = await answerModel.findById(answerId);
        if (!answer) {
            return res.status(404).json({ message: 'NOt Updated successfully' });
        }

        // Check if logged-in user is the author
        if (answer.authorId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only update your own question' });
        }

        // Update answer fields
    
        answer.body = body || answer.body;

        await answer.save();
        res.json({ message: 'Question updated successfully', answer });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};