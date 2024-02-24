const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "bozrfw2miwisr2bnizcq-mysql.services.clever-cloud.com",
  database: "bozrfw2miwisr2bnizcq",
  password: "vtPYNyLJ2TXjXmVTjUJr",
  user: "upqvw0evryi1zmhl",
  namedPlaceholders: true,
});

module.exports = connection;
