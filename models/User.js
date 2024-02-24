const connection = require("../db.js");

const register = async (userId, username, password, createdAt) => {
  try {
    const query = `INSERT INTO tbl_users (userId,username,password,createdAt,updatedAt) VALUES(?,?,?,?,?)`;
    const [result] = await connection.execute(query, [
      userId,
      username,
      password,
      createdAt,
      createdAt,
    ]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const login = async (username) => {
  try {
    const query = `SELECT * FROM tbl_users WHERE username = ?`;
    const [result] = await connection.execute(query, [username]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login };
