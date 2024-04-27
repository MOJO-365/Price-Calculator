const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js")

const verifier = require("../utils/verifyToken.js")
// import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"
//UPDATE
router.put("/edit-user/:id", verifier.verifyUser, userController.updateUser);

//DELETE
router.delete("/delete-user/:id", verifier.verifyUser, userController.deleteUser);

//GET
router.get("/get-user/:id", verifier.verifyUser, userController.getUser);

//GET ALL
router.get("/get-users/", verifier.verifyAdmin, userController.getUsers);

module.exports = router;
