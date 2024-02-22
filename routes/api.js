const router = require("express").Router();
const authRoutes = require("./api/authRoutes.js");
const guestRoutes = require("./api/guestRoutes.js");

router.use("/auths", authRoutes);
router.use("/guests", guestRoutes);

module.exports = router;
