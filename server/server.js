import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import { db } from "./db.js";
import apiRouter from "../server/routes/api.js"


// Create Web Server
const server = express();

// Configure .env files
dotenv.config();

// Middleware for web security
server.use(helmet());

// Middleware for parsing cookies
server.use(cookieParser());

// Middleware for proxy server
server.set("trust proxy", 1);

// Middleware for cross-origin resources and pass header
server.use(cors({
  origin: `http://localhost:5173`,
  methods: `GET,HEAD,PUT,PATCH,POST,DELETE`,
  credentials: true
}));

// Log http request
server.use(morgan("dev"))

// Configure middleware for JSON, public folder, and parsing body
server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded({extended:true}));

//Create SQL connection pool
const SQLStore = MySQLStore(session);

// Create MySQLStore 
const sessionStore = new SQLStore({}, db);

// Create Session
server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  rolling: true,
  cookie: {
    httpOnly: false,
    secure: false,
    sameSite: 'Lax',
    maxAge: 1000 * 60 * 60,
    domain: "localhost"
  },
}));

// Set views for ejs
server.set("view engine", "ejs");

// Authenticate API
export function requireAuth (req, res, next) {
  if(req.session.user) {
    next();
  } else {
    return res.status(401).json({
      invalid: "Unauthorized", 
    });
  }
};

// API routes
server.use("/api", apiRouter);

// Global Error Handling
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something unusual occurred");
});

const listen = server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  console.log('Closing http server.');
  listen.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  });
});