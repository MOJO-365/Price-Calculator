const mongoose = require("mongoose");
const { Schema } = mongoose;



const PossibleAnswerSchema = new Schema(
  {
    answerValue: {
      type: Schema.Types.Mixed, // This can be boolean, integer range or string depending on the type of question
      required: true,
    },
    cost: {
      type: Number,
      required: false,
      default: 0,
    },
    isQuantifyable: {
      type: Boolean,
      required: false,
      default: false,
    },
    message: {
      type: String
    },
  },
  { _id: false }
);


const QuestionSchema = new Schema(
  {
    
    questionText: {
      type: String,
      required: true,
    },
    questionType: {
      type: String,
      required: true,
      enum: ["boolean", "number", "range", "string"],
    },

    noOfPossibleAnswers: {
      type: Number,
      require: true,
    },
    possibleAnswers: [
      PossibleAnswerSchema, 
    ]
  },
  { timestamps: true }
);

const Question = mongoose.model("questions", QuestionSchema);
module.exports = Question;

