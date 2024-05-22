import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getMessages, sendMessage, getConversations } from "../controllers/messageController.js";

// Why .js here ? => bcz we are using type of module in the package json

const router = express.Router();

//Conversation
router.get("/conversations", protectRoute, getConversations);

//Get Message
router.get("/:otherUserId", protectRoute, getMessages);

//Send Message
router.post("/", protectRoute, sendMessage);

export default router;
