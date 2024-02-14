#!/usr/bin/env tsx

/**
 * Module dependencies
 */

import dotenv from "dotenv"
import app from "../app.js"
import debug from "debug"
import http from "node:http"

dotenv.config()
const logger = debug("backend:server")

const port = normalizePort(process.env.PORT || "3000")
app.set("port", port)

const server = http.createServer(app)

server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

function normalizePort(val: string) {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}

function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== "listen") {
        throw error
    }
    const bind = typeof port === "string"
        ? `Pipe ${port}`
        : `Port ${port}`

    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`)
            process.exit(1)
            break
        case "EADDRINUSE":
            console.error(`${bind} is already in use`)
            process.exit(1)
            break
        default:
            throw error
    }
}

function onListening() {
    const addr = server.address()
    const bind = typeof addr === "string"
        ? `pipe ${addr}`
        : `port ${addr?.port}`
    logger(`Listening on ${bind}`)
}