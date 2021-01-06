const JWT = require("jsonwebtoken");

const authToken = (req, res, next) => {
  try {
    const { authxtoken } = req.headers;
    if (!authxtoken) {
      return res.status(401).json("Not authorised");
    }
    const verified = JWT.verify(authxtoken, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ msg: "not found" });
    }
    req.id = verified;
    next();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

module.exports = authToken;
