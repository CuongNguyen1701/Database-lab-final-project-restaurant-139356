import express from "express";
import http from "http";
import fs from "fs";
import session from "express-session";
import { router } from "./routes/routes";
import bodyParser from "body-parser";
import { v4 as uuid } from "uuid";
import FileStore from "session-file-store";
import passport from "passport";
import cors from "cors";
import "./config/passport";

const app = express();
const port = process.env.PORT || 8080;

const server = http.createServer(app);
// const FileStoreSession = FileStore(session);
app.set("trust proxy", 1);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_KEY!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(router);

server.listen(port, () => {
  console.log("🚀 Server is running...");
});

process.on("SIGINT", () => {
  console.log("🤖 Server closed");
});
