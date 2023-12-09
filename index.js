// const a = 23
// const b = 25
// const sum = a+b

// console.log("Hello", sum)
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./api/user");
require("dotenv").config();
app.use(express.json());
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Database Conected.....");
  })
  .catch(() => {
    console.log("Database not Conected");
  });
app.use("/api/user", userRouter)
// let count = 0;
app.get("/", (req, res) => {
//   count = count + 1;
//   console.log(count);
  res.send("<h1>Ali</h1>");
});
// console.log(count)
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Your Server is Running");
});
