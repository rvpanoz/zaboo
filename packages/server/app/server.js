import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { signIn, welcome, refresh } from "./handlers";
import config from "./config";

const { port } = config || 8000;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.post("/signin", signIn);
app.get("/welcome", welcome);
app.post("/refresh", refresh);

app.listen(port);
