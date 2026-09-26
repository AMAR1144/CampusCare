const express = require("express");
const Categories = require("../models/categories");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Categories.findAll();

    res.json(categories);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to get categories"
    });
  }
});

module.exports = router;