import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import { router } from "./routes";

const app = express();

app.use(cors());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected to socket ${socket}`);
});

app.use(express.json());

app.use(router);

const client_id = process.env.GITHUB_CLIENT_ID;

app.get("/github", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${client_id}`
  );
});

app.get("/signin/callback", (req, res) => {
  const { code } = req.query;
  return res.json(code);
});

export { httpServer, io };
