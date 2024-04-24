const Question = require("../models/QuestionsSchema");

// Create a new question
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

// Get a question by ID
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

// Update a question by ID
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


module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};