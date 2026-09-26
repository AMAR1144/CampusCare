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

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Campus Complaint Management Backend is Running!");
});

app.use("/api/complaints", complaintsRoutes);
app.use("/api/auth", authroutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/users", usersRoutes);

sequelize.sync()
  .then(async () => {

    console.log("Database connected successfully!");

    await createAdmins();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  })
  .catch((error) => {

    console.log("Database connection failed!");
    console.log(error);

  });


