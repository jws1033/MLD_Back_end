const mongoose = require("mongoose");
const { Schema } = mongoose;

const surveySchema =  new Schema({
    no : {
      type: String,
      require: true,
    },
  
    question: [{
      type: String,
      required: true,
    }]
})

module.exports = mongoose.model("Survey", surveySchema);