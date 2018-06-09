import express from "express";
import compression from "compression"; // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logger from "./util/logger";
import lusca from "lusca";
import dotenv from "dotenv";
import path from "path";
import expressValidator from "express-validator";
import bluebird from "bluebird";
import flash from "express-flash";
import { SESSION_SECRET } from "./util/secrets";
import { Request, Response } from "express";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.example" });

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import apiControllers from "./controllers/api";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser("secret"));
app.use(session({ cookie: { maxAge: 1000000000 }, secret: "secret" }));
app.use(flash());
app.use(expressValidator());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/", (req: Request, res: Response) => {
  res.render("home");
});

/**
 * API examples routes.
 */
app.use("/api", apiControllers);

export default app;
