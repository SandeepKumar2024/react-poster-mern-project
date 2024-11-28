const User = require("./../model/user");
const bcrypt = require("bcrypt");

//signup function
exports.signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const existedUser = await User.findOne({ email });
    //check already exists user
    if (existedUser)
      return res.status(400).json("User already exists , Login ");
    //check confrm password and password
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password don't match ! Check Password Again " });
    }

    //save data in db
    const user = new User({ username, email, password });
    await user.save();
    //return response
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Route to login the user
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Wrong Password or Email" });
    }

    // Check if the password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Password or Email" });
    }

    // Generate a JWT token for the user
    const token = user.generateAuthToken();

    // Send the token and user data as the response
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//Get all users
exports.getUsers = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Update User Role Controller
exports.updateUser = async (req, res) => {
  try {
    // Validate request parameters
    const { userId } = req.params;
    const { role } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    if (!role) {
      return res.status(400).json({ message: "Role is required." });
    }

    

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the requester is authorized to update the role
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to perform this action." });
    }

    // Update the user's role
    user.role = role;
    await user.save();

    return res.status(200).json({
      message: "User role updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

