const mongoose = require("mongoose");
const { Schema } = mongoose;

const FlowSchema = new Schema(
  {
    flowName: {
      type: String,
      required: true,
    },
    currQuestionId: {
      type: String,
      required: true
    },
    answerValue: {
      type: Schema.Types.Mixed,
      required: true,
    },
    nextQuestionId: {
      type: String,
      default: null
    },
    isRoot: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Flow = mongoose.model("flows", FlowSchema);

module.exports = Flow;
