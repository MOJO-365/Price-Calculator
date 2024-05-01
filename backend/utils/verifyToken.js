
var jwt = require("jsonwebtoken");



const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("TOKEN: ", token)
  
  
  if (!token) {
    res.status(403)
    res.json({
      message: "failure",
      data: "No Token found in cookie",
    });
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    const decodedToken = jwt.decode(token);
    console.log(decodedToken);
    if (!decodedToken.isAdmin) {
      res.status(403);
      res.json({
        message: "failure",
        data: "Only admin can make"
      })
      // return next(errorUtil.createError(403, "Only Admin can make changes"));
    }

    else if (err)
    {
      res.status(403);
      res.json({
        message: "failure",
        data: "Token is invalid",
      });
      // return next(errorUtil.createError(403, "Token is not valid!"));
    }
      
    req.user = user;
    next();
  });
};





module.exports = {
  verifyToken
}