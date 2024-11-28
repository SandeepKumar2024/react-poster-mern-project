const auth = require("./authMiddleware");

// Middleware to check  role
const checkRole = (role) => {
  return (req, res, next) => {
    auth(req, res, () => {
      if (req.user.role !== role) {
        return res
          .status(403)
          .json({ message: `Access Denied: You do not have the ${role} role` });
      }
      next();
    });
  };
};

// Middleware to check for admin role
const checkAdmin = checkRole("admin");

// Middleware to check for editor role
const checkEditor = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== "admin" && req.user.role !== "editor") {
      return res
        .status(403)
        .json({
          message: "Access Denied: You do not have editor/admin privileges",
        });
    }
    next();
  });
};

// Middleware to check for viewer role
const checkViewer = (req, res, next) => {
  auth(req, res, () => {
    if (
      req.user.role === "admin" ||
      req.user.role === "editor" ||
      req.user.role === "viewer"
    ) {
      return next();
    }
    res
      .status(403)
      .json({
        message: "Access Denied: You do not have permission to view posts",
      });
  });
};

module.exports = { checkAdmin, checkEditor, checkViewer };
