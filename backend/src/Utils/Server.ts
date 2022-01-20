import express from "express";
import cors from "cors";
import LoginRouter from "../Routes/LoginRouter";

const server = express();
server.use(express.json());

server.use(cors());

server.use("/api/v1/login", LoginRouter);

export default server;
