import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { authenticate, home, refresh } from "./handlers";
import config from "./config";

const { port } = config || 8000;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/home", home);
app.post("/authenticate", authenticate);
app.post("/refresh", refresh);

app.listen(port, () => console.log(`Server is running at port: ${port}`));
