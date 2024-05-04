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
    possibleAnswers: {
      type: [PossibleAnswerSchema],

      validate: {
        validator: function (arr) {
          
          const answerValuesSet = new Set();
          for (const possibleAnswer of arr) {
            const { answerValue } = possibleAnswer;
            
            if (answerValuesSet.has(answerValue)) {
              return false; 
            }
            answerValuesSet.add(answerValue); 
          }
          return true; 
        },
        message: 'Each `answerValue` in `possibleAnswers` must be unique.'
      }
    }
  },
  { timestamps: true }
);

const Question = mongoose.model("questions", QuestionSchema);
module.exports = Question;

