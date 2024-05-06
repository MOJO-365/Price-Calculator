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
    res.status(500).json({
      error: error.message,
      message:"failure"
    });
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
        data: "Question not found",
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
        data: "Question not found",
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
        data: "Question not found",
        message: "failure",
      });
    } else {
      res.status(200);
      res.json({
        message: "success",
        data: deletedQuestion,
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
  
  console.log("create flow: req body: "+req.body.listOfFlow)
  try {
    const listOfFlow = req.body.listOfFlow;
    for (const flow of listOfFlow) {
      
      const flowNode = new FlowSchema(flow);
      // console.log(flow)
      // console.log(" curr Question: "+ await Question.findById(flow.currQuestionId))
      await flowNode.save();
    }

    // console.log("response of create flow: " + listOfFlow)
    
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
      error:""+error.message
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
      error: "" + error.message,
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
      error: "" + error.message,
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
        // flows: flows
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
       error: ""+error.message,
     });
  }
}

const editFlow = async (req, res) => {
  const flowName = req.params.flowName;
  console.log("FLOW NAME: " + flowName);

  const deleteResultCount = await FlowSchema.deleteMany({ flowName });

  if (deleteResultCount < 0) {
    res.status(404).json({
      message: "failure",
      data: "No flows found with the specified flowName.",
    });
  }
  else {
    const listOfFlow = req.body.listOfFlow;
    for (const flow of listOfFlow) {
      const flowNode = new FlowSchema(flow);

      await flowNode.save();
    }

    console.log(flowName,"flow updated")
    res.status(200).json({
      message: "success",
      data: listOfFlow,
    });

}
  
  
}

const isFlowValid = async (req, res)=>{
  
  try {
    
    const selectedQuestionsList = req.body.selectedQuestionsList
    const listOfFlow = req.body.listOfFlow

    const flowNextQuestionIdsList = []
    const selectedQuestionIdsList = []
    let itemsNotInFlowNextQuestionIds = []
    let rootQuestionId = ""
    if (Array.isArray(listOfFlow)) {
        
      listOfFlow.forEach(flow => {
            
        const currQuestionId = flow.currQuestionId;
        const answerValue = flow.answerValue;
        const nextQuestionId = flow.nextQuestionId;
        const isFlow = flow.isRoot;
        if (isFlow) {
          rootQuestionId = currQuestionId;
        }
        if (nextQuestionId != null) {
          flowNextQuestionIdsList.push(nextQuestionId);
        }
        
           
      });
    }
    else {
      res.status(500)
      res.json({
        message: "failure",
        data: "Improper reques body"
      })
    }



    if (Array.isArray(selectedQuestionsList)) {
      selectedQuestionsList.forEach((question) => {
        const questionId = question._id;
    
        selectedQuestionIdsList.push(questionId);
        
      });


      itemsNotInFlowNextQuestionIds = selectedQuestionIdsList.filter((id) => {
        return !flowNextQuestionIdsList.includes(id);
      });
      const index = itemsNotInFlowNextQuestionIds.indexOf(rootQuestionId);

      if (index !== -1) {
        itemsNotInFlowNextQuestionIds.splice(index, 1);
      }
      

    } else {
      res.status(500);
      res.json({
        message: "failure",
        data: "Improper request body",
      });
    }

    res.status(200)
    res.json({
      message: "success",
      data: {
        selectedQuestionIds: selectedQuestionIdsList,
        flowNextQuestionIds: flowNextQuestionIdsList,
        unusedQuestionIds: itemsNotInFlowNextQuestionIds,
      },
    });


  }
  catch (error) {
    res.status(500)
    res.json({
      message: "failure",
      error: "Error occurred while validating flow: "+error.message
    })

  }

}
 

const getAllFlowNames = async (req, res) => {
  
  try {
    const flowNames = await FlowSchema.distinct('flowName');

    if (!flowNames) {
      
      res.status(200)
      res.json({
        message: "failure",
        data: "No flows found"
      })
    }
    else {
      
      res.status(200)
      res.json({
        message: "success",
        data: flowNames
      })
    }
  } catch (error) {
    
    res.status(500)
    res.json({
      message: "failure",
      error: "Error occurred while fetching flow names: "+error.message
    })
  }
}




const getAllFlows = async (req, res) => {
  
  try {
    
    const groupedFlows = await FlowSchema.aggregate([
      {
        $group: {
          _id: "$flowName", 
          flows: { $push: "$$ROOT" }, 
        },
      },
    ]); 

    res.status(200)
    res.json({
      message: "success",
      data: await processJsonData(groupedFlows),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", message: "failure" });
  }
}


const processJsonData = async (jsonData) => {
  // Iterate through each element in the data array
  for (const dataItem of jsonData) {
    // Iterate through each flow in the flows array
    for (const flow of dataItem.flows) {
      // Fetch the current question by ID
      try {
        const currQuestion = await Question.findById(flow.currQuestionId);
        // If the current question is found, append it to the flow object
        if (currQuestion) {
          flow.currQuestion = currQuestion;
        }

        // Fetch the next question by ID (if nextQuestionId is not null)
        if (flow.nextQuestionId) {
          const nextQuestion = await Question.findById(flow.nextQuestionId);
          // If the next question is found, append it to the flow object
          if (nextQuestion) {
            flow.nextQuestion = nextQuestion;
          }
        }
      } catch (error) {
        console.error(`Error fetching question by ID: ${error}`);
        // Handle any errors that occur during fetching the questions
        flow.error = "Error fetching question data";
      }
    }
  }

  // Return the modified jsonData with appended questions data
  return jsonData;
};


const getQuestionByIdHelper = async (questionId) => {
  try {
    
    const question = await Question.findById(questionId);

    // Check if the question exists
    if (!question) {
      // Return a message if no question is found with the provided ID
      return null
      // return { message: "Question not found" };
    }

    // Return the question if found
    return question;
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error("Error fetching question by ID:", error);
    return null;
    // return { error: "Error fetching question by ID" };
  }
};
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
  editFlow,
  isFlowValid,
  getAllFlowNames,
  getAllFlows
};



