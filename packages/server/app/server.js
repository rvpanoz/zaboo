import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { authenticate, signout, refreshToken } from "./handlers";
import config from "./config";

const { port } = config || 8000;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.post("/authenticate", authenticate);
app.post("/refreshToken", refreshToken);
app.post("/signout", signout);

app.listen(port, () => console.log(`Server is running at port: ${port}`));
