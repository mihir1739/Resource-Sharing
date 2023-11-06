const { getUser } = require("../services/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  try {
    const token = req.headers?.authorization.split(' ')[1];
    if (!token) return res.status(401).send("Please Login!");
    const user = getUser(token);

    if (!user) return res.status(401).send("Please Login!");

    req.user = user;
    next();
  }
  catch {
    return res.status(401).send("Please Login Again!");
  }


}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};