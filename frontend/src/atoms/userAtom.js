import { atom } from "recoil";

const userAtom = atom({
	key: "userAtom",
	default: JSON.parse(localStorage.getItem("user-threads")),
	// default value for the user will be whatever there is in the local storage 
});

export default userAtom;
