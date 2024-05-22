import express from "express";
import {
	followUnFollowUser,
	getUserProfile,
	loginUser,
	logoutUser,
	signupUser,
	updateUser,
	getSuggestedUsers,
	freezeAccount,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

//Get Profile
router.get("/profile/:query", getUserProfile);

//Suggested Users
router.get("/suggested", protectRoute, getSuggestedUsers);

// Signup
router.post("/signup", signupUser);

//Login User
router.post("/login", loginUser);

//Logout
router.post("/logout", logoutUser);

//Follow Unfollow
router.post("/follow/:id", protectRoute, followUnFollowUser); // Toggle state(follow/unfollow)

//Update User
router.put("/update/:id", protectRoute, updateUser);

//Freeze User
router.put("/freeze", protectRoute, freezeAccount);

export default router;
