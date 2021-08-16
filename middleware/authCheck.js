const authCheck = (req, res, next) => {
  res.locals.user = req.session.user;
  next();
}

module.exports = authCheck
