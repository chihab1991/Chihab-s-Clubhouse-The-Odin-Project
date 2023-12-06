import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Hero from "../components/Hero";
import { useAllMessagesMutation } from "../slices/messageApiSlice";
import { setMessages } from "../slices/messagesSlice";
import { useEffect } from "react";

const HomeScreen = () => {
	const [allMessages, { isLoading }] = useAllMessagesMutation();
	const dispatch = useDispatch();
	const { messages } = useSelector((state) => state.messages);
	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		const messagesGetter = async () => {
			try {
				const res = await allMessages().unwrap();
				dispatch(setMessages([...res]));
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		};
		messagesGetter();
	}, [allMessages]);
	console.log(messages);

	return (
		<>
			{isLoading && <Loader />}
			{messages && !isLoading && <Hero messages={messages} />}
			{!messages && !isLoading && <h3>No Messages Added yet!</h3>}
		</>
	);
};

export default HomeScreen;
