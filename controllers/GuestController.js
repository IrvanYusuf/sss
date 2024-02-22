const { Op, where } = require("sequelize");
const GuestModel = require("../models/Guest.js");

const createGuest = async (req, res) => {
  try {
    const body = req.body;

    const create = await GuestModel.create({
      name: body.name,
      address: body.address,
      amount: body.amount,
      status: body.status,
    });

    res.status(201).json({ status: "success", data: create });
    console.log(body);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getAllGuests = async (req, res) => {
  try {
    // const result = await GuestModel.findAll();
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 0;
    const status = req.query.status;
    const offset = page * limit;
    const result = await GuestModel.findAndCountAll({
      limit: limit,
      offset: offset,
      where: status ? { status: status } : {},
    });
    res.status(200).json({
      status: "success",
      total: result.rows.length,
      limit: limit,
      page: page,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getAllGuestsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const result = await GuestModel.findAll({ where: { status: status } });
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const sumAmountByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const result = await GuestModel.sum("amount", {
      where: { status: status },
    });
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

    const result = await GuestModel.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { address: { [Op.like]: `%${search}%` } },
        ],
      },
      offset: offset,
      limit: limit,
    });

    const totalPages = Math.ceil(result.count / limit);

    res
      .status(200)
      .json({ status: "success", data: result.rows, totalPage: totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { guestId } = req.params;
    const guest = await GuestModel.findOne({ where: { guestId } });
    let dataStatus = guest.dataValues.status;
    let newStatus = "";

    if (dataStatus === "Selesai") {
      newStatus = "Belum Selesai";
    } else {
      newStatus = "Selesai";
    }

    const result = await GuestModel.update(
      { status: newStatus },
      {
        where: {
          guestId: guestId,
        },
      }
    );

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getLengthGuests = async (req, res) => {
  try {
    const result = await GuestModel.findAndCountAll();
    res.status(200).json({ status: "success", data: result.count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getGuestById = async (req, res) => {
  try {
    const { guestId } = req.params;
    const result = await GuestModel.findOne({
      where: {
        guestId: guestId,
      },
    });
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
    const result = GuestModel.update(
      { name: body.name, address: body.address, amount: parseInt(body.amount) },
      {
        where: {
          guestId: guestId,
        },
      }
    );
    res.status(200).json({ status: "success", data: result });
    console.log({ body, convertAmount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const deletGuestById = async (req, res) => {
  try {
    const { guestId } = req.params;
    const result = await GuestModel.destroy({ where: { guestId: guestId } });
    await res.status(200).json({ status: "success", data: result });
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
