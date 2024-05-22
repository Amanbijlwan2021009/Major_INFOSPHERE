import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";// Whenever you are importing any file then it is necessary to use .extension at the end of the file, name as it is . unilike in the component: there is no such need , as of my knowledge till now  
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import { app, server } from "./socket/socket.js";
import job from "./cron/cron.js";

dotenv.config();//This is used to connect env file to server 


connectDB();
job.start();

// const app = express() // We don't need this anymore bcz we created one in socket js

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

//CLOUDINARY
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body
// the express.json() middleware has a default limit of 100kb for the request body size.. SO WE HAVE SET ITS LIMIT TO 50mb

app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);//when you hit the api/users/signup you'll get the res (as sign up successfully ::--> this is the message passed to it till now (at 2:00:10 ))

app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

//Previously , we were using port 3000 for frontend , and , port : 5000 for backend ,
//But now we merge it like below
// http://localhost:5000 => backend,frontend


//😶by this we set 2 commands in package.json  to run full code and install all the dependencies ,, that are "npm run build ", and " npm start "
// We connect start command with below if F
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
//Now changing app.listen with server.listen , we can now handle http request and socket related things