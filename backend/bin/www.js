#!/usr/bin/env node

/**
 * Module dependencies
 */

import dotenv from "dotenv";
import app from "../app.js";
import debug from "debug";
import http from "http"; // Change from "node:http" to "http" for compatibility

dotenv.config();
const logger = debug("backend:server");

const port = normalizePort(process.env.PORT || "3040");
app.set("port", port);

const server = http.createServer(app);

// ユーザ登録
app.post("/register", (req, res) => {
    const { email, name, password } = req.body;
    // バリデーションなどのロジックを追加
    // データベースにユーザを登録する処理を追加
    res.status(200).json({ message: "User registered successfully." });
});

// ログイン
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    // バリデーションなどのロジックを追加
    // ログイン処理を実装
    res.status(200).json({ message: "User logged in successfully." });
});

// ログアウト
app.post("/logout", (req, res) => {
    // ログアウト処理を実装
    res.status(200).json({ message: "User logged out successfully." });
});

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string"
        ? `Pipe ${port}`
        : `Port ${port}`;

    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? `pipe ${addr}`
        : `port ${addr ? addr.port : ''}`; // Check if addr is defined before accessing its properties
    logger(`Listening on ${bind}`);
}
