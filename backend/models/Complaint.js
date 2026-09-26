const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Complaint = sequelize.define(
  "Complaint",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    priority: {
      type: DataTypes.ENUM("Low", "Medium", "High"),
      defaultValue: "Medium"
    },

    status: {
      type: DataTypes.ENUM(
        "Pending",
        "In Progress",
        "Resolved",
        "Rejected"
      ),
      defaultValue: "Pending"
    }
  },
  {
    tableName: "complaints",
    timestamps: false
  }
);

module.exports = Complaint;