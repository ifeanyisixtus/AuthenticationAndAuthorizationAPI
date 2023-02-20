const isAdminMiddleware = (req, res, next) => {
  const userRole = req.user.role;
  if (userRole !== "admin") {
    return res
      .status(403)
      .json({ message: "User not authorized to perform this action" });
  }
  next();
};

module.exports = isAdminMiddleware;
