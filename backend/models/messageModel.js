import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema(
	{
		message_title: { type: String, maxLength: 100, required: true },
		message_author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message_text: { type: String, required: true },
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
