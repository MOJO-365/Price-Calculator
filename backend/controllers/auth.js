
const User = require("../models/User.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

      await newUser.save();
      res.status(200)
      res.json({message:"success"})
    
  } catch (err) {
      
    console.log("error occurred while registering the user: ",err.message)
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    
    if (!user) {
      // return next(errorUtil.createError(404, "User not found!"));
      res.status(404)
      res.json({
        message: "failure",
        data: "User not found!"
      });
    }
      

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
    {
      // return next(errorUtil.createError(400, "Wrong password or username!"));
      res.status(400);
      res.json({
        message: "failure",
        data: "Wrong password or username!",
      });

    }
      

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, usrname: user.username },
      process.env.JWT,
      {
        expiresIn: '2h' 
      }
    );
    

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        details: {
          ...otherDetails
        }, isAdmin,

        access_token : token
      });
  } catch (err) {
   res.status(400);
   res.json({
     message: "failure",
     data: "Error occurred while login: "+err.message
   });
  }
};


module.exports = {

  register,
  login
}