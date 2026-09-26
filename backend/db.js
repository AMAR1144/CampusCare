const { Sequelize } = require('sequelize');

// Without using .env file.

const sequelize = new Sequelize(
  'campus_complaints',
  'root',
  'Amarnaik2006',
  {
    host: 'localhost',
    dialect: 'mariadb',
    port: 3306
  }
);

module.exports = sequelize;