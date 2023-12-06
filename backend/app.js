import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRoute from "./routes/userRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

connectDB();
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.use("/api/messages/", messageRoute);
app.use("/api/users/", userRoute);
if (process.env.NODE_ENV == "production") {
	const __dirname = path.resolve();
	app.use(express.static(path.join(__dirname, "fronted/dist")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, ("frontend", "dist", "index.html")))
	);
} else {
	app.get("/", (req, res) => res.send("Server is ready"));
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`App is listening to port: ${PORT}`);
});
