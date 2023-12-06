import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useNewMessageMutation } from "../slices/messageApiSlice";
import { addMessage } from "../slices/messagesSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const NewMessageScreen = () => {
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [newMessage, { isLoading }] = useNewMessageMutation();

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await newMessage({
				message_title: title,
				message_text: text,
			}).unwrap();
			dispatch(addMessage({ ...res }));
			navigate("/");
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	};
	return (
		<>
			<h2>Write your message here</h2>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor="messageTitle">Title:</label>
					<input
						type="text"
						name="messageTitle"
						id="messageTitle"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="messageText">Message:</label>
					<textarea
						type="text"
						name="messageText"
						id="messageText"
						value={text}
						onChange={(e) => setText(e.target.value)}
					></textarea>
				</div>
				<button type="submit">Add new Message</button>
			</form>
		</>
	);
};
export default NewMessageScreen;
