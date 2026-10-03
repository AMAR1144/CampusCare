const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        ca: require("fs").readFileSync(
          process.env.DB_SSL_CA || "C:/Users/91932/Downloads/ca.pem"
        )
      }
    },
    logging: false
  }
);

module.exports = sequelize;