const { Sequelize } = require("sequelize");
const fs = require("fs");
const mysql2 = require("mysql2");

let sslCA;

if (process.env.DB_SSL_CA_BASE64) {
  // Vercel / production
  sslCA = Buffer.from(
    process.env.DB_SSL_CA_BASE64,
    "base64"
  ).toString("utf8");
} else {
  // Local development
  sslCA = fs.readFileSync(
    "C:/Users/91932/Downloads/ca.pem",
    "utf8"
  );
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",

    // Explicitly provide mysql2 to Sequelize
    dialectModule: mysql2,

    dialectOptions: {
      ssl: {
        ca: sslCA
      }
    },

    logging: false
  }
);

module.exports = sequelize;