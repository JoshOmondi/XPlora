import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import user_router from "./routes/UserRoutes";
import project_router from "./routes/ProjectRoutes";
import { TestConnection } from "./config/sqlConfig";

dotenv.config();
const port = process.env.PORT || 3500;
const app = express();
app.use(json());
app.use(cors());

app.use("/user", user_router);
app.use("/project", project_router);
// app.use("/register", user_router);

app.listen(port, () => {
  console.log(`Project management running on port ${port}`);
});

TestConnection()