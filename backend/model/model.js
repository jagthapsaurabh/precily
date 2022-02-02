const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  job: { type: String },
});

module.exports = mongoose.model("User", userSchema);
