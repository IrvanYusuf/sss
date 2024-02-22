const connection = require("../db.js");
const { DataTypes, Sequelize } = require("sequelize");

const Guest = connection.define("tbl_guests", {
  guestId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: "Name is required" },
      notNull: { args: true, msg: "Name is required" },
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: "Address is required" },
      notNull: { args: true, msg: "Address is required" },
    },
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: "Amount is required" },
      notNull: { args: true, msg: "Amount is required" },
    },
  },
  status: {
    type: DataTypes.ENUM(["Selesai", "Belum Selesai"]),
    // defaultValue: DataTypes.ENUM(["Belum Selesai"]),
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: "Status is required" },
      notNull: { args: true, msg: "Status is required" },
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
});

module.exports = Guest;
