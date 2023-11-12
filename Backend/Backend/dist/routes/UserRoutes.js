"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tokenVerify_1 = require("../middleware/tokenVerify");
const usersControllers_1 = require("../controllers/usersControllers");
const projectControllers_1 = require("../controllers/projectControllers");
const user_router = (0, express_1.default)();
user_router.get("/", tokenVerify_1.verifyToken, projectControllers_1.getAllUsers);
user_router.post("/register", usersControllers_1.registerUser);
user_router.post("/login", usersControllers_1.loginUser);
user_router.get("/check_user_details", tokenVerify_1.verifyToken, usersControllers_1.checkUserDetails);
exports.default = user_router;
//# sourceMappingURL=UserRoutes.js.map