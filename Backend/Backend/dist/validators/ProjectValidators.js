"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectAssignmentValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.projectAssignmentValidationSchema = joi_1.default.object({
    projectName: joi_1.default.string().required().min(2).max(30),
    endDate: joi_1.default.date().required().min(new Date()),
    projectDescription: joi_1.default.string(),
    AssignedUserEmail: joi_1.default.string().email({
        minDomainSegments: 2,
        tlds: {
            allow: ["ke", "com"],
        },
    }),
    AssignedUserName: joi_1.default.string().required().min(2).max(30),
});
//# sourceMappingURL=ProjectValidators.js.map