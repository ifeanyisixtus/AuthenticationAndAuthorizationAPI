const mongoose = require("mongoose");
const constants = require("./constants");
//const constant = require("./constants");

function database() {
  console.log("connecting to mongoDB");
  mongoose
    .set("strictQuery", true)
    .connect(constants.DATABASE_URI, {})
    .then(() => {
      console.log("yeah! mongoDb is connected");
    })
    .catch((err) => {
      console.log("there was an error while connecting to the database");
    });
}

module.exports = database;
