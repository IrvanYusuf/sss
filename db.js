const { Sequelize } = require("sequelize");

const connection = new Sequelize("undangan_management", "root", "", {
  host: "localhost",
  dialect: "mysql",
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
});

module.exports = connection;
