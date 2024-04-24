const express = require("express");
const router = express.Router();
const questionController = require("../controllers/QuestionsController");

router.post("/create-question", questionController.createQuestion);
router.get("/get-all-questions", questionController.getAllQuestions);
router.get("/get-question-by-id/:id", questionController.getQuestionById);
router.put("/update-question/:id", questionController.updateQuestion);
router.delete("/delete-question/:id", questionController.deleteQuestion);

module.exports = router;
