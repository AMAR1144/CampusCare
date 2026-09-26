const express = require("express");

const router = express.Router();

const Complaint = require("../models/Complaint");
const Categories = require("../models/categories");
const User = require("../models/User");

// UPDATE COMPLAINT STATUS
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "In Progress",
      "Resolved",
      "Rejected"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const complaint = await Complaint.findByPk(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    complaint.status = status;

    await complaint.save();

    res.json({
      message: "Complaint status updated successfully",
      complaint
    });

  } catch (error) {
    console.error("Error updating complaint status:", error);

    res.status(500).json({
      message: "Failed to update complaint status",
      error: error.message
    });
  }
});

// CREATE COMPLAINT
router.post("/", async (req, res) => {

  try {

    const {
      user_id,
      category_id,
      title,
      description,
      priority
    } = req.body;


    const complaint = await Complaint.create({
      user_id: user_id,
      category_id: category_id,
      title: title,
      description: description,
      priority: priority
    });


    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint: complaint
    });


  } catch (error) {

    console.error("Error creating complaint:", error);

    res.status(500).json({
      message: "Failed to submit complaint",
      error: error.message
    });

  }

});


// GET COMPLAINTS OF LOGGED-IN STUDENT
router.get("/my-complaints", async (req, res) => {

  try {

    const user_id = req.query.user_id;


    const complaints = await Complaint.findAll({

      where: {
        user_id: user_id
      },

      include: [
        {
          model: Categories,
          attributes: ["name"]
        }
      ]

    });


    res.json(complaints);


  } catch (error) {

    console.error(
      "Error fetching my complaints:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch complaints",
      error: error.message
    });

  }

});


// GET SINGLE COMPLAINT
router.get("/:id", async (req, res) => {

  try {

    const complaint = await Complaint.findByPk(
      req.params.id,
      {
        include: [
          {
            model: Categories,
            attributes: ["name"]
          },
          {
            model: User,
            attributes: ["id", "name", "email", "phone"]
          }
        ]
      }
    );


    if (!complaint) {

      return res.status(404).json({
        message: "Complaint not found"
      });

    }


    res.json(complaint);


  } catch (error) {

    console.error(
      "Error fetching complaint:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch complaint",
      error: error.message
    });

  }

});


// GET ALL COMPLAINTS
router.get("/", async (req, res) => {

  try {

    const complaints = await Complaint.findAll({

      include: [
        {
          model: User,
          attributes: ["id", "name", "email"]
        },
        {
          model: Categories,
          attributes: ["id", "name"]
        }
      ]

    });


    res.json(complaints);


  } catch (error) {

    console.error(
      "Error fetching complaints:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch complaints",
      error: error.message
    });

  }

});


module.exports = router;
