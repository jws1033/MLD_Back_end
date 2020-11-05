const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  sender : {
    type:String,
    require: true,
  },

  name: {
    type: String,
  },

  gender: {
    type: String,
  },

  age: {
    type: String,
  },

  residence: {
    type: String,
  },

  height: {
    type: String,
  },

  weight: {
    type: String, 
  },
});

module.exports = mongoose.model("User", userSchema);
