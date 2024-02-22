const connection = require("../db.js");
const { DataTypes, Sequelize } = require("sequelize");

const User = connection.define(
  "tbl_users",
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "username is required" },
        notNull: { args: true, msg: "username is required" },
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "password is required" },
        notNull: { args: true, msg: "password is required" },
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
  },
  {
    hooks: {
      beforeUpdate: (user, options) => {
        // Set nilai updatedAt menggunakan waktu saat ini di zona waktu Jakarta
        user.updatedAt = new Date();
      },
    },
  }
);

module.exports = User;
