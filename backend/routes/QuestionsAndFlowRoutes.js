const express = require("express");
const router = express.Router();
const questionAndFlowController = require("../controllers/QuestionsAndFlowController");
const jwtVerifier = require("../utils/verifyToken");
//Creates one question at a time
router.post("/create-question", jwtVerifier.verifyToken, questionAndFlowController.createQuestion);

//Fetch all questions from db
router.get("/get-all-questions", questionAndFlowController.getAllQuestions);

// Get question by id
router.get("/get-question-by-id/:id", questionAndFlowController.getQuestionById);

// Update question by id
router.put("/update-question/:id", jwtVerifier.verifyToken, questionAndFlowController.updateQuestion);

// Delete Question by id
router.delete("/delete-question/:id", jwtVerifier.verifyToken, questionAndFlowController.deleteQuestion);

// Creating a flow: pass list of FlowSchema objects in request
router.post("/create-flow", jwtVerifier.verifyToken, questionAndFlowController.createFlow);

// Deletes a flow by flowName
router.delete("/delete-flow/:flowName", jwtVerifier.verifyToken, questionAndFlowController.deleteFlow);

// Fetches all records with given flowName
router.post("/get-flow/:flowName", questionAndFlowController.getAllFlowRecordsByFlowName)

// Gives the list response: will fetch records from FlowSchema with given flowName and isRoot=true
router.post("/get-root/:flowName", questionAndFlowController.getRootOfFlowByFlowName);


//To edit a flow, pass flow name in url and request body same as create flow
router.put("/edit-flow/:flowName", jwtVerifier.verifyToken, questionAndFlowController.editFlow);

router.post("/is-flow-valid/:flowName", jwtVerifier.verifyToken, questionAndFlowController.isFlowValid)

router.get("/get-flow-names", questionAndFlowController.getAllFlowNames)

router.get("/get-all-flows", questionAndFlowController.getAllFlows)

module.exports = router;
