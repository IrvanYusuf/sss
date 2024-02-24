const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    if (!password)
      return res
        .status(400)
        .json({ status: "failed", message: "password is required" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const result = await User.register(
      uuidv4(),
      username,
      hashPassword,
      createdAt
    );
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
    const [isUserExist] = await User.login(username);

    if (!isUserExist) {
      return res.status(401).json({
        status: "failed",
        message: "username anda salah",
      });
    }

    // melakukan compare password
    const checkPassword = await bcrypt.compare(password, isUserExist.password);

    if (!checkPassword)
      return res
        .status(401)
        .json({ status: "failed", message: "password salah" });

    // membuat token
    const token = jwt.sign(
      {
        id: isUserExist.userId,
        name: isUserExist.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2 days" }
    );

    res.status(200).json({ status: "success", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = { register, login };
