const User = require("./User");
const Categories = require("./categories");
const Complaint = require("./Complaint");
const createAdmins = require("./seedAdmins");
const Admin = require("./Admin");

User.hasMany(Complaint, {
  foreignKey: "user_id"
});

Complaint.belongsTo(User, {
  foreignKey: "user_id"
});


Categories.hasMany(Complaint, {
  foreignKey: "category_id"
});

Complaint.belongsTo(Categories, {
  foreignKey: "category_id"
});


module.exports = {
  User,
  Categories,
  Complaint
};
