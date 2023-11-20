import Router from "express";
import { register } from "module";
import { checkUserDetails, getSingleUsers } from "../controllers/UserControllers";
import { loginUser } from "../controllers/UserControllers";
import { registerUser } from "../controllers/UserControllers";
import { verifyToken } from "../middlewares/tokenVerify";




const user_router = Router();

// user_router.get("/", verifyToken, getAllUsers);
// user_router.post("/register", registerUser);
// user_router.post("/login", loginUser);
// user_router.get("/check_user_details", verifyToken, checkUserDetails);

user_router.post("/register", registerUser);
user_router.post("/login", loginUser);
user_router.post("/check_user_details",verifyToken, checkUserDetails);
user_router.get('/singleUser',getSingleUsers)


export default user_router;
