const express = require("express");
const router = express.Router();
const auth = require("./auth");
const { isAuthorized } = require("../middlewares/authMiddleware");
const RoomType = require("../models/roomTypeSchema");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");

// room type model
const RoomType = require("../models/RoomType");

// create room type
router.post("/", auth, isAuthorized(["admin"]), async (req, res) => {
  const roomType = new RoomType({
    name: req.body.name,
  });

  try {
    const savedRoomType = await roomType.save();
    res.send(savedRoomType);
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE endpoint for deleting a room type by its id
router.delete("/:id", authMiddleware, isAdminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const roomType = await RoomType.findByIdAndDelete(id);

    if (!roomType) {
      return res.status(404).send({ error: "Room type not found" });
    }

    res.send({ message: "Room type deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
