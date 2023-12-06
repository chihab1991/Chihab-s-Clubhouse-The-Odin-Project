import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user/set tocken
//  route Post /api/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			email: user.email,
			first_name: user.first_name,
			last_name: user.last_name,
			password: user.password,
		});
	} else {
		res.status(400);
		throw new Error("Invalid email or password");
	}
});

// @desc Register new user
//  route Post /api/users/
// @access public
const registerUser = asyncHandler(async (req, res) => {
	const { first_name, last_name, email, password } = req.body;
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}
	const user = await User.create({ first_name, last_name, email, password });

	if (user) {
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			email: user.email,
			first_name: user.first_name,
			last_name: user.last_name,
			password: user.password,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// @desc logout user
//  route Post /api/users/logout
// @access public
const logoutUser = asyncHandler(async (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({ message: "User logged out." });
});

// @desc get user profile
//  route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = {
		_id: req.user._id,
		first_name: req.user.first_name,
		last_name: req.user.last_name,
		email: req.user.email,
	};
	res.status(200).json(user);
});

// @desc Update user Profile
//  route Put /api/users/logout
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.first_name = req.body.first_name || user.first_name;
		user.last_name = req.body.last_name || user.last_name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.status(200).json({
			_id: updatedUser._id,
			first_name: updatedUser.first_name,
			last_name: updatedUser.last_name,
			email: updatedUser.email,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});
export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
};
