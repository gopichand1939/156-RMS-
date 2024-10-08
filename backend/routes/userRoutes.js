const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("plan")
      .optional()
      .isIn(["Basic", "Premium", "VIP"])
      .withMessage("Invalid plan selected")
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, plan } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      plan
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        plan: user.plan
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  })
);

// @desc    Get all users (for testing)
// @route   GET /api/users
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

module.exports = router;
