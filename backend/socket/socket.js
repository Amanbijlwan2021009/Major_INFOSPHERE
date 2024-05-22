import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";

//First we need to create the express instance
const app = express();

//Then we need to create a http server and then bind it with express instance
const server = http.createServer(app);

//Then create socket server and then bind it with http server
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

export const getRecipientSocketId = (recipientId) => {
	return userSocketMap[recipientId];
};//We gonna pass recipient id here and this will generate socket id for this user

const userSocketMap = {}; // userId: socketId
//userid that is mapped to socket id

//Lets listen for any incoming connection
io.on("connection", (socket) => {
	console.log("user connected", socket.id);
	const userId = socket.handshake.query.userId;

	if (userId != "undefined") userSocketMap[userId] = socket.id;
	io.emit("getOnlineUsers", Object.keys(userSocketMap));//[1,2,3]

	socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
		try {
			//update message model 
			await Message.updateMany({ conversationId: conversationId, seen: false }, { $set: { seen: true } });

			//this update conversation model
			await Conversation.updateOne({ _id: conversationId }, { $set: { "lastMessage.seen": true } }); 

			io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
		} catch (error) {
			console.log(error);
		}
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { io, server, app };
