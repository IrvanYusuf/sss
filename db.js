const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");
// const connection = new Sequelize(
//   process.env.MYSQL_ADDON_DB,
//   process.env.MYSQL_ADDON_USER,
//   process.env.MYSQL_ADDON_PASSWORD,
//   {
//     host: process.env.MYSQL_ADDON_HOST,
//     dialect: "mysql",
//     port: process.env.MYSQL_ADDON_PORT,
//     password: process.env.MYSQL_ADDON_PASSWORD,
//     dialectOptions: {
//       useUTC: false,
//       dateStrings: true,
//       typeCast(field, next) {
//         if (field.type === "DATETIME") {
//           return field.string();
//         }
//         return next();
//       },
//     },
//     timezone: "+07:00",
//   }
// );

const connection = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  database: process.env.MYSQL_ADDON_DB,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  namedPlaceholders: true,
});

module.exports = connection;
