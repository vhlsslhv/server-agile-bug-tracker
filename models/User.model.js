const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: true,  
    unique: true,     
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  /* reported: [{
    type: Schema.Types.ObjectId,
    ref: "Boards",
  }],
  assigned: [{
    type: Schema.Types.ObjectId,
    ref: "Boards",
  }], */
  role: String,         //Admin, Reader, Guest, Supervider
  photo: String
});

const User = model("User", userSchema);

module.exports = User;



