
const User = require("../models/User")
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404);
    res.json({
      message: "failure",
      data: "Error while updating: "+err.message
    });
    // next(err);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    // next(err);
    res.status(404);
    res.json({
      message: "failure",
      data: "Error while deleting: " + err.message,
    });
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    // next(err);
    res.status(404);
    res.json({
      message: "failure",
      data: "Error while fetching user: " + err.message,
    });
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    // next(err);
    res.status(404);
    res.json({
      message: "failure",
      data: "Error while fetching users: " + err.message,
    });
  }
};



module.exports = {
  updateUser,
  getUser,
  getUsers,
  deleteUser
};

