const connection = require("../db.js");

const createGuest = async (guestId, body, createdAt) => {
  try {
    const query = `INSERT INTO tbl_guests (guestId,name,address,amount,status,createdAt,updatedAt) VALUES(?,?,?,?,?,?,?)`;
    console.log({ guestId, body, createdAt });
    const [result] = await connection.execute(query, [
      guestId,
      body.name,
      body.address,
      body.amount,
      body.status,
      createdAt,
      createdAt,
    ]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getAllGuests = async (status = undefined, limit, offset) => {
  try {
    let query = "";
    let queryParams = [];
    if (status !== undefined) {
      query = `SELECT * FROM tbl_guests WHERE status = ? LIMIT ? OFFSET ?`;
      queryParams = [status, limit, offset];
    } else {
      query = `SELECT * FROM tbl_guests LIMIT ? OFFSET ?`;
    }
    const [result] = await connection.query(query, queryParams);
    return result;
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getGuestById = async (guestId) => {
  try {
    const query = `SELECT * FROM tbl_guests WHERE guestId = ?`;
    const [result] = await connection.execute(query, [guestId]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getAllSumAmountByStatus = async (status) => {
  try {
    const query = `SELECT SUM(amount) AS total FROM tbl_guests WHERE status = ?`;
    const [result] = await connection.execute(query, [status]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const searchGuest = async (search, limit, offset) => {
  try {
    const slice = search.replaceAll("'", "");
    const searchValue = `%${slice}%`;
    const query = `SELECT * FROM tbl_guests WHERE name LIKE ? OR address LIKE ? LIMIT ? OFFSET ?`;
    const [result] = await connection.query(query, [
      searchValue,
      searchValue,
      limit,
      offset,
    ]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const changeStatus = async (status, guestId) => {
  try {
    const query = `UPDATE tbl_guests SET status = ? WHERE guestId = ?`;
    const [result] = await connection.execute(query, [status, guestId]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getLengthGuests = async () => {
  try {
    const query = `SELECT COUNT(guestId) AS jumlah FROM tbl_guests`;
    const [result] = await connection.execute(query);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateGuests = async (body, amount, guestId) => {
  try {
    const query = `UPDATE tbl_guests SET name = ?,address = ?,amount = ? WHERE guestId = ?`;
    const [result] = await connection.execute(query, [
      body.name,
      body.address,
      amount,
      guestId,
    ]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteGuestById = async (guestId) => {
  try {
    const query = `DELETE FROM tbl_guests WHERE guestId = ?`;
    const [result] = await connection.execute(query, [guestId]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createGuest,
  getAllGuests,
  getAllSumAmountByStatus,
  searchGuest,
  changeStatus,
  getGuestById,
  getLengthGuests,
  updateGuests,
  deleteGuestById,
};
