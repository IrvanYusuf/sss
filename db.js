const { Sequelize } = require("sequelize");

const connection = new Sequelize(
  process.env.MYSQL_ADDON_DB,
  process.env.MYSQL_ADDON_USER,
  process.env.MYSQL_ADDON_PASSWORD,
  {
    host: process.env.MYSQL_ADDON_HOST,
    dialect: "mysql",
    port: process.env.MYSQL_ADDON_PORT,
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
    timezone: "+07:00",
  }
);

module.exports = connection;
