const express = require("express");
const User = require("../models/User");

const router = express.Router();


// GET ALL USERS
router.get("/", async (req, res) => {
  try {

    const users = await User.findAll({
      attributes: ["id", "name", "email", "phone"]
    });

    res.json(users);

  } catch (error) {

    console.error("Error fetching users:", error);

    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message
    });

  }
});


// CREATE USER
router.post("/", async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      phone
    } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      phone
    });

    res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (error) {

    console.error("Error creating user:", error);

    res.status(500).json({
      message: "Failed to create user",
      error: error.message
    });

  }
});


// UPDATE USER
router.put("/:id", async (req, res) => {
  try {

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const {
      name,
      email,
      password,
      phone
    } = req.body;

    user.name = name;
    user.email = email;
    user.password = password;
    user.phone = phone;

    await user.save();

    res.json({
      message: "User updated successfully",
      user
    });

  } catch (error) {

    console.error("Error updating user:", error);

    res.status(500).json({
      message: "Failed to update user",
      error: error.message
    });

  }
});


// DELETE USER
router.delete("/:id", async (req, res) => {
  try {

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    await user.destroy();

    res.json({
      message: "User deleted successfully"
    });

  } catch (error) {

    console.error("Error deleting user:", error);

    res.status(500).json({
      message: "Failed to delete user",
      error: error.message
    });

  }
});


module.exports = router;
