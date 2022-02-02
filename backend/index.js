const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// importing user model & error model
const userRoutes = require("./routes/user-routes");
const HttpError = require("./model/error-model");

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin,X-requested-With,Content-Type,Autorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
// });

//checking user routes
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

//connection with database
mongoose
  .connect(
    `mongodb+srv://admin:saurabh@cluster0.tchpw.mongodb.net/TestingApi?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("connected");
    });
  });
