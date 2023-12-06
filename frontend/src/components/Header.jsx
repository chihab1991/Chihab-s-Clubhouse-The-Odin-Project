import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<header className="bg-blue-500 text-white p-4 ">
				<nav className="flex justify-between max-w-7xl mx-auto">
					<div className="">
						<Link to="/">Chihab's Clubhouse</Link>
					</div>
					<div className="">
						<ul>
							{userInfo ? (
								<>
									<li className="mr-4">
										<Link to="/new-message">New Message</Link>
									</li>
									<li className="mr-4">
										<Link to="/profile">
											{userInfo.first_name} {userInfo.last_name}
										</Link>
									</li>
									<li className="mr-4 cursor-pointer" onClick={logoutHandler}>
										Log Out
									</li>
								</>
							) : (
								<>
									<li className="mr-4">
										<Link to="/login">Sign In</Link>
									</li>
									<li className="mr-4">
										<Link to="/register">Sign Up</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</nav>
			</header>
		</>
	);
};

export default Header;
