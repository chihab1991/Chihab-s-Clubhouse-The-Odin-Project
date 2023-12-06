import { Link } from "react-router-dom";
import Message from "./Message";
const Hero = ({ messages }) => {
	return (
		<>
			<div className="max-w-7xl mx-auto">
				{messages.map((message) => (
					<Message key={message._id} message={message} />
				))}
			</div>
		</>
	);
};
export default Hero;
