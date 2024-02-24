// const { Op, where } = require("sequelize");
const Guest = require("../models/Guest.js");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const createGuest = async (req, res) => {
  try {
    const body = req.body;
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    const result = await Guest.createGuest(uuidv4(), body, createdAt);

    res.status(201).json({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getAllGuests = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 0;
    const status = req.query.status;
    const offset = page * limit;
    const result = await Guest.getAllGuests(status, limit, offset);
    const total = await Guest.getLengthGuests(status);
    res.status(200).json({
      message: "success",
      total: total[0].jumlah,
      limit: limit,
      page: page,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// const getGuestById = async(req,res) => {
//   try {
//     const guestId = req.query.g
//   } catch (error) {
//     console.log(error);
//   }
// }

const sumAmountByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const result = await Guest.getAllSumAmountByStatus(status);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const searchGuest = async (req, res) => {
  try {
    const search = req.query.search;
    const page = parseInt(req.query.page) || 0; // Ambil halaman dari query, atau gunakan halaman 1 jika tidak ada
    const limit = parseInt(req.query.limit) || 10; // Ambil limit dari query, atau gunakan 10 jika tidak ada
    const offset = page * limit;
    console.log(search);

    const result = await Guest.searchGuest(search, limit, offset);
    console.log(result);
    const totalPages = Math.ceil(result.length / limit);
    res
      .status(200)
      .json({ status: "success", totalPage: totalPages, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { guestId } = req.params;
    // const guest = await Guest.findOne({ where: { guestId } });
    const [guest] = await Guest.getGuestById(guestId);
    let dataStatus = guest.status;
    let newStatus = "";

    if (dataStatus === "Selesai") {
      newStatus = "Belum Selesai";
    } else {
      newStatus = "Selesai";
    }
    const result = await Guest.changeStatus(newStatus, guestId);

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getLengthGuests = async (req, res) => {
  try {
    const status = req.query.status;
    const result = await Guest.getLengthGuests(status);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getGuestById = async (req, res) => {
  try {
    const { guestId } = req.params;
    const result = await Guest.getGuestById(guestId);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const updateGuest = async (req, res) => {
  try {
    const { guestId } = req.params;
    const body = req.body;
    const convertAmount = parseInt(body.amount);
    const result = await Guest.updateGuests(body, convertAmount, guestId);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const deletGuestById = async (req, res) => {
  try {
    const { guestId } = req.params;
    const result = await Guest.deleteGuestById(guestId);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = {
  createGuest,
  getAllGuests,
  sumAmountByStatus,
  searchGuest,
  changeStatus,
  getLengthGuests,
  getGuestById,
  updateGuest,
  deletGuestById,
};
