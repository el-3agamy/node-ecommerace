const jwt = require("jsonwebtoken");

// verify token
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded; // attach user data
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// check role
// middleware/roleMiddleware.js
const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Forbidden: You don’t have access" });
    }
    next();
  };
};

module.exports = { allowRoles };

module.exports = { authMiddleware, allowRoles };
