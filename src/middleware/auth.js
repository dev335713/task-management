const jwt = require('jsonwebtoken');
const User = require("../models/User");

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    User.findOne({_id:req.user.id})
    .then((userobj)=>{
      if(userobj)
        next();
      else  
        res.status(401).json({ message: 'Invalid token' });
    })
    .catch((err)=>{
      res.status(500).json({ message: 'Server Error' });
    })
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
