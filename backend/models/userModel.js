import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		first_name: { type: String, maxLength: 50, required: true },
		last_name: { type: String, maxLength: 50, required: true },
		email: { type: String, maxLength: 100, required: true, unique: true },
		password: { type: String, minLength: 6, required: true },
		membershipStatus: {
			type: String,
			enum: ["Basic", "Confirmed", "Admin"],
		},
	},
	{ timestamps: true }
);
userSchema.virtual("fullName").get(function () {
	let fullName = "";
	if (this.first_name && this.family_name) {
		fullName = `${this.family_name}, ${this.first_name}`;
	}

	return fullName;
});
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
