// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const session = require("express-session");

app.set("trust proxy", 1);
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
        cookie:{
            sameSite: true, ////frontend backend both run on localhost
            httpOnly: true, //  //we are not using https
            maxAge: 600000, //session time
        },
        rolling: true,
    })
);

/* change this in the session object whenever we have to deploy
sameSite: "none",
httpOnly: false,
secure: true, */


// default value for title local
const projectName = "server-agile-bug-tracker";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

//Auth Routes
const auth = require("./routes/auth-routes");
app.use("/api", auth);

//Project Routes
const project = require("./routes/project-routes");
app.use("/api", project);

//Board Routes
const board = require("./routes/board-routes");
app.use("/api", board);

//issue Route
const issue = require("./routes/issue-routes");
app.use("/api", issue);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
