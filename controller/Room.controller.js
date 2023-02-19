const { model, Schema } = require("mongoose");
const bcryt = require("bcryt");

const roomSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  _id: {
    type: Schema.Types.ObjectId,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "quest"],
    default: "quest",
  },
});

const user = model("user", roomSchema);
module.exports = user;
