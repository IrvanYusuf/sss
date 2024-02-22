const { Sequelize } = require("sequelize");

const connection = new Sequelize(
  "bozrfw2miwisr2bnizcq",
  "upqvw0evryi1zmhl",
  "vtPYNyLJ2TXjXmVTjUJr",
  {
    host: "bozrfw2miwisr2bnizcq-mysql.services.clever-cloud.com",
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
  }
);

module.exports = connection;
