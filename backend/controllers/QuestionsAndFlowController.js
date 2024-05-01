const Question = require("../models/QuestionsSchema");
const FlowSchema = require("../models/FlowSchema");

const createQuestion = async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const createdQuestion = await newQuestion.save();
    res.status(200);
    res.json({
      message: "success",
      data: createdQuestion,
    });
  } catch (error) {
    console.log("Error while creating question: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200);
    res.json({
      message: "success",
      data: questions,
    });
  } catch (error) {
    console.log("Error while fetching all questions: ", error.message);
    res.status(500).json({
      error: error.message,
      message: "failure",
    });
  }
};


const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      res.status(404).json({
        error: "Question not found",
        message: "failure",
      });
    } else {
      res.status(200);
      res.json({
        message: "success",
        data: question,
      });
    }
  } catch (error) {
    console.log("Error while fetching question by id: ", error.message);
    res.status(500).json({
      error: error.message,
      message: "failure",
    });
  }
};


const updateQuestion = async (req, res) => {
  try {
    const questionData = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      questionData,
      { new: true }
    );
    if (!updatedQuestion) {
      res.status(404).json({
        error: "Question not found",
        message: "failure",
      });
    } else {
      res.status(200);
      res.json({
        message: "success",
        data: updatedQuestion,
      });
    }
  } catch (error) {
    console.log("Error while updating question by id: ", error.message);
    res.status(500).json({
      error: error.message,
      message: "failure",
    });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      res.status(404).json({
        error: "Question not found",
        message: "failure",
      });
    } else {
      res.status(200);
      res.json({
        message: "success",
        data: deleteQuestion,
      });
    }
  } catch (error) {
    console.log("Error while deleting question by id: ", error.message);
    res.status(500).json({
      error: error.message,
      message: "failure",
    });
  }
};

const createFlow = async (req, res) => {
  
  try {
    const listOfFlow = req.body.listOfFlow;
    for (const flow of listOfFlow) {
      
      const flowNode = new FlowSchema(flow);
      
      await flowNode.save();
    }

    res.status(200).json({
      message: "success",
      data: listOfFlow
    });
  }
  catch (error) {
    
    console.log("Errro occurred while creating flow: ", error.message)
    res.status(500)
    res.json({
      message: "failure",
      data:""+error.message
    })
  }
}

const getAllFlowRecordsByFlowName = async (req, res) => {
  try {
    const flowName = req.params.flowName;
    console.log("FLOW NAME: " + flowName);
    const flows = await FlowSchema.find({ flowName });

    if (!flows) {
      console.log("No such flow exists")
      res.status(404)
      res.json({
        message: "failure",
        data:"No such flowName exists"
      })
    }
    else {
      
      res.status(200)
      res.json({
        message: "success",
        data: flows
      })
    }
  }
  catch (error) {
    console.log("Errro occurred while fetching flow: ", error.message);
    res.status(500);
    res.json({
      message: "failure",
      data: "" + error.message,
    });
  }
}

const getRootOfFlowByFlowName = async (req, res) => {
  try {
    const flowName = req.params.flowName;
    console.log("FLOW NAME: " + flowName);

    const rootOfFlow = await FlowSchema.find({ flowName, isRoot: true });

        if (rootOfFlow) {
            
          res.status(200).json({
            message: "success",
              data: rootOfFlow
            });
        } else {
           
          res.status(404).json({
            message: "failure",
            data: "No root exists for this flow"
          });
        }
  }
  catch (error) {
    console.log("Errro occurred getting root of flow: ", error.message);
    res.status(500);
    res.json({
      message: "failure",
      data: "" + error.message,
    });
  }
}

const deleteFlow = async (req, res) => {
  try {
    
    const flowName = req.params.flowName;  
    console.log("FLOW NAME: " + flowName)
  
    const result = await FlowSchema.deleteMany({ flowName });


    // Check if any flows were deleted
    if (result.deletedCount > 0) {
      
      res.status(200).json({
        message: "success",
        data: `${result.deletedCount} flows deleted successfully.`,
        flows: flows
      });
    } else {
      
      res
        .status(404)
        .json({ message: "No flows found with the specified flowName." });
    }
  }
  catch (error) {
     console.log("Errro occurred while deleting flow: ", error.message);
     res.status(500);
     res.json({
       message: "failure",
       data: ""+error.message,
     });
  }
}



module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  createFlow,
  deleteFlow,
  getAllFlowRecordsByFlowName,
  getRootOfFlowByFlowName,
};


