const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const webpack = require("webpack");
const path = require("path");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

//and create our instances
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const careerPlans = require("./routes/api/careerPlans");
const webpackConfig = require("../../webpack.config");
// const userRoutes = require('./api/user.routes');

//set our port to either a predetermined port number if you have set
const port = process.env.API_PORT || 8080;
const compiler = webpack(webpackConfig);

/*
 * Configure Mongoose
*/
mongoose.Promise = global.Promise;
mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${
      process.env.MONGO_PASS
    }@ds121982.mlab.com:21982/mern-boilerplate`,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
/*
 * Configure Express
*/
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
 * Configure Middleware
*/
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, "../client/public"),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })
);
app.use(webpackHotMiddleware(compiler));

/*
 * Configure Routes
*/
// PASSPORT -----
// middleware
app.use(passport.initialize());
// conf
require("./config/passport")(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/careerPlans", careerPlans);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../dist/index.html"));
});
//starts the server and listens for requests
app.listen(port);
console.log(`api running on port ${port}`);
