import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const ProfileScreen = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.auth);

	const [updateProfile, { isLoading }] = useUpdateUserMutation();

	useEffect(() => {
		console.log(userInfo);
		setFirstName(userInfo.first_name);
		setLastName(userInfo.last_name);
		setEmail(userInfo.email);
	}, [userInfo.first_name, userInfo.last_name, userInfo.email]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			try {
				const res = await updateProfile({
					_id: userInfo._id,
					first_name: firstName,
					last_name: lastName,
					email,
					password,
				}).unwrap();
				dispatch(setCredentials({ ...res }));
				toast.success("profile update");
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<>
			<FormContainer>
				<h1>Update Profile</h1>
				<form onSubmit={submitHandler}>
					<div>
						<label htmlFor="firsName">First Name</label>
						<input
							type="text"
							name="firstName"
							id="firstName"
							placeholder="Enter First Name"
							value={firstName}
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
						/>
					</div>
					<div>
						<label htmlFor="lastName">Last Name:</label>
						<input
							type="text"
							name="lastName"
							id="lastName"
							placeholder="Enter Last Name"
							value={lastName}
							onChange={(e) => {
								setLastName(e.target.value);
							}}
						/>
					</div>
					<div>
						<label htmlFor="email">Email Address:</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Enter Email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</div>
					<div>
						<label htmlFor="password">password:</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Confirm Password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<div>
						<label htmlFor="confirmPassword">Confirm Password:</label>
						<input
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							placeholder="Enter Password"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						/>
					</div>
					{isLoading && <Loader />}
					<button type="submit">Update</button>
				</form>
			</FormContainer>
		</>
	);
};
export default ProfileScreen;
