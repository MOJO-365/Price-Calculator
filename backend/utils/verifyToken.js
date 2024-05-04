
var jwt = require("jsonwebtoken");



const verifyToken = (req, res, next) => {
  // const token = req.cookies.access_token;
  // console.log("In verifyToken(): TOKEN FROM COOKIE: ", token)
  
  const authHeader = req.headers.authorization;

    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      console.log("TOKEN: from header: "+token)

      jwt.verify(token, process.env.JWT, (err, user) => {
        const decodedToken = jwt.decode(token);
        console.log(decodedToken);

        if (!decodedToken.isAdmin) {
          res.status(403);
          res.json({
            message: "failure",
            data: "Only admin can make",
          });
          // return next(errorUtil.createError(403, "Only Admin can make changes"));
        } else if (err) {
          res.status(403);
          res.json({
            message: "failure",
            data: "Token is invalid",
          });
          
        }
        req.user = user;
        next();
      });
      

  }
    else {
      return res.status(401).json({ error: "No token provided in header", message: "failure" });
  }
  

  
};





module.exports = {
  verifyToken
}