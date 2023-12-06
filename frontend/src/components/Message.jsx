import { useSelector } from "react-redux";
import moment from "moment";
const Message = ({ message }) => {
	const { userInfo } = useSelector((state) => state.auth);

	return (
		<>
			<div className="rounded p-2 m-3 bg-sky-200">
				<h3 className="semi-bold">
					<b>Title: </b>
					{message.message_title}
				</h3>
				<p>
					<b>Message: </b>
					{message.message_text}
				</p>
				{userInfo && (
					<h4>
						<b>Written by : </b>
						{`${message.message_author.first_name} ${message.message_author.last_name}`}
					</h4>
				)}
				<p>
					<b>Since: </b>
					{moment(message.createdAt).fromNow()}
				</p>
			</div>
		</>
	);
};
export default Message;
