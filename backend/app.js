const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug");
const axios = require("axios");

const cors = require("cors");
const csurf = require("csurf");
const { isProduction } = require("./config/keys");
require("./models/User");
require("./config/passport");
const passport = require("passport");

const usersRouter = require("./routes/api/users");
const csrfRouter = require("./routes/api/csrf");
const ingredientsRouter = require("./routes/api/ingredients");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// security middleware
if (!isProduction) {
  app.use(cors());
}

// needs to be after cors
app.get("/recipes/:query", async (req, res) => {
  const response = await axios.get(
    `https://api.edamam.com/search?q=${req.params.query}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
  );
  res.json(response.data.hits);
});

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use("/api/users", usersRouter);
app.use("/api/csrf", csrfRouter);
app.use("/api/ingredients", ingredientsRouter);

// Express custom middleware for catching all unmatched requests and formatting
// a 404 error to be sent as the response.
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug("backend:error");

// Express custom error handler that will be called whenever a route handler or
// middleware throws an error or invokes the `next` function with a truthy value
app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors,
  });
});

module.exports = app;
