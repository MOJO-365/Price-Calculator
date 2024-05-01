const express = require("express");
const router = express.Router();
const questionAndFlowController = require("../controllers/QuestionsAndFlowController");

//Creates one question at a time
router.post("/create-question", questionAndFlowController.createQuestion);

//Fetch all questions from db
router.get("/get-all-questions", questionAndFlowController.getAllQuestions);

// Get question by id
router.get("/get-question-by-id/:id", questionAndFlowController.getQuestionById);

// Update question by id
router.put("/update-question/:id", questionAndFlowController.updateQuestion);

// Delete Question by id
router.delete("/delete-question/:id", questionAndFlowController.deleteQuestion);

// Creating a flow: pass list of FlowSchema objects in request
router.post("/create-flow", questionAndFlowController.createFlow);

// Deletes a flow by flowName
router.delete("/delete-flow/:flowName", questionAndFlowController.deleteFlow);

// Fetches all records with given flowName
router.post("/get-flow/:flowName", questionAndFlowController.getAllFlowRecordsByFlowName)

// Gives the list response: will fetch records from FlowSchema with given flowName and isRoot=true
router.post("/get-root/:flowName", questionAndFlowController.getRootOfFlowByFlowName);


module.exports = router;