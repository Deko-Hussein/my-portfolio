const express = require("express");
const {
  sendMessage,
  getMessages,
  markMessageAsRead,
  deleteMessage,
} = require("../controllers/messageController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", sendMessage);
router.get("/", protect, getMessages);
router.put("/:id/read", protect, markMessageAsRead);
router.delete("/:id", protect, deleteMessage);

module.exports = router;