const UserModel = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!password)
      return res
        .status(400)
        .json({ status: "failed", message: "password is required" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const result = await UserModel.create({
      username: username,
      password: hashPassword,
    });
    res.status(201).json({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // validasi username
    if (!username)
      return res
        .status(400)
        .json({ status: "failed", message: "username tidak boleh kosong" });

    // validasi password
    if (!password)
      return res
        .status(400)
        .json({ status: "failed", message: "password tidak boleh kosong" });

    // cek user di database
    const isUserExist = await UserModel.findOne({
      where: { username: username },
    });

    if (!isUserExist) {
      return res.status(401).json({
        status: "failed",
        message: "username anda salah",
      });
    }

    // melakukan compare password
    const checkPassword = await bcrypt.compare(
      password,
      isUserExist.dataValues.password
    );

    if (!checkPassword)
      return res
        .status(401)
        .json({ status: "failed", message: "password salah" });

    // membuat token
    const token = jwt.sign(
      {
        id: isUserExist.dataValues.userId,
        name: isUserExist.dataValues.username,
      },
      "secret",
      { expiresIn: "2 days" }
    );

    console.log(isUserExist.dataValues);
    res.status(200).json({ status: "success", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = { register, login };
