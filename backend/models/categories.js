
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Categories = sequelize.define(
  "Categories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "categories",
    timestamps: false
  }
);

module.exports = Categories;
