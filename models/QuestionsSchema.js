const mongoose = require("mongoose");
const { Schema } = mongoose;



const PossibleAnswerSchema = new Schema(
  {
    answerValue: {
      type: Schema.Types.Mixed, // This can be boolean, integer, or range depending on the type of question
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);







const QuestionSchema = new Schema(
  {
    // _id: {
    //   type: Schema.Types.ObjectId,
    //   alias: "questionId", // Rename _id to questionId
    // },
    questionText: {
      type: String,
      required: true,
    },
    questionType: {
      type: String,
      required: true,
      enum: ["boolean", "integer", "range"],
    },

    noOfPossibleAnswers: {
      type: Number,
      require: true,
    },
    possibleAnswers: [
      PossibleAnswerSchema, 
    ],
  },
  { timestamps: true }
);

const Question = mongoose.model("questions", QuestionSchema);
module.exports = Question;

