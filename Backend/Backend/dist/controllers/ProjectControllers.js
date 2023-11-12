"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectStatus = exports.updateStatus = exports.getAllUsers = exports.singleProject = exports.getAllProjects = exports.deleteProject = exports.assignProject = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const sqlConfig_1 = require("../config/sqlConfig");
const ProjectValidators_1 = require("../validators/ProjectValidators");
// Admin assigns projects
const assignProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { projectName, projectDescription, endDate, AssignedUserEmail, AssignedUserName, } = req.body;
        const { error } = ProjectValidators_1.projectAssignmentValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        let projectID = (0, uuid_1.v4)();
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const projectDetails = yield pool
            .request()
            .input("projectID", mssql_1.default.VarChar, projectID)
            .input("projectName", mssql_1.default.VarChar, projectName)
            .input("projectDescription", mssql_1.default.VarChar, projectDescription)
            .input("endDate", mssql_1.default.VarChar, endDate)
            .input("AssignedUserEmail", mssql_1.default.VarChar, AssignedUserEmail)
            .input("AssignedUserName", mssql_1.default.VarChar, AssignedUserName)
            .execute("assignProject");
        const assignmentResult = projectDetails.recordset[0].AssignmentResult;
        if (assignmentResult === -1) {
            return res.status(400).json({ error: "User is unavailable" });
        }
        else if (assignmentResult === -2) {
            return res.status(400).json({ error: "User does not exist" });
        }
        else {
            const assignedProjectID = projectDetails.recordset[0].AssignedProjectID;
            return res.status(200).json({
                message: "Project assigned successfully",
                assignedProjectID,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
});
exports.assignProject = assignProject;
//delete project
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool
            .request()
            .input("projectID", mssql_1.default.VarChar, projectID)
            .execute("deleteProject");
        if (result.recordset[0].DeletionResult === 1) {
            return res.status(200).json({
                message: "Project deleted successfully.",
            });
        }
        else {
            console.log("Project with the provided ID does not exist");
            return;
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
});
exports.deleteProject = deleteProject;
//fetch All projects
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.request().execute("fetchAllProjects");
        if (result.recordset && result.recordset.length > 0) {
            const projects = result.recordset;
            return res.status(200).json(projects);
        }
        else {
            return res.status(200).json([]);
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
});
exports.getAllProjects = getAllProjects;
//fetch single project
const singleProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { AssignedUserEmail } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const project = yield pool
            .request()
            .input("AssignedUserEmail", mssql_1.default.VarChar, AssignedUserEmail)
            .execute("getSingleProject");
        console.log(project);
        return res.status(200).json({
            message: "project retrieved successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
});
exports.singleProject = singleProject;
// Mark project Completed
// export const projectCompleted = async (req: Request, res: Response) => {
//   try {
//     const { projectID } = req.body;
//     const pool = await mssql.connect(sqlConfig);
//     const completedProject = await pool
//       .request()
//       .input("projectID", mssql.VarChar, projectID)
//       .execute("projectCompleted");
//     console.log(completedProject);
//     // Check if any rows were affected; if so, consider it a success
//     if (completedProject.rowsAffected[0] > 0) {
//       return res.status(200).json({
//         message: "Project updated successfully",
//       });
//     } else {
//       return res.status(404).json({
//         message: "Project not found or already completed",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error,
//     });
//   }
// };
//fetchALl Users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const allUsers = yield pool.request().execute("GetAllUsers");
        res.json(allUsers.recordset);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getAllUsers = getAllUsers;
// user updates project status
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { AssignedUserEmail, NewStatus } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const updateStatus = yield pool
            .request()
            .input("AssignedUserEmail", mssql_1.default.VarChar, AssignedUserEmail)
            .input("NewStatus", mssql_1.default.VarChar, NewStatus)
            .execute("UpdateProjectStatus");
        if (updateStatus.rowsAffected[0] > 0) {
            return res.json({
                message: "Project status updated successfully",
            });
        }
        else {
            return res.status(400).json({
                error: "Project status update failed",
            });
        }
    }
    catch (error) {
        console.error("Error updating project status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateStatus = updateStatus;
//get project status
const getProjectStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { AssignedUserEmail } = req.body;
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const getStatus = yield pool
            .request()
            .input("AssignedUserEmail", mssql_1.default.VarChar, AssignedUserEmail)
            .execute("getProjectStatus");
        if (getStatus.rowsAffected[0] > 0) {
            return res.json({
                message: "Project status fetched successfully",
            });
        }
        else {
            return res.status(400).json({
                error: "Project status fetching failed",
                details: "An error occurred while fetching the project status.",
            });
        }
    }
    catch (error) {
        console.error("Error fetchin project status:", error);
        res.status(500).json({ error: error });
    }
});
exports.getProjectStatus = getProjectStatus;
//# sourceMappingURL=ProjectControllers.js.map