// app.js
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import logger from "morgan";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        secret: "Ff1n6acmjPftjh3bHPOWZ5/fWrUTsIBxic61P7Lomuw4E7I3",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60 * 60 * 1000, httpOnly: true },
    })
);
app.use(
    cors({
        origin: "http://localhost:3040",
        credentials: true,
    })
);
app.use(passport.authenticate("session"));

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "not found." });
});

// Error handler
app.use((err, req, res) => {
    let message = "Internal Server Error";
    if (err.status === 401) {
        message = "Unauthenticated";
    } else {
        console.error(err);
    }
    res.status(err.status || 500).json({ message });
});

export default app;
