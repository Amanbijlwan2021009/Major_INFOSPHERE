import express from "express";
import {
	createPost,
	deletePost,
	getPost,
	likeUnlikePost,
	replyToPost,
	getFeedPosts,
	getUserPosts,
} from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

//Feed
router.get("/feed", protectRoute, getFeedPosts);

//Get Post
router.get("/:id", getPost);

//Get User Post
router.get("/user/:username", getUserPosts);

//Create Post
router.post("/create", protectRoute, createPost);

//Delete Post
router.delete("/:id", protectRoute, deletePost);

//Like Unlike Post
router.put("/like/:id", protectRoute, likeUnlikePost);

//Reply to Post
router.put("/reply/:id", protectRoute, replyToPost);

export default router;
