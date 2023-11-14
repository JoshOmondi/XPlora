import express, { Request, Response, json } from "express";
import { TestConnection } from "./config/sqlConfig";
import dotenv from "dotenv";
import cors from "cors";
import user_router from "./routes/UserRoutes";

dotenv.config() 

const app = express();
app.use(json())
const port = 3500;

app.use(cors())

app.use("/user", user_router);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

TestConnection();