require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");

const Admin = require("./models/Admin");
const createAdmins = require("./models/seedAdmins");

const usersRoutes = require("./routes/user");
const complaintsRoutes = require("./routes/complaints");
const authroutes = require("./routes/auth");
const categoriesRoutes = require("./routes/categories");

require("./models");

const app = express();


// =========================
// MIDDLEWARE
// =========================

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
  })
);

app.use(express.json());


// =========================
// HOME ROUTE
// =========================

app.get("/", (req, res) => {
  res.send("Campus Complaint Management Backend is Running!");
});


// =========================
// API ROUTES
// =========================

app.use("/api/complaints", complaintsRoutes);
app.use("/api/auth", authroutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/users", usersRoutes);


// =========================
// DATABASE CONNECTION
// =========================

sequelize
  .sync()
  .then(async () => {

    console.log("Database connected successfully!");

    await createAdmins();

  })
  .catch((error) => {

    console.log("Database connection failed!");
    console.log(error);

  });


// =========================
// EXPORT APP
// =========================

module.exports = app;


// =========================
// LOCAL DEVELOPMENT
// =========================

if (require.main === module) {

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

}