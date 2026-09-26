const express = require("express");
const User = require("../models/User");
const Admin = require("../models/Admin");
const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password, phone } = req.body;
    const user = await User.create({
    name: name,
    email: email,
    phone: phone,
    password: password
});

    res.json({
        message: "Registration route is working",
        body: req.body
    });

});
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if (user === null) {
        return res.status(401).json({
            message: "User not found"
        });
    }

    if (user.password !== password) {
        return res.status(401).json({
            message: "Wrong password"
        });
    }

    return res.json({
        message: "Login successful",
        user: user
    });

});

router.post("/admin-login", async (req, res) => {

    const { email, password } = req.body;

    const admin = await Admin.findOne({
        where: {
            email: email
        }
    });

    if (admin === null) {
        return res.status(401).json({
            message: "Admin not found"
        });
    }

    if (admin.password !== password) {
        return res.status(401).json({
            message: "Wrong password"
        });
    }

    return res.json({
        message: "Admin login successful",
        admin: admin
    });

});

module.exports = router;