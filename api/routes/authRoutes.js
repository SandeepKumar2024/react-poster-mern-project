const express = require("express");
const { signup, signin, getUsers, updateUser } = require("../controllers/authControllers");
const { checkAdmin } = require("../middleware/roleMiddleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", signin);
router.get("/all", checkAdmin, getUsers);
router.put("/update/:userId", checkAdmin, updateUser);

module.exports = router;
