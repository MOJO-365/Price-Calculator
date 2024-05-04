const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js")
const authController = require("../controllers/auth.js")

const verifier = require("../utils/verifyToken.js")


//CREATE   
router.post("/create-user", verifier.verifyToken, authController.register);

//UPDATE
router.put("/edit-user/:id", verifier.verifyToken, userController.updateUser);

//DELETE
router.delete("/delete-user/:id", verifier.verifyToken, userController.deleteUser);

//GET
router.get("/get-user/:id", verifier.verifyToken, userController.getUser);

//GET ALL
router.get("/get-users/", verifier.verifyToken, userController.getUsers);



module.exports = router;
