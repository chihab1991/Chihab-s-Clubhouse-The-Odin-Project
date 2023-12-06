import express from "express";
import {
	allMessages,
	deleteMessage,
	newMessage,
	updateMessage,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", allMessages);

// new message
router.get("/new", (req, res) => {
	res.json({ msg: "" });
});
router.post("/new", protect, newMessage);

// modify msg
router.route("/:id").put(protect, updateMessage).delete(protect, deleteMessage);

export default router;
