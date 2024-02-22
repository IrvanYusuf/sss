const guestController = require("../../controllers/GuestController.js");
const router = require("express").Router();

router.get("/search", guestController.searchGuest);
router.get("/length", guestController.getLengthGuests);
router.get("/:guestId", guestController.getGuestById);
router.post("/", guestController.createGuest);
router.get("/amount/:status", guestController.sumAmountByStatus);
router.get("/", guestController.getAllGuests);
router.patch("/edit/:guestId", guestController.updateGuest);
router.patch("/change-status/:guestId", guestController.changeStatus);
router.delete("/delete/:guestId", guestController.deletGuestById);

module.exports = router;
