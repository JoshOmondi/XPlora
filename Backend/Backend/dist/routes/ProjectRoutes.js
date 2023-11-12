"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectControllers_1 = require("../controllers/projectControllers");
const project_router = (0, express_1.default)();
project_router.post("/assignProject", projectControllers_1.assignProject);
project_router.delete("/deleteProject", projectControllers_1.deleteProject);
project_router.get("/", projectControllers_1.getAllProjects);
project_router.get("/singleProject", projectControllers_1.singleProject);
// project_router.post("/updateProject", projectCompleted);
project_router.get("/getUsers", projectControllers_1.getAllUsers);
project_router.post("/updateStatus", projectControllers_1.updateStatus);
project_router.get("/getStatus", projectControllers_1.getProjectStatus);
exports.default = project_router;
//# sourceMappingURL=ProjectRoutes.js.map