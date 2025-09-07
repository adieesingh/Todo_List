require("dotenv").config();

const jwt = require('jsonwebtoken');
const Secret_Key = process.env.JWT_SECRET || "icecream";
console.log(Secret_Key);

function authMiddleware(req, res, next) {
  
  
  try {
    console.log("hello from auth");
    
    const header = req.header("authorization");
    
    console.log(header);
    if (!header) {
      return res.status(401).json({
        error: "Missing auth header",
         
      });
      
    }
   
    
    const token = header.split(" ")[1];
    
    
    const payLoad = jwt.verify(token, Secret_Key);
    console.log(payLoad);
    
    req.userId = payLoad.id;
    req.email = payLoad.email
    console.log(req.userId);
    
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
}
module.exports = authMiddleware;