import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import mongoose from "mongoose";

// @desc Auth user/set tocken
//  route Post /api/users/auth
// @access public
const allMessages = asyncHandler(async (req, res) => {
	const messages = await Message.find({}).populate("message_author");
	res.status(200).json(messages);
});

const newMessage = asyncHandler(async (req, res) => {
	const { message_title, message_text } = req.body;
	const user = await User.findById(req.user._id);
	if (user) {
		const message = await Message.create({
			message_title,
			message_author: req.user._id,
			message_text,
		});
		res.status(200).json({ message });
	}
});
// userID=6561b8b8c9e510972b334207
//  messageId = 6561baf87453f2137ea3e9bd
const updateMessage = asyncHandler(async (req, res) => {
	const [user, message] = await Promise.all([
		await User.findById(req.user._id),
		await Message.findById(req.params.id),
	]);
	if (user._id.equals(message.message_author)) {
		message.message_title = req.body.message_title || message.message_title;
		message.message_text = req.body.message_text || message.message_text;

		const updatedMessage = await message.save();
		res.status(200).json({ updatedMessage });
	} else {
		res
			.status(200)
			.json({ message: "You can't modify other users message!!!" });
	}
});

const deleteMessage = asyncHandler(async (req, res) => {
	const [user, message] = await Promise.all([
		await User.findById(req.user._id),
		await Message.findById(req.params.id),
	]);
	if (!message) {
		res.status(404).json({ message: "Message doesn't exist" });
	}
	if (user._id.equals(message.message_author)) {
		const deletedMessage = await Message.findByIdAndDelete(message._id);
		res.status(200).json(deletedMessage);
	} else {
		res
			.status(200)
			.json({ message: "You can't modify other users message!!!" });
	}
});

export { allMessages, newMessage, updateMessage, deleteMessage };
